import fs from 'fs'
import path from 'path'

const getItemInfo = async (item: string): Promise<fs.Stats> => {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.lstat(item, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const getDirectoryInfo = async (directory: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path.resolve(directory), async (err, files) => {
      if (err) {
        return reject(err)
      }
      resolve(files)
    })
  })
}

const importDir = async (dir: string, name: RegExp | boolean = false): Promise<void> => {
  const files = await getDirectoryInfo(dir)
  for (const f in files) {
    const item = path.join(dir, files[f])
    const stats = await getItemInfo(item)
    if (stats.isDirectory()) {
      await importDir(path.join(dir, files[f]), name)
    } else if (name instanceof RegExp) {
      if (files[f].match(name)) {
        await require(path.join(dir, files[f]))
      }
    } else {
      await require(path.join(dir, files[f]))
    }
  }
}

export default async function importFromPath(directory: string, match: RegExp): Promise<void> {
  await importDir(directory, match)
}
