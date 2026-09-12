/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
export default {
    darkMode: ['class'],
    content: [
    './src/**/*.{js,jsx,ts,tsx}',
    ],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Caacupe One"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			// Accessible type scale: nothing on the site renders below 16px, and all
			// body text is 18px whether a component says text-sm or text-base.
			// rem-based, so the browser's own font-size setting still scales it.
			fontSize: {
				xs: ['1rem', { lineHeight: '1.5rem' }],        // 16px - labels, badges (was 12px)
				sm: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px - body text (was 14px)
				base: ['1.125rem', { lineHeight: '1.75rem' }], // 18px - body text (was 16px)
				lg: ['1.25rem', { lineHeight: '1.875rem' }],   // 20px
				xl: ['1.5rem', { lineHeight: '2rem' }],        // 24px
				'2xl': ['1.75rem', { lineHeight: '2.25rem' }], // 28px
				'3xl': ['2rem', { lineHeight: '2.5rem' }],     // 32px
				'4xl': ['2.5rem', { lineHeight: '3rem' }],     // 40px
				'5xl': ['3rem', { lineHeight: '1.15' }],       // 48px
				'6xl': ['3.75rem', { lineHeight: '1.1' }],     // 60px
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
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
				}
			}
  		}
  	},
  	plugins: [animate],
}