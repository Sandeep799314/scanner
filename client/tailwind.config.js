/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {

      colors: {
        primary: {
          DEFAULT: "#FF6B00",
          light: "#FF8533",
          dark: "#E65C00",
        },
        secondary: "#1F2937",
        muted: "#6B7280",
      },

      backgroundImage: {
        "main-gradient":
          "linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 50%, #FCE7F3 100%)",
        "button-gradient":
          "linear-gradient(135deg, #FF6B00 0%, #F97316 100%)",
      },

      boxShadow: {
        premium: "0 20px 50px rgba(0, 0, 0, 0.08)",
        glow: "0 0 40px rgba(255,107,0,0.35)",
      },

      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease forwards",
      },

    },
  },

  plugins: [],
}