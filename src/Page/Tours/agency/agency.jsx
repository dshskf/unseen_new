import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'

import { API } from '../../../Constants/link'
import { get_filter_tours, get_tours_agency } from '../../../Redux/tours/tours.action'
import Pagination from '../../../Components/Paginations/pagination'
import { getImg, renameImg } from '../../../Constants/get-img'
import Sidebar from '../../../Components/Sidebar/sidebar'

import {
    ToursBox,
    Tours,
    Cards,
    CardImage,
    CardContent,
    Content,
    InfoItem,
    Item
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
import { HeaderBox } from '../../style.route';

const Agency = props => {
    const [tours, setTours] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])
    const [searchInput, setSearchInput] = useState('')
    const [errMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (searchInput !== '') {
            findTours()
        } else {
            fetch()
        }

    }, [currentPage])

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

    const fetch = async () => {
        const post = await props.get_tours_agency({ page: currentPage, is_mobile: false })        
        convertPagetoArr(post.total_page)
        setTours(post.tours)
        setErrorMessage('')
    }



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
        const filtered_tours = await props.get_tours_agency({ page: currentPage, is_mobile: false, input: searchInput })
        if (filtered_tours.err) {
            setErrorMessage(filtered_tours.err)
            return
        }

        setTours(filtered_tours.tours)
        convertPagetoArr(filtered_tours.total_page)
        setErrorMessage('')
    }


    return (
        <Body>
            <Sidebar page="home" />
            <Container>
                <HeaderBox>
                    <Header onClick={() => props.history.push('/')}>
                        <img src={getImg("Account", "logo.png")} />
                        <h1>UNSEEN</h1>
                    </Header>
                </HeaderBox>
                <Search>
                    <input type="text" placeholder="Enter something here..." value={searchInput} onChange={handleSearchTours} />
                    <input type="submit" value="Search" onClick={findTours} />
                </Search>
                <Switch>
                    <OptionBox>
                        <Option selected={true}>Tours</Option>
                        <Option onClick={() => props.history.push('/guides')}>Guides</Option>
                    </OptionBox>
                </Switch>
                <ToursBox>
                    <Tours>
                        {
                            tours && errMessage === '' ?
                                tours.map(data => {
                                    const image = renameImg(data.image[0])
                                    return (
                                        <Link to={`/agency/${data.id}`} style={{ textDecoration: 'none', outline: 'none' }}>
                                            <Cards key={data.id} id={data.id}>
                                                <CardImage>
                                                    <img src={image} alt="" />
                                                </CardImage>
                                                <CardContent>
                                                    <Content>
                                                        <p>{data.title}</p>
                                                        <p>{data.username}</p>
                                                        <p>{data.city}
                                                        </p>
                                                        <p>Start: {data.start_date.split('T')[0]}</p>
                                                    </Content>

                                                    <InfoItem>
                                                        <Item>
                                                            <ReactStars
                                                                count={5}
                                                                // onChange={ratingChanged}
                                                                value={data.rating ? data.rating : 0}
                                                                edit={false}
                                                                size={24}
                                                                isHalf={true}
                                                                emptyIcon={<i className="far fa-star"></i>}
                                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                fullIcon={<i className="fa fa-star"></i>}
                                                                activeColor="#ffd700"
                                                            />
                                                        </Item>

                                                    </InfoItem>
                                                </CardContent>
                                            </Cards>
                                        </Link>
                                    )
                                })
                                :
                                <p>{errMessage}</p>
                        }
                    </Tours>
                </ToursBox>
                <Pagination
                    current={currentPage}
                    page={page}
                    actions={handleChangePage}
                />
            </Container>
        </Body>

    )
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    get_tours_agency: (data) => dispatch(get_tours_agency(data)),
    get_filter_tours: (data) => dispatch(get_filter_tours(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Agency);