module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: './tailwind.config.js',
        '@fullhuman/postcss-purgecss': {
            content: ['./src/**/*.vue'],
            whitelistPatterns: [],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
