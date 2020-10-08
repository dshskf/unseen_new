import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import { API } from '../../../../Constants/link'

import {
    Container,
    Product,
    Cards,
    CardImage,
    CardContent,
    Content,
    InfoItem,
    Item
} from './style'

const Agency = props => {
    return (
        <Container>
            <Product>
                {
                    props.tours ?
                        props.tours.map(data => {
                            const image = API + data.image[0].replace('\\', '/')
                            return (
                                <Link to={`/tours/agency/${data.id}`} style={{ textDecoration: 'none', outline: 'none' }}>
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
            </Product>
        </Container>

    )
}

export default Agency