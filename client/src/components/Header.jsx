import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header>
        
        <Link to="/" className='logo'>
            <img src={logo} alt="logo" />
        </Link>
        <nav>
        <Link to='/' className='nav-1'>
            <li>Notes</li>
        </Link>
        <Link to='/add-note' className='nav-2'>
            <li>Add Note</li>
        </Link>
        <Link to='/completed-notes' className='nav-3'>
            <li>Completed Notes</li>
        </Link>
        </nav>
        <div className='line'></div>
    </header>
)
}
