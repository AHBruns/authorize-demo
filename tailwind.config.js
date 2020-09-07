module.exports = {
  purge: ["pages/**/*.*", "components/**/*.*"],
  theme: {
    extend: {},
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {},
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
};
