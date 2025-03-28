import React from 'react'

function HilightedText({text}) {
  return (
    <span className="font-bold text-yellow-100">
        {" "}
        {text} 
    </span>
  )
}

export default HilightedText;