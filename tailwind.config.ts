import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#004080',
                secondary: '#1DCAF4',
                tertiary: '#FF6B00',
                quaternary: '#FFC000',
            },
            backgroundImage: {
                pattern: "url('../public/assets/img/bg-pattern.png')",
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                lg: '2rem',
                xl: '3rem',
                '2xl': '12rem',
            },
        },
    },
    plugins: [],
};
export default config;
