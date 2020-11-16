import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'


import { FaBars, FaHome, FaUserEdit, FaSitemap } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineAreaChart } from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { RiLogoutBoxLine } from 'react-icons/ri'

import { get_edit_profile as get_agency_profile } from '../../Redux/agency/agency.action'
import { get_edit_profile as get_guides_profile } from '../../Redux/guides/guides.action'
import { get_edit_profile as get_user_profile } from '../../Redux/user/user.action'

import { sign_out } from '../../Redux/auth/auth.action'
import { storage } from '../../Constants/request'

import { getImg } from '../../Constants/get-img'
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
            const accountType = storage && storage.type;
            let user = null

            if (storage) {
                if (accountType === 'agency') {
                    user = await props.get_agency_profile({ token: storage.token })
                } else if (accountType === 'guides') {
                    user = await props.get_guides_profile({ token: storage.token })
                } else {
                    user = await props.get_user_profile({ token: storage.token })
                }
                const { data, err } = user
                if (!err) {
                    let image = null
                    if (data.image) {
                        image = API + data.image.replace('\\', '/')
                    }
                    setUser({ ...data, image: image, account_types: accountType })
                }
            }

        }

        req()

    }, [props.page])

    const sign_outHandler = async () => {
        await props.sign_out()
        window.location.reload();
    }

    return (
        storage &&
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
                open && user ?
                    <User>
                        <img src={user.image ? user.image : getImg('Account', 'guest.png')} alt="" />
                        <h1>{user.username}</h1>
                        <p>{user.email}</p>
                    </User>
                    :
                    null
            }

            <Main isOpen={open}>
                <Item isOpen={open} isActive={active[0]} onClick={() => props.history.push('/guides')}>
                    <FaHome style={nav_icon} />
                    {
                        open ? <p>Home</p> : null
                    }
                </Item>

                <Item
                    isOpen={open}
                    isActive={active[1]}
                    onClick={() => props.history.push(storage.type === "agency" ? '/agency/edit' : '/user/edit')}
                >
                    <FaUserEdit style={nav_icon} />
                    {
                        open ? <p>Profile</p> : null
                    }
                </Item>


                <Item
                    isOpen={open}
                    isActive={active[2]}
                    onClick={() => props.history.push(storage.type === "agency" ? '/agency/dashboard' : '/user/dashboard')}
                >
                    <FaSitemap style={nav_icon} />
                    {
                        open ?
                            storage.type === "agency" ?
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
                    storage.type === "agency" &&
                    <Item isOpen={open} isActive={active[4]} onClick={() => props.history.push('/ads')}>
                        <AiOutlineAreaChart style={nav_icon} />
                        {
                            open ? <p>Ads</p> : null
                        }
                    </Item>
                }

                <Item isOpen={open} isActive={active[5]} isLogout={true} onClick={sign_outHandler}>
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

})

const mapDispatchToProps = (dispatch) => ({
    sign_out: () => dispatch(sign_out()),
    get_agency_profile: (data) => dispatch(get_agency_profile(data)),
    get_guides_profile: (data) => dispatch(get_guides_profile(data)),
    get_user_profile: (data) => dispatch(get_user_profile(data)),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);