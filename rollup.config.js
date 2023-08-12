import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';

const name = "gw3-sdk";

export default async () => {
  return [
    // Node.js commonjs bundle
    {
      input: './lib/node/index.ts',
      output: {
        file: `dist/node/${name}.cjs`,
        format: "cjs",
        preferConst: true,
        exports: "default",
      },
      external: [/node_modules/],
      sideEffects: false,
      treeshake: true,
      plugins: [
        typescript({
          tsconfig: './tsconfig.node.json',
        }),
        json(),
        autoExternal(),
        resolve(),
        commonjs()
      ]
    }
  ]
};
