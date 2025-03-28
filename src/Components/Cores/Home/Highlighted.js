import React from 'react'

function HilightedText({text}) {
  return (
    <span className="font-bold hilightGradient">
        {" "}
        {text} 
    </span>
  )
}

export default HilightedText;