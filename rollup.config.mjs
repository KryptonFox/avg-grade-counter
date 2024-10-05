import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import banner2 from 'rollup-plugin-banner2'
import fs from 'fs'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/avg-grade-counter.user.js',
    format: 'iife',
    name: 'bundle',
    globals: {
      jquery: '$',
    },
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    banner2(() => fs.readFileSync('tampermonkey-config.txt').toString()),
  ],
  external: ['jquery', new URL('https://code.jquery.com/jquery-3.7.1.min.js')],
}
