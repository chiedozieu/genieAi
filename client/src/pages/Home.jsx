import React from 'react'
import Hero from '../components/Hero'
import AiTool from '../components/AiTool'
import Testimonial from '../components/Testimonial'
// import Testimonials2 from '../components/Testimonials2'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
       <AiTool />
       <Testimonial />
       {/* <Testimonials2 /> */}
       <Plan />
       <Footer />
    </div>
  )
}

export default Home