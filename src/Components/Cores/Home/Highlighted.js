import React from 'react'

function HilightedText({text}) {
  return (
    <span className="font-bold text-green">
        {" "}
        {text} 
    </span>
  )
}

export default HilightedText;