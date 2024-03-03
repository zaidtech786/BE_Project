import React from 'react'
import Navbar from '../Navbar/Navbar'
import HomeCarousel from './../Carousel/HomeCarousel';
import Navigation from './../Navbar/Navigation';
import ProductSection from "../HomeProduct/ProductSection"
import { mens_kurta } from '../Data/Men/men_kurta';
import { mensShoesPage1 } from './../Data/shoes';
import { sareePage1 } from '../Data/Saree/page1';
import { dressPage1 } from '../Data/dress/page1';
import { gounsPage1 } from '../Data/Gouns/gouns';
import { kurtaPage1 } from '../Data/Kurta/kurta';
import { lengha_page1 } from '../Data/Women/LenghaCholi';
import Footer from './../footer/Footer';
const Home = () => {
  return (
    <div> 
        {/* <Navbar/> */}
        <Navigation/>
        <HomeCarousel/>
        <ProductSection data={mens_kurta} sectionName = "Mens Kurta"/>
        {/* <ProductSection data={mensShoesPage1} sectionName = "Mens Shoes"/> */}
        <ProductSection  data={sareePage1} sectionName="Saree"/>
        <ProductSection data={dressPage1} sectionName="Dress"/>
        <ProductSection data={gounsPage1} sectionName="Gouns"/>
        <ProductSection data={kurtaPage1} sectionName="Women's Kurti"/>
        <Footer/>
    </div>
  )
}

export default Home
