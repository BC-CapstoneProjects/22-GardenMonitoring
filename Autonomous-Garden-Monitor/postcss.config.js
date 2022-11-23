module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss": {},
    "tailwindcss/nesting": "postcss-nesting",
    "postcss-preset-env": {
      features: {
        "nesting-rules": false,
      },
    },
    "autoprefixer": {},
  },
}
