const fs = require('fs')
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')

export default function compare (path1, path2, pathDiff) {
  return new Promise((resolve, reject) => {
    let filesRead = 0

    const parsed = () => {
      if (++filesRead < 2) {
        return
      }

      const diff = new PNG({width: image1.width, height: image1.height})

      const numDiffPixels = pixelmatch(image1.data, image2.data, diff.data, image1.width, image1.height, { threshold: 0.1 })

      const diffRatio = numDiffPixels / image1.width / image1.height

      const writeStream = fs.createWriteStream(pathDiff)
      writeStream.on('finish', () => {
        resolve(diffRatio)
      })

      diff.pack().pipe(writeStream)
    }

    const image1 = fs.createReadStream(path1).pipe(new PNG()).on('parsed', parsed)
    const image2 = fs.createReadStream(path2).pipe(new PNG()).on('parsed', parsed)
  })
}
