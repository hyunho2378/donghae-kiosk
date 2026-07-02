import { colors, fontFamily, fontSize, spacing, radius, borderWidth, layout } from './src/tokens.js'

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
      borderWidth,
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
