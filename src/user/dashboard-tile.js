import React from 'react';
import './dashboard-tile.css';

import HealthBeautyImage from '../assets/Health & Beauty.jpg';
import HouseHold from '../assets/HouseHold.jpg';
import CBDProducts from '../assets/CBDProducts.jpg';
import Confectionery from '../assets/Confectionery.jpg';
import KidsBaby from '../assets/KidsBaby.jpg';
import Grocery from '../assets/Grocery.jpg';
import { Link } from 'react-router-dom';

const TileShop = () => {
  return (
    <>
    <div class="shop-container">
        <div class="card" style={{ backgroundImage: `url(${HealthBeautyImage})` }}>
            <img src={HealthBeautyImage} alt="Health & Beauty" />
            <div class="overlay">
                <h2>Health & Beauty</h2>
                <Link to="/healthbeauty" class="shop-button">Shop Now</Link>
            </div>
        </div>
        <div class="card">
            <img src={HouseHold} alt="HouseHold"/>
            <div class="overlay">
                <h2>HouseHold</h2>
                 <Link to="/household" class="shop-button">Shop Now</Link>
            </div>
        </div>
        <div class="card">
            <img src={CBDProducts} alt="CBD Products" />
            <div class="overlay">
                <h2>CBD Products</h2>
                <Link to="/cbdproducts" class="shop-button">Shop Now</Link>
            </div>
        </div>
        <div class="card">
            <img src={Confectionery} alt="Confectionery" />
            <div class="overlay">
                <h2>Confectionery</h2>
                <Link to="/confectionery" class="shop-button">Shop Now</Link>
            </div>
        </div>
        <div class="card">
            <img src={KidsBaby} alt="Kids & Baby" />
            <div class="overlay">
                <h2>Kids & Baby</h2>
                <Link to="/kidsbaby" class="shop-button">Shop Now</Link>
            </div>
        </div>
        <div class="card">
            <img src={Grocery} alt="Kids & Baby" />
            <div class="overlay">
                <h2>Grocery</h2>
                <Link to="/grocery" class="shop-button">Shop Now</Link>
            </div>
        </div>
    </div>
    </>
    );
}

export default TileShop;