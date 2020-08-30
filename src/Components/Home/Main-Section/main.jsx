import React, { useState } from "react";
import { getImg } from "../../../Constants/get-img";
import { AiFillAndroid, AiFillApple, AiOutlineSearch } from "react-icons/ai";

import "./styles.css";

const MainComponent = (props) => {
    const [hover, setHover] = useState({
        android: false,
        ios: false
    })

    const handleHover = (component) => {        
        if (!hover[component]) {
            setHover({ ...hover, [component]: true })
        } else {
            setHover({ ...hover, [component]: false })
        }
        return
    }

    const styles = {
        logo: {
            color: 'white',
            fontSize: '20px',
            marginRight: '2px'
        },
        search: {
            color: 'white',
            fontSize: '28px'
        }
    }

    return (
        <div class="parent">
            <div class="container">
                <div class="header">
                    <div class="header-logo">
                        <img src={getImg("Account", "logo.png")} alt="" />
                        <h1>UNSEEN</h1>
                    </div>
                    <div class="header-link">
                        <div class="link-item">Travels</div>
                        <div class="link-item">Guides</div>
                        <div class="link-item">About Us</div>
                        <div class="link-item">Contact Us</div>
                    </div>

                    <div class="header-download">
                        <div class="download-item" onMouseOver={() => handleHover('android')} onMouseLeave={() => handleHover('android')}>
                            <AiFillAndroid style={{ ...styles.logo, color: hover.android ? "white" : "#3ddc84" }} />
                            android
                        </div>
                        <div class="download-item ios" onMouseOver={() => handleHover('ios')} onMouseLeave={() => handleHover('ios')}>
                            <AiFillApple style={{ ...styles.logo, color: hover.ios ? "white" : "rgb(95,95,95)" }} />
                            IOS
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div class="content-title">
                        <h1>Adventure is Worthwhile</h1>
                        <p>Find Your Professional Travel Expert!</p>
                        <div class="title-button">
                            <a href="#">Start Now</a>
                            <a href="#">Sign-Up</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-search">
                <div class="search-logo">
                    <img src={getImg("Home", "island.gif")} alt="" />
                </div>
                <div class="search-input">
                    <input type="date" />
                    <div class="search-button">=</div>
                    <input type="date" />
                </div>
                <div class="search-submit">
                    <AiOutlineSearch style={styles.search} />
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
