import { colors, fontFamily, fontSize, spacing, radius, layout } from './src/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      spacing,
      borderRadius: radius,
      width: {
        'device-frame': `${layout.deviceFrameWidth}px`,
      },
      height: {
        'device-frame': `${layout.deviceFrameMaxHeight}px`,
      },
    },
  },
  plugins: [],
}
