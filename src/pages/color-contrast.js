import React, { useState } from "react"
import "./color-contrast.css"

const Header = ({ children }) => {
  return (
    <div>
      <h1>Color Contrast</h1>
      {children}
    </div>
  )
}

const Pane = ({ children, color }) => {
  const style = { backgroundColor: color }
  return (
    <div className="color-contrast__pane" style={style}>
      {children}
    </div>
  )
}

const hexToRgb = hex => {
  if (hex.length !== 6) return null

  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  return { red, green, blue }
}

const luminance = (red, green, blue) => {
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

const colorForLuminance = original => {
  const color = original / 255

  if (color <= 0.03928) {
    return color / 12.92
  } else {
    return Math.pow((color + 0.055) / 1.055, 2.4)
  }
}

const relativeLuminance = rgb => {
  const red = colorForLuminance(rgb.red)
  const green = colorForLuminance(rgb.green)
  const blue = colorForLuminance(rgb.blue)

  return luminance(red, green, blue)
}

const calculateContrastRatio = (color1, color2) => {
  // https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef

  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (rgb1 === null || rgb2 === null) return -1

  let L1 = relativeLuminance(rgb1)
  let L2 = relativeLuminance(rgb2)

  if (L2 > L1) {
    const temp = L1
    L1 = L2
    L2 = temp
  }

  console.log(L1, L2)

  const ratio = (L1 + 0.05) / (L2 + 0.05)
  const rounded = Math.round(ratio * 100) / 100

  return rounded
}

export default () => {
  const [color1, setColor1] = useState("2ddd2a")
  const [color2, setColor2] = useState("850000")

  const ratio = calculateContrastRatio(color1, color2)

  return (
    <div className="color-contrast">
      <Header>
        <input onChange={e => setColor1(e.target.value)} value={color1} />
        <input onChange={e => setColor2(e.target.value)} value={color2} />
        <div>{ratio}</div>
      </Header>

      <div className="color-contrast__panes">
        <Pane color={`#${color1}`}>
          <div style={{ color: `#${color2}` }}>Hello there.</div>
        </Pane>
        <Pane color={`#${color2}`}>
          <div style={{ color: `#${color1}` }}>Hello there.</div>
        </Pane>
      </div>
    </div>
  )
}
