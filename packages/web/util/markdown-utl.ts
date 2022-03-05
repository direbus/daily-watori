import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const docsDirectory = join(process.cwd(), 'docs')

export function getDoc(docPath: string) {
  const fullPath = join(docsDirectory, docPath)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { meta: data, content }
}
