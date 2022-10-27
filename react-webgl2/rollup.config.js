import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/index.js',
    format: 'iife',
    name: 'demo'
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
    typescript({
      typescript: require('typescript'),
    })
  ]
};
