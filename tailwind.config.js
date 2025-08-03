/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: ["class"],
		content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
		theme: {
			extend: {
				borderRadius: {
					lg: "var(--radius)",
					md: "calc(var(--radius) - 2px)",
					sm: "calc(var(--radius) - 4px)"
				},
				colors: {
					background: "hsl(var(--background))",
					foreground: "hsl(var(--foreground))",
					card: {
						DEFAULT: "hsl(var(--card))",
						foreground: "hsl(var(--card-foreground))"
					},
					popover: {
						DEFAULT: "hsl(var(--popover))",
						foreground: "hsl(var(--popover-foreground))"
					},
					primary: {
						DEFAULT: "hsl(var(--primary))",
						foreground: "hsl(var(--primary-foreground))"
					},
					secondary: {
						DEFAULT: "hsl(var(--secondary))",
						foreground: "hsl(var(--secondary-foreground))"
					},
					muted: {
						DEFAULT: "hsl(var(--muted))",
						foreground: "hsl(var(--muted-foreground))"
					},
					accent: {
						DEFAULT: "hsl(var(--accent))",
						foreground: "hsl(var(--accent-foreground))"
					},
					destructive: {
						DEFAULT: "hsl(var(--destructive))",
						foreground: "hsl(var(--destructive-foreground))"
					},
					border: "hsl(var(--border))",
					input: "hsl(var(--input))",
					ring: "hsl(var(--ring))",
					chart: {
						"1": "hsl(var(--chart-1))",
						"2": "hsl(var(--chart-2))",
						"3": "hsl(var(--chart-3))",
						"4": "hsl(var(--chart-4))",
						"5": "hsl(var(--chart-5))"
					},
					extend: {
						keyframes: {
							"caret-blink": {
								"0%,70%,100%": {
									opacity: "1"
								},
								"20%,50%": {
									opacity: "0"
								}
							}
						},
						animation: {
							"caret-blink": "caret-blink 1.25s ease-out infinite"
						}
					},
					sidebar: {
						DEFAULT: "hsl(var(--sidebar-background))",
						foreground: "hsl(var(--sidebar-foreground))",
						primary: "hsl(var(--sidebar-primary))",
						"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
						accent: "hsl(var(--sidebar-accent))",
						"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
						border: "hsl(var(--sidebar-border))",
						ring: "hsl(var(--sidebar-ring))"
					}
				},
				keyframes: {
					"bubble-float": {
						"0%": {
							transform: "translateY(0) scale(1.2)",
							opacity: "0",
						},
						"20%": {
							transform: "translateY(-20vh) scale(1.4)",
							opacity: "0.5",
						},
						"60%": {
							transform: "translateY(-50vh) scale(1.4)",
							opacity: "0.5",
						},
						"100%": {
							transform: "translateY(-80vh) scale(1.2)",
							opacity: "0",
						},
					},
					"slide-right": {
						"0%": { transform: "translateX(100%)", opacity: "0" },
						"100%": { transform: "translateX(0)", opacity: "1" },
					},
					"slide-left": {
						"0%": { transform: "translateX(-100%)", opacity: "0" },
						"100%": { transform: "translateX(0)", opacity: "1" },
					},
					"slide-bottom": {
						"0%": { transform: "translateY(-100%)", opacity: "0" },
						"100%": { transform: "translateY(0)", opacity: "1" },
					},
					"slide-top": {
						"0%": { transform: "translateY(-100%)", opacity: "0" },
						"100%": { transform: "translateY(0)", opacity: "1" },
					},
				},
				animation: {
					"bubble-float-1": "bubble-float 8s linear infinite",
					"bubble-float-2": "bubble-float 10s linear infinite 2s",
					"bubble-float-3": "bubble-float 7s linear infinite 4s",

					"slide-from-right": "slide-right 0.7s ease-out forwards",
					"slide-from-left": "slide-left 0.7s ease-out forwards",
					"slide-from-bottom": "slide-bottom 0.7s ease-out backwards",
					"slide-from-top": "slide-top 0.7s ease-out forwards",
				},
			}
		},
  plugins: [require("tailwindcss-animate")],
}
