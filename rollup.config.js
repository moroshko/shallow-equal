import typescript from 'rollup-plugin-typescript';

export default {
  input: './main.ts',
  plugins: [
    typescript()
  ]
};
