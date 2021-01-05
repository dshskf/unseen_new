import React from "react";
import { MdAccessTime } from "react-icons/md";
import { RiMoneyPoundCircleLine } from 'react-icons/ri'
import { AiOutlineFieldTime } from 'react-icons/ai'

import { color } from '../../../Constants/color'
import "./styles.css";

const AdvantangeComponent = (props) => {
    const styles = {
        logo: {
            color: color.primary,
            fontSize: '6rem'
        }
    }

    return (
        <div className="advantange">
            <div className="head-adv">
                <h1>Why Us?</h1>
            </div>
            <div className="sub-adv">
                <div className="adv-card">
                    <MdAccessTime style={styles.logo} />
                    <h1>Fast</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="adv-card mid">
                    <RiMoneyPoundCircleLine style={{ ...styles.logo, fontSize: "7rem" }} />
                    <h1>Cheap</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="adv-card">
                    <AiOutlineFieldTime style={styles.logo} />
                    <h1>Experienced</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </div>
    )
}

export default AdvantangeComponent