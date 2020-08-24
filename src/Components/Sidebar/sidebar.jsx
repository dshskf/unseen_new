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
import { API } from '../../Constants/link'


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
            await axios.get(API + "user/edit", {
                headers:
                {
                    "Authorization": `Bearer ${props.token}`
                }
            })
                .then(res => {
                    const { data, err } = res.data
                    if (!err) {
                        let image = null
                        if (data.image) {
                            image = API + data.image.replace('\\', '/')
                        }
                        console.log(data)
                        setUser({ ...data, image: image })
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
        user ?
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
                        <User>
                            <img src={user.image ? user.image : getImg('Account', 'guest.png')} />
                            <h1>{user.username}</h1>
                            <p>{user.email}</p>
                        </User>

                        :
                        null
                }

                <Main isOpen={open}>
                    <Item isOpen={open} isActive={active[0]} onClick={() => props.history.push('/home')}>
                        <FaHome style={nav_icon} />
                        {
                            open ? <p>Home</p> : null
                        }
                    </Item>

                    <Item
                        isOpen={open}
                        isActive={active[1]}
                        onClick={() => props.history.push(user.account_types === "guides" ? '/guides/edit' : '/user/edit')}
                    >
                        <FaUserEdit style={nav_icon} />
                        {
                            open ? <p>Profile</p> : null
                        }
                    </Item>


                    <Item
                        isOpen={open}
                        isActive={active[2]}
                        onClick={() => props.history.push(user.account_types === "admin" ? '/admin/dashboard' : '/user/dashboard')}
                    >
                        <FaSitemap style={nav_icon} />
                        {
                            open ?
                                user.account_types === "admin" ?
                                    <p>Dashboard</p>
                                    :
                                    <p>Order</p>
                                :
                                null
                        }
                    </Item>

                    <Item isOpen={open} isActive={active[3]} onClick={() => props.history.push('/chats')}>
                        <BsFillChatDotsFill style={nav_icon} />
                        {
                            open ? <p>Chats</p> : null
                        }
                    </Item>
                    {
                        user.account_types === "admin" ?
                            <Item isOpen={open} isActive={active[4]} onClick={() => props.history.push('/ads')}>
                                <AiOutlineAreaChart style={nav_icon} />
                                {
                                    open ? <p>Ads</p> : null
                                }
                            </Item>
                            :
                            null
                    }

                    <Item isOpen={open} isActive={active[5]} isLogout={true} onClick={signOutHandler}>
                        <RiLogoutBoxLine style={nav_icon} />
                        {
                            open ? <p>Logout</p> : null
                        }
                    </Item>
                </Main >
            </Container >
            :
            null
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