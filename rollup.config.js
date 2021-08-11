import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';

let pluginOptions = [
    resolve({
        jsnext: true,
        browser: true
    }),
    babel({
        exclude: 'node_modules/**',
    }),
    commonjs(),
    progress(),

    uglify(),
    filesize({
        showGzippedSize: false,
    })
];

export default [{
    input: './src/MoveTree.js',
    output: {
        name: 'main',   // for external calls (need exports)
        file: 'dist/index.js',
        format: 'umd',
    },
    plugins: pluginOptions,
}
];