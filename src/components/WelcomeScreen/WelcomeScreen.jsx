import React, {useRef, useEffect, useState} from 'react'
import { PropTypes } from 'prop-types'
import Clouds from 'vanta/dist/vanta.clouds.min'
import * as THREE from "three"

const WelcomeScreen = ({ children }) => {
    const myRefDiv = useRef(null)
    const [vanta, setVanta] = useState(0)
    console.log("valor del myRefDiv.current con useRef: ", myRefDiv.current)

useEffect(() => {
    console.log("valor del myRefDiv.current con useEffect: ", myRefDiv.current)

    if(!vanta) {
        setVanta(
        Clouds({
            THREE,
            el: myRefDiv.current
        }))
        console.log("establezco vanta a un valor diff de 0")
    }

    return () => {
        if(vanta) {
            vanta.destroy()
            console.log("Libero los recursos")
        }
    }

}, [vanta])
    return (
    <div className='full' ref={myRefDiv}>
            <div>
                {children}
            </div>            
    </div>
  )
}


WelcomeScreen.propTypes = {
    children : PropTypes.node,
}

export default WelcomeScreen
