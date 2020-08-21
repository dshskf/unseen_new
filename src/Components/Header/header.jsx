import React, { useState } from "react";
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { pullLoginStatus } from '../../Redux/auth/auth-selector'
import { sign_out } from '../../Redux/auth/auth-action'

import { getImg } from '../../Constants/get-img'
import {
    Container,
    Sub,
    Item,
    Links,
    User,
    Avatars,
    Dropdowns,
    Menus,
    UserText,
    UserItem
} from "./styles";

const Headers = (props) => {
    const item_data = ["Tours", "Guide", "About", "Sign-up"];
    const [hover, setHover] = useState(false)

    const hoverHandler = () => setHover(!hover)

    const itemStyle = {
        display: 'flex',
        alignItems: 'center !important'
    }

    const signOutHandler = async () => {
        await props.signOut()
        window.location.reload();
    }

    const menu = (<Menus>
        <Menus.Item style={itemStyle}>
            <UserItem>Edit Profile</UserItem>
        </Menus.Item>
        <Menus.Item style={itemStyle}>
            <UserItem>Orders</UserItem>
        </Menus.Item>
        <Menus.Item style={itemStyle}>
            <UserItem isLogout={true} onClick={signOutHandler}>Logout</UserItem>
        </Menus.Item>
    </Menus>)

    return (
        <Container>
            <Sub>
                <h1>UNSEEN</h1>
            </Sub>
            <Sub>
                {
                    props.isLogin ?
                        <User>
                            <Dropdowns overlay={menu}>
                                <UserText>Alexander Kevin</UserText>
                            </Dropdowns>
                            <Avatars size={40} src={getImg("Product", "b1.jpg")} />
                        </User>
                        :
                        item_data.map((data, index) => {
                            return (
                                <Item
                                    key={index}
                                    onMouseOver={index === item_data.length - 1 ? hoverHandler : undefined}
                                    onMouseLeave={index === item_data.length - 1 ? hoverHandler : undefined}
                                    isRegister={index === item_data.length - 1}
                                >

                                    <Links
                                        isHover={hover}
                                        isRegister={index === item_data.length - 1}
                                        to="/register"
                                    >{data}</Links>
                                </Item>
                            );
                        })
                }
            </Sub>
        </Container>
    );
};



const mapStateToProps = createStructuredSelector({
    isLogin: pullLoginStatus
})

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(sign_out())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Headers);
