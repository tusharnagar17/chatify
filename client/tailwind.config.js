/** @type {import('tailwindcss').Config} */
import tailwindScrollBar from "tailwind-scrollbar"

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
        first: '#131324', // black
        second: '#00000076', // lighter
        third: 'rgba(0,0,0.6)',  // extra lighter
        accent: 'rgba(127,0,0,255,0.5)', // button

      },
  },
  plugins: [
    tailwindScrollBar({ nocompitale: true,  preferredStrategy: 'pseudoelements' })
  ]
}
}

