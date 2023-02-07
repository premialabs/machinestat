module.exports = {
  content: [
    "./src/_core/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        publicSans: ['Public Sans', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        workSans: ['Work Sans', 'sans-serif'],
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospac'],
        system: ['system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      fontSize: {
        pxs: '13px',
     
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      transitionProperty: {
        height: 'height'
      }
    },
  },
  plugins: [],
}
