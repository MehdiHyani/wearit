/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#292929',
                secondary: '#efc700',
                tertiary: '#f3f3f3'
            }
        }
    },
    plugins: []
};
