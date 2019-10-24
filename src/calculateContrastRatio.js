// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
export const calculateContrastRatio = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)

  const L1 = relativeLuminance(rgb1)
  const L2 = relativeLuminance(rgb2)

  const lighter = getLighter(L1, L2)
  const darker = getDarker(L1, L2)

  const ratio = (lighter + 0.05) / (darker + 0.05)
  const rounded = Math.round(ratio * 100) / 100

  return rounded
}

const getLighter = (a, b) => (a > b ? a : b)
const getDarker = (a, b) => (a < b ? a : b)

const hexToRgb = hex => {
  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  return { red, green, blue }
}

const relativeLuminance = rgb => {
  const red = colorForLuminance(rgb.red)
  const green = colorForLuminance(rgb.green)
  const blue = colorForLuminance(rgb.blue)

  return luminance(red, green, blue)
}

const colorForLuminance = original => {
  const color = original / 255

  if (color <= 0.03928) {
    return color / 12.92
  } else {
    return Math.pow((color + 0.055) / 1.055, 2.4)
  }
}

const luminance = (red, green, blue) => {
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}
