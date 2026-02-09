import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        // UI Brand Colors
                        ui: {
                                yellow: {
                                        DEFAULT: '#FFC107',
                                        50: '#FFF9E6',
                                        100: '#FFF3CC',
                                        200: '#FFE699',
                                        300: '#FFDA66',
                                        400: '#FFCC33',
                                        500: '#FFC107',
                                        600: '#FFB300',
                                        700: '#FFA000',
                                        800: '#FF8F00',
                                        900: '#FF6F00',
                                },
                                navy: {
                                        DEFAULT: '#1A237E',
                                        50: '#E8EAF6',
                                        100: '#C5CAE9',
                                        200: '#9FA8DA',
                                        300: '#7986CB',
                                        400: '#5C6BC0',
                                        500: '#1A237E',
                                        600: '#0D47A1',
                                        700: '#01579B',
                                        800: '#0D47A1',
                                        900: '#0D47A1',
                                }
                        },
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        unipas: {
                                primary: 'hsl(var(--unipas-primary))',
                                secondary: 'hsl(var(--unipas-secondary))',
                                accent: 'hsl(var(--unipas-accent))',
                                muted: 'hsl(var(--unipas-muted))',
                                text: 'hsl(var(--unipas-text))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
