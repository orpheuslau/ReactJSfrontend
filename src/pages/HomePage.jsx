import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-3">
        <h1> welcome to the pos</h1>
        <p>this is the first line</p>
        <p>this is the second line</p>
        <Link to="/pos" className="btn btn-primary">Click me to sell product</Link>
      </div>
    </MainLayout>
  )
}

export default HomePage