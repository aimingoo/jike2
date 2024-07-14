// rollup.config.js
/*
  NOTE: rename to rollup.config.js, Or,
        update type field to 'module' in package.json.
*/

import tsc from 'rollup-plugin-typescript2';

// export configs as array or single config object
// @see https://github.com/rollup/rollup
export default [{
    input: "1.ts",
    output: {
        file: "dist/1.js",
        format: "cjs",
    },
    plugins: [
        // @see https://github.com/ezolenko/rollup-plugin-typescript2
        tsc({
            tsconfig: './tsconfig.json',
            // clean: false, // default: true
            // cacheRoot: './cache',  // default: node_modules/.cache/rollup-plugin-typescript2
        }),
    ],
}];