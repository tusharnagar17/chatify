/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6A00',
        secondary: '#4ECDC4',
        accent: '#2E86AB',
        back: "#131324",
        front: "#00000076"

      },
  },
  plugins: [],
}
}

