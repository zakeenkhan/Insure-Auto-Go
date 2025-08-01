"use client"
import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Flickity from "flickity"
import "flickity/dist/flickity.min.css"

const Slider = (props: any) => {
  const [flickityReady, setFlickityReady] = useState(false)
  const flickityNode = useRef<any>(null)
  const flickityInstance = useRef<any>(null)

  useEffect(() => {
    flickityInstance.current = new Flickity(
      flickityNode.current,
      props.options || {}
    )
    setFlickityReady(true)

    return () => {
      flickityInstance.current.destroy()
    }
  }, [props.options])

  useEffect(() => {
    const refreshFlickity = () => {
      flickityInstance.current.reloadCells()
      flickityInstance.current.resize()
      flickityInstance.current.updateDraggable()
    }

    if (flickityReady) {
      refreshFlickity()
    }
  }, [flickityReady, props.children])

  const renderPortal = () => {
    if (!flickityNode.current) {
      return null
    }

    const mountNode = flickityNode.current.querySelector(".flickity-slider")

    if (mountNode) {
      return ReactDOM.createPortal(props.children, mountNode)
    }
  }

  return (
    <>
      <div className={"test"} ref={flickityNode} />
      {renderPortal()}
    </>
  )
}

export default Slider
