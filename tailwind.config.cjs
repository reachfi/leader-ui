const colors = require('tailwindcss/colors');
const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: '#f4f6fd',
				graydark: '#9b9da4',
				cyan: colors.cyan
			},
			screens: {
				'3xl': '1920px'
			},
			fontFamily: {
				sans: [
					'Montserrat',
					'Poppins',
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
				poppins: 'Poppins'
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};

module.exports = config;
