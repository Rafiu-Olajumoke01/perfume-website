import React from 'react'
import Banner from './../Banner/Banner'
import Stock from './../Stock/Stock'
import './home.css'

function Home() {
  return (
    <div className='parent_container'>
        <Banner/>
        <Stock/>
    </div>
  )
}

export default Home