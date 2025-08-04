import { promises as fs } from 'node:fs'
import process from 'node:process'
import wagmiGenerateManifest from '../wagmiGenerateManifest.json'

// Strengthen address types post-"wagmi generate"
const main = async () => {
  const file = await fs.readFile('./src/wagmi.ts', 'utf8')
  let lines: string[] = file.split('\n')

  // Strongly type addresses - look for contract address definitions in the format:
  // address: { 1: '0x...', 137: '0x...' }
  let addressesFound = false
  let modified = false
  
  lines = lines.map((line) => {
    // Match lines with ethereum addresses in various formats
    const addressPattern = /(\d+:\s*)'(0x[0-9a-fA-F]{40})'([,\s])/g
    if (addressPattern.test(line)) {
      addressesFound = true
      modified = true
      return line.replace(addressPattern, "$1'$2' as Address$3")
    }
    return line
  })

  // If we found addresses to type, add the import at the top
  if (addressesFound && !file.includes("import { type Address } from 'viem'")) {
    // Find the first import statement
    const firstImportIndex = lines.findIndex(line => line.startsWith('import'))
    if (firstImportIndex !== -1) {
      lines.splice(firstImportIndex, 0, "import { type Address } from 'viem'")
    } else {
      // If no imports, add at the beginning
      lines.unshift("import { type Address } from 'viem'")
    }
  }

  // For templates, remove addresses completely (we should be able to supply any address)
  const templateVarNames = wagmiGenerateManifest.template.map((t: any) => t.name)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(/^\s*> & \{ chainId\?: keyof typeof (\w*)Address } = \{} as any,$/)
    if (!match) {
      continue
    }

    const [, varName] = match
    if (!templateVarNames.includes(varName)) {
      continue
    }

    // Remove the Omit<'address'> from the config
    lines[i - 1] = lines[i - 1]!.replace(`| 'address' `, '')

    // Remove the chainId line from the config
    lines[i] = '  >,'
    modified = true
  }

  // Only write if we made changes
  if (modified || addressesFound) {
    const content = lines.join('\n')
    await fs.writeFile('./src/wagmi.ts', content, 'utf8')
  }
}

main()
  .then(() => {
    console.log('✅ Wagmi file patched successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
