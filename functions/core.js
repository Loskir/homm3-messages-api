const sharp = require('sharp')

const Generator = require('../lib/HommMessageGeneratorNodeBindings')
const generator = new Generator()

const getPngBuffer = (text, config) => {
  generator.renderWithTextAndConfig(text, config)
  return generator.exportBuffer()
}
const pngToWebp = (pngBuffer) => {
  return sharp(pngBuffer)
    // .resize(500)
    .toFormat(sharp.format.webp)
    .toBuffer()
}
const getWebpBuffer = (text, config) => pngToWebp(getPngBuffer(text, config))

module.exports = {
  getPngBuffer,
  pngToWebp,
  getWebpBuffer,
}
