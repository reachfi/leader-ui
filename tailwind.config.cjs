const colors = require('tailwindcss/colors');
const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: '#f4f6fd',
				graydark: '#9b9da4',
				// pink: 'FDC7C8',
				// skin: 'FCC38F',
				// purple: '#4430B3',
				cyan: colors.cyan
			},
			screens: {
				'3xl': '1920px'
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};

module.exports = config;
