import React from 'react'
import "../styles/style.css"
import { Outlet } from 'react-router-dom'
const Header = () => {
  return (
    <div className="bg-blue-700 h-14 mb-10 flex justify-center items-center text-lg">Header</div>
  )
}

export default Header