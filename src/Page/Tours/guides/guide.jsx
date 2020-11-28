import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'

import { color_collections } from './color'
import { API } from '../../../Constants/link'
import { get_filter_tours, get_tours_guides } from '../../../Redux/tours/tours.action'
import Pagination from '../../../Components/Paginations/pagination'
import { defaultProfile, getImg } from '../../../Constants/get-img'
import Sidebar from '../../../Components/Sidebar/sidebar'

import {
    ToursBox,
    Tours,
    Cards,
    Content,
    Info,
    InfoItem,
    Text,
} from './style'

import {
    Body,
    Container,
    Header,
    Search,
    Switch,
    OptionBox,
    Option
} from '../style'



const Guides = props => {
    const [guides, setGuides] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])
    const [searchInput, setSearchInput] = useState('')
    const [errMessage, setErrorMessage] = useState('')
    let indexColor = 0

    useEffect(() => {
        fetch(currentPage)
    }, [])

    const convertPagetoArr = (total) => {
        const temp = []
        for (let i = 1; i <= total; i++) {
            if (i === currentPage) {
                temp.push({ index: i, isActive: true })
                continue
            }
            temp.push({ index: i, isActive: false })
        }

        setPage(temp)
    }

    const fetch = async (page) => {
        const post = await props.get_tours_guides({ page: page, is_mobile: false })
        convertPagetoArr(post.total_page)
        setGuides(post.guides)
        setErrorMessage('')
    }

    useEffect(() => {
        fetch(currentPage)
    }, [currentPage])

    const handleChangePage = (index) => {
        if (index > page.length || index < 1) {
            return 0
        }
        setCurrentPage(index)
    }

    const handleSearchTours = async e => {
        setSearchInput(e.target.value)
    }

    const findTours = async () => {      
        const filtered_tours = await props.get_tours_guides({ page: currentPage, is_mobile: false,input: searchInput })
        if (filtered_tours.err) {
            setErrorMessage(filtered_tours.err)
            return
        }

        setGuides(filtered_tours.guides)
        convertPagetoArr(filtered_tours.total_page)
        setErrorMessage('')
    }

    return (
        <Body>
            <Sidebar page="home" />
            <Container>
                <Header>
                    <img src={getImg("Account", "logo.png")} alt="" />
                    <h1>UNSEEN</h1>
                </Header>
                <Search>
                    <input type="text" placeholder="Enter something here..." value={searchInput} onChange={handleSearchTours} />
                    <input type="submit" value="Search" onClick={findTours} />
                </Search>
                <Switch>
                    <OptionBox>
                        <Option onClick={() => props.history.push('/agency')}>Tours</Option>
                        <Option selected={true}>Guides</Option>
                    </OptionBox>
                </Switch>
                <ToursBox>
                    <Tours>
                        {
                            guides ?
                                guides.map(data => {
                                    const image = defaultProfile
                                    // Generate gradient color
                                    indexColor += 1
                                    if (indexColor > 7) {
                                        indexColor = 0
                                    }
                                    return (
                                        <Link key={data.id} to={`/guides/${data.id}`} style={{ textDecoration: 'none', outline: 'none' }}>
                                            <Cards key={data.id} id={data.id} color={color_collections[indexColor]}>
                                                <Content color={color_collections[indexColor]} >
                                                    <img src={data.image} alt="" />
                                                    <Text>{data.country}</Text>
                                                    <Text>{data.username}</Text>
                                                </Content>

                                                <Info>
                                                    <InfoItem>
                                                        <p>Cost</p>
                                                        <p>${data.cost}/h</p>
                                                    </InfoItem>
                                                    <InfoItem>
                                                        <ReactStars
                                                            count={5}
                                                            // onChange={ratingChanged}
                                                            value={data.rating ? data.rating : 4.5}
                                                            edit={false}
                                                            size={20}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd700"
                                                        />
                                                    </InfoItem>
                                                </Info>
                                            </Cards>
                                        </Link>
                                    )
                                })
                                :
                                null // it will be loading circle
                        }
                    </Tours>
                    <Pagination
                        current={currentPage}
                        page={page}
                        actions={handleChangePage}
                    />
                </ToursBox>
            </Container>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    get_tours_guides: (data) => dispatch(get_tours_guides(data)),
    get_filter_tours: (data) => dispatch(get_filter_tours(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Guides);