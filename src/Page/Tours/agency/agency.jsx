import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'

import { API } from '../../../Constants/link'
import { get_tours_agency } from '../../../Redux/tours/tours.action'
import Pagination from '../../../Components/Paginations/pagination'
import { getImg } from '../../../Constants/get-img'
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

const Agency = props => {
    const [tours, setTours] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [page, setPage] = useState([{ index: 1, isActive: false }])

    useEffect(() => {
        fetch()
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
    }



    const handleChangePage = (index) => {
        if (index > page.length || index < 1) {
            return 0
        }
        setCurrentPage(index)
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
                    <input type="text" placeholder="Enter something here..." />
                    <input type="submit" value="Search" />
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
                            tours ?
                                tours.map(data => {
                                    const image = API + data.image[0].replace('\\', '/')
                                    return (
                                        <Link to={`/agency/${data.id}`} style={{ textDecoration: 'none', outline: 'none' }}>
                                            <Cards key={data.id} id={data.id}>
                                                <CardImage>
                                                    <img src={data.image[0]} alt="" />
                                                </CardImage>
                                                <CardContent>
                                                    <Content>
                                                        <p>{data.title}</p>
                                                        <p>{data.username}</p>
                                                        <p>
                                                            {
                                                                data.destination.map((dest, i) => {
                                                                    return i < data.destination.length - 1 ? dest.name + ", " : dest.name
                                                                })
                                                            }
                                                        </p>
                                                        <p>Start: {data.start_date.split('T')[0]}</p>
                                                    </Content>

                                                    <InfoItem>
                                                        <Item>
                                                            <ReactStars
                                                                count={5}
                                                                // onChange={ratingChanged}
                                                                value={data.rating ? data.rating : 4}
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
                                null
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
    get_tours_agency: (data) => dispatch(get_tours_agency(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Agency);