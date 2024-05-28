const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const defaultConfig = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./apps/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx}", // Add the ui package
    ],
    theme: {
        colors: {
            bubblegum: "#C4FF33",
            oldbubblegum: '#485C17'
        },
    },
    extend: {},
    plugins: [],
};

export default defaultConfig;