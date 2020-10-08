import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { get_tours_agency, get_tours_guides } from '../../../Redux/tours/tours.action'
import { pullToken, pullUserData } from '../../../Redux/auth/auth.selector'

import { getImg } from '../../../Constants/get-img'
import Guides from './Guides/guide'
import Agency from './Agency/agency'
import Sidebar from '../../../Components/Sidebar/sidebar'

import {
    Body,
    Container,
    Header,
    Search
} from './style'

const Tours = props => {
    const [dataAgency, setDataAgency] = useState(null)
    const [dataGuides, setDataGuides] = useState(null)
    const [page, setPage] = useState('guides')

    useEffect(() => {
        const req = async () => {
            const post = await props.get_tours_guides()            
            setDataGuides(post.tours)
        }
        req()
    }, [])


    const changePage = async () => {
        const post = await props.get_tours_agency()
        setDataAgency(post.tours)
        setPage(page === "guides" ? "agency" : "guides")
    }

    return (
        <Body>
            <Sidebar page="home" />
            <Container>
                <Header>
                    <img src={getImg("Account", "logo.png")} alt="" />
                    <h1 onClick={changePage}>UNSEEN</h1>
                </Header>
                <Search>
                    <input type="text" placeholder="Enter something here..." />
                    <input type="submit" value="Search" />
                </Search>
                {
                    page === "guides" ?
                        <Guides guides={dataGuides} />
                        :
                        <Agency tours={dataAgency} />
                }
            </Container>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    get_tours_agency: () => dispatch(get_tours_agency()),
    get_tours_guides: () => dispatch(get_tours_guides())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Tours);