import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
