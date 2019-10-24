import React, { useState } from "react"
import "./color-contrast.css"
import { calculateContrastRatio } from "../calculateContrastRatio"

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

export default () => {
  const [color1, setColor1] = useState("2ddd2a")
  const [color2, setColor2] = useState("850000")

  let ratio = "N/A"

  if (color1.length === 6 && color2.length === 6) {
    ratio = calculateContrastRatio(color1, color2)
  }

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
