import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


import { FaBars, FaHome, FaUserEdit, FaSitemap } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineAreaChart } from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { RiLogoutBoxLine } from 'react-icons/ri'

import { getImg } from '../../Constants/get-img'
import { pullToken } from '../../Redux/auth/auth-selector'
import { sign_out } from '../../Redux/auth/auth-action'

import {
    Container,
    Top,
    Main,
    Item,
    icon,
    open_icon,
    nav_icon,
    User
} from './style'


const Sidebar = props => {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState([0, 0, 0, 0, 0])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const listPage = ["home", "profile", "dashboard", "chats", "ads"]
        const newPage = active.map((data, index) => {
            if (props.page === listPage[index]) {
                return 1
            }
            return 0
        })
        setActive(newPage)

        const req = async () => {
            await axios.get("http://localhost:1234/user/edit", {
                headers:
                {
                    "Authorization": `Bearer ${props.token}`
                }
            })
                .then(res => {
                    const { data, err } = res.data
                    console.log(res.data)
                    if (!err) {
                        let image = null
                        if (data.image) {
                            image = "http://localhost:1234/" + data.image.replace('\\', '/')
                        }

                        setUser({
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            image: image
                        })
                    }
                })
        }

        req()

    }, [props.page])

    const signOutHandler = async () => {
        await props.signOut()
        window.location.reload();
    }

    return (
        <Container isOpen={open}>
            <Top isOpen={open}>
                {
                    open ?
                        <React.Fragment>
                            <p>UNSEEN</p>
                            <AiOutlineClose style={open_icon} onClick={() => setOpen(!open)} />
                        </React.Fragment>
                        :
                        <FaBars style={icon} onClick={() => setOpen(!open)} />
                }
            </Top>
            {
                open ?
                    user ?
                        <User>
                            <img src={user.image ? user.image : getImg('Account', 'guest.png')} />
                            <h1>{user.username}</h1>
                            <p>{user.email}</p>
                        </User>
                        : null
                    :
                    null
            }

            <Main isOpen={open}>
                <Item isOpen={open} isActive={active[0]} onClick={() => props.history.push('temp')}>
                    <FaHome style={nav_icon} />
                    {
                        open ? <p>Home</p> : null
                    }
                </Item>
                <Item isOpen={open} isActive={active[1]}>
                    <FaUserEdit style={nav_icon} />
                    {
                        open ? <p>Profile</p> : null
                    }
                </Item>

                <Item isOpen={open} isActive={active[2]} onClick={() => props.history.push('d-admin')}>
                    <FaSitemap style={nav_icon} />
                    {
                        open ? <p>Dashboard</p> : null
                    }
                </Item>
                <Item isOpen={open} isActive={active[3]} onClick={() => props.history.push('chats')}>
                    <BsFillChatDotsFill style={nav_icon} />
                    {
                        open ? <p>Chats</p> : null
                    }
                </Item>
                <Item isOpen={open} isActive={active[4]} onClick={() => props.history.push('ads')}>
                    <AiOutlineAreaChart style={nav_icon} />
                    {
                        open ? <p>Ads</p> : null
                    }
                </Item>
                <Item isOpen={open} isActive={active[5]} isLogout={true} onClick={signOutHandler}>
                    <RiLogoutBoxLine style={nav_icon} />
                    {
                        open ? <p>Logout</p> : null
                    }
                </Item>
            </Main >
        </Container >
    )
}
const mapStateToProps = createStructuredSelector({
    token: pullToken
})

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(sign_out())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);