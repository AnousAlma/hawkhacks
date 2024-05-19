import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// random generator of either 1 or 2
const random = () => {
  return Math.floor(Math.random() * 2) + 1
}

const list = ['/question', '/vid_question']


const Play = () => {
    let navigate = useNavigate()

    useEffect(() => {
        navigate(list[random() - 1])
    }, [])
    return (
        <div>Play</div>
    )
}

export default Play