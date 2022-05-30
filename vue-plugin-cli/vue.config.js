const path = require('path')
const fs = require('fs')
const { get:loGet } = require('lodash')

// Generate pages object
const pages = {}

// function getPages(){
//   function getEntryFile (entryPath) {
//     let files = fs.readdirSync(entryPath)
//     return files
//   }

//   const chromeName = getEntryFile(path.resolve(`src/entry`))

//   function getFileExtension (filename) {
//     return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
//   }
//   chromeName.forEach((name) => {
//     const fileExtension = getFileExtension(name)
//     const fileName = name.replace('.' + fileExtension, '')
//     pages[fileName] = {
//       entry: `src/entry/${name}`,
//       template: 'public/index.html',
//       filename: `${fileName}.html`
//     }
//   })
// }


const isDevMode = process.env.NODE_ENV === 'development'

const manifestPath = path.resolve(`src/manifest.${process.env.NODE_ENV}.json`)
function getPages(){
  let fields = [{
      field: 'background.scripts[0]',
      name: 'background'
    },
    {
      field: 'browser_action.default_popup',
      name: 'popup'
    },
    {
      field: 'content_scripts[0].js[0]',
      name: 'content'
    },
    {
      field: 'options_page',
      name: 'options'
    },
    {
      field: 'devtools_page',
      name: 'devtools'
    },
  ]
  const manifest = require(manifestPath)
  // loGet(manifest, 'field')
  fields.forEach((fieldObj) => {
    const field = fieldObj.field
    const name = fieldObj.name
    const dist = loGet(manifest, field)
    if (dist) {
      pages[name] = {
        entry: `src/${name}/${name}` + '.js',
        template: 'public/index.html',
        filename: `${name}.html`
      }
    }
  })
}

getPages()

module.exports = {
  pages,
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
            to: `${path.resolve('dist')}/manifest.json`
          },
          {
            from: path.resolve(`public/`),
            to: `${path.resolve('dist')}/`
          }
        ]
      }
    ])
  },
  configureWebpack: {
    output: {
      filename: `[name].js`,
      chunkFilename: `[name].js`
    },
    devtool: isDevMode ? 'inline-source-map' : false
  },
  css: {
    extract: false // Make sure the css is the same
  }
}
