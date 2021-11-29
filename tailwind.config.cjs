const colors = require('tailwindcss/colors');
const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				// background: '#f4f6fd',
				graydark: '#9b9da4',
				background: '#e6ecf3',
				cyan: colors.cyan,
				'brand-green': '#8dd3c7'
			},
			screens: {
				'3xl': '1920px'
			},
			fontFamily: {
				sans: [
					'Libre Franklin',
					'Arial',
					'-apple-system',
					'BlinkMacSystemFont',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'Open Sans',
					'Helvetica Neue',
					'sans-serif'
				],
				libre: 'Libre Franklin'
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};

module.exports = config;
