/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Custom colors from your palette */
        'dark-blue': "hsl(var(--dark-blue))",
        'light-gray': "hsl(var(--light-gray))",
      },
      fontFamily: {
        // Default Tailwind 'font-sans' mapped to Mulish-Bold
        sans: ["Mulish-Bold", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],

        // Flat keys to use as classes: font-jost-semibold, font-mulish-bold, etc.
        jost: ["Jost-Regular"],
        "jost-thin": ["Jost-Thin"],
        "jost-extralight": ["Jost-ExtraLight"],
        "jost-light": ["Jost-Light"],
        "jost-medium": ["Jost-Medium"],
        "jost-semibold": ["Jost-SemiBold"],
        "jost-bold": ["Jost-Bold"],
        "jost-extrabold": ["Jost-ExtraBold"],

        mulish: ["Mulish-Regular"],
        "mulish-extralight": ["Mulish-ExtraLight"],
        "mulish-light": ["Mulish-Light"],
        "mulish-medium": ["Mulish-Medium"],
        "mulish-semibold": ["Mulish-SemiBold"],
        "mulish-bold": ["Mulish-Bold"],
        "mulish-extrabold": ["Mulish-ExtraBold"],
      },
      borderRadius: {
        xl: "16px",
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
    },
  },
  plugins: [],
};