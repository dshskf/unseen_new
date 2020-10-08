import React, { useState } from "react";
import { getImg } from "../../../Constants/get-img";
import { AiFillAndroid, AiFillApple, AiOutlineSearch } from "react-icons/ai";

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'

import { storage } from '../../../Constants/request'
import { pullToken } from '../../../Redux/auth/auth.selector'

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
        <div className="parent">
            <div className="container">
                <div className="header">
                    <div className="header-logo">
                        <img src={getImg("Account", "logo.png")} alt="" />
                        <h1>UNSEEN</h1>
                    </div>
                    <div className="header-link">
                        <div className="link-item">Travels</div>
                        <div className="link-item">Guides</div>
                        <div className="link-item">About Us</div>
                        <div className="link-item">Contact Us</div>
                    </div>

                    <div className="header-download">
                        <div className="download-item" onMouseOver={() => handleHover('android')} onMouseLeave={() => handleHover('android')}>
                            <AiFillAndroid style={{ ...styles.logo, color: hover.android ? "white" : "#3ddc84" }} />
                            android
                        </div>
                        <div className="download-item ios" onMouseOver={() => handleHover('ios')} onMouseLeave={() => handleHover('ios')}>
                            <AiFillApple style={{ ...styles.logo, color: hover.ios ? "white" : "rgb(95,95,95)" }} />
                            IOS
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="content-title">
                        <h1 onClick={() => console.log(props.token)}>Adventure is Worthwhile</h1>
                        <p>Find Your Professional Travel Expert!</p>
                        <div className="title-button">
                            <Link to='/home'>Start Now</Link>
                            {
                                !storage && <Link to='/user/auth'>Sign-Up</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-search">
                <div className="search-logo">
                    <img src={getImg("Home", "island.gif")} alt="" />
                </div>
                <div className="search-input">
                    <input type="date" />
                    <div className="search-button">=</div>
                    <input type="date" />
                </div>
                <div className="search-submit">
                    <AiOutlineSearch style={styles.search} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    token: pullToken
})

const mapDispatchToProps = (dispatch) => ({

})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MainComponent);