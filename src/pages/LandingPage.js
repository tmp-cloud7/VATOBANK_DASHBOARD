import React from 'react'
import styles from "../style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, NavbarLanding, Stats, Testimonials, Hero } from "../component";


const LandingPage = () => {
  return (  
  <div className="bg-primary w-full overflow-hidden">

        <NavbarLanding />
   

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
       
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default LandingPage

