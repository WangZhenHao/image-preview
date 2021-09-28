import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
// import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
// import css from "rollup-plugin-import-css";

export default {
  input: 'src/index.js',
  output: {
    name: 'ImagePreview',
    file: 'dist/image-preview.js',
    format: 'umd'
  },
  watch: {
    inlude: 'src/**'
  },
  plugins: [
    // postcss({
    //   extract: true,
    //   extract: 'image-preview.css'
    // }),
    // css(),
    scss({
      output: 'dist/image-preview.css'
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}
