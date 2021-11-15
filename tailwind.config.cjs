const colors = require('tailwindcss/colors');
const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				cyan: colors.cyan
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};

module.exports = config;
