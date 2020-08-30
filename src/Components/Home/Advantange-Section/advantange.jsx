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
        <div class="advantange">
            <div class="head-adv">
                <h1>Why Us?</h1>
            </div>
            <div class="sub-adv">
                <div class="adv-card">
                    <MdAccessTime style={styles.logo} />
                    <h1>Fast</h1>
                    <p>Automobili-Lamborghini S.p.A., sering disebut Lamborghini adalah sebuah pembuat mobil di Italia. </p>
                </div>
                <div class="adv-card mid">
                    <RiMoneyPoundCircleLine style={{ ...styles.logo, fontSize: "7rem" }} />
                    <h1>Cheap</h1>
                    <p>Automobili-Lamborghini S.p.A., sering disebut Lamborghini adalah sebuah pembuat mobil di Italia.</p>
                </div>
                <div class="adv-card">
                    <AiOutlineFieldTime style={styles.logo} />
                    <h1>Experienced</h1>
                    <p>Automobili-Lamborghini S.p.A., sering disebut Lamborghini adalah sebuah pembuat mobil di Italia.</p>
                </div>
            </div>
        </div>
    )
}

export default AdvantangeComponent