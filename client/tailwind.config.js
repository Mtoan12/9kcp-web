/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            detail: '#ff6c28',
            secondary: '#f0f0f0',
        },
    },
    plugins: [require('flowbite/plugin')],
};
