import React from 'react';
import { getImg } from '../../../Constants/get-img'
import './styles.css'

const MainComponent = props => {
    return (
        <div class="parent">
            <div class="container">

                <div class="header">
                    <div class="header-logo">
                        <img src={getImg("Account", "logo.png")} alt="" />
                        <h1>UNSEEN</h1>
                    </div>
                    <div class="header-link">
                        <div class="link-item">
                            Travels
                    </div>
                        <div class="link-item">
                            Guides
                    </div>
                        <div class="link-item">
                            About Us
                    </div>
                        <div class="link-item">
                            Contact Us
                    </div>
                    </div>
                    <div class="header-download">
                        <div class="download-item">
                            Android
                    </div>
                        <div class="download-item ios">
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
                    <div class="search-button">
                        =
                </div>
                    <input type="date" />
                </div>
                <div class="search-submit">
                    <a href="#">Find</a>
                </div>
            </div>
        </div>
    )
}

export default MainComponent