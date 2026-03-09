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
    <div className="shop-container">
        <div className="card" style={{ backgroundImage: `url(${HealthBeautyImage})` }}>
            <img src={HealthBeautyImage} alt="Health & Beauty" />
            <div className="overlay">
                <h2>Health & Beauty</h2>
                <Link to="/healthbeauty" className="shop-button">Shop Now</Link>
            </div>
        </div>
        <div className="card">
            <img src={HouseHold} alt="HouseHold"/>
            <div className="overlay">
                <h2>HouseHold</h2>
                 <Link to="/household" className="shop-button">Shop Now</Link>
            </div>
        </div>
        <div className="card">
            <img src={CBDProducts} alt="CBD Products" />
            <div className="overlay">
                <h2>CBD Products</h2>
                <Link to="/cbdproducts" className="shop-button">Shop Now</Link>
            </div>
        </div>
        <div className="card">
            <img src={Confectionery} alt="Confectionery" />
            <div className="overlay">
                <h2>Confectionery</h2>
                <Link to="/confectionery" className="shop-button">Shop Now</Link>
            </div>
        </div>
        <div className="card">
            <img src={KidsBaby} alt="Kids & Baby" />
            <div className="overlay">
                <h2>Kids & Baby</h2>
                <Link to="/kidsbaby" className="shop-button">Shop Now</Link>
            </div>
        </div>
        <div className="card">
            <img src={Grocery} alt="Kids & Baby" />
            <div className="overlay">
                <h2>Grocery</h2>
                <Link to="/grocery" className="shop-button">Shop Now</Link>
            </div>
        </div>
    </div>
    </>
    );
}

export default TileShop;