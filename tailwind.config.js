/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',  // Adjust these paths to point to your source directory
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}', // If you have features directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
