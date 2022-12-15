module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    overrides: [
        {
            files: ['*.tsx', '*.ts']
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname
    },
    plugins: [
        'react'
    ],
    rules: {
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'space-before-function-paren': ['error', 'never']
    }
}
