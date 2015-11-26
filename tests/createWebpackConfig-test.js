import expect from 'expect'

import createWebpackConfig from '../src/createWebpackConfig'

let cwd = process.cwd()

describe('createWebpackConfig()', () => {
  describe('without any config arguments', () => {
    let config = createWebpackConfig(cwd)
    it('creates a default webpack build config', () => {
      expect(Object.keys(config)).toEqual(['module', 'plugins', 'resolve'])
      expect(config.module.loaders.map(loader => loader.loader).join('\n'))
        .toContain('babel-loader')
        .toContain('extract-text-webpack-plugin')
        .toContain('css-loader')
        .toContain('autoprefixer-loader')
        .toContain('url-loader')
        .toContain('file-loader')
        .toContain('json-loader')
      expect(config.resolve.extensions).toEqual(['', '.js', '.jsx','.json'])
    })
    it('excludes node_modules from babel-loader', () => {
      expect(config.module.loaders[0].exclude.test('node_modules')).toBe(true)
    })
  })

  describe('with a server=true config argument', () => {
    let config = createWebpackConfig(cwd, {server: true})
    it('creates a server webpack config', () => {
      expect(config.module.loaders.map(loader => loader.loader).join('\n'))
        .toContain('babel-loader')
        .toContain('style-loader')
        .toContain('css-loader')
        .toContain('autoprefixer-loader')
        .toContain('url-loader')
        .toContain('file-loader')
        .toContain('json-loader')
      expect(config.resolve.extensions).toEqual(['', '.js', '.jsx','.json'])
    })
  })
})
