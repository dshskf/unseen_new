import React from 'react'
import ReactStars from "react-rating-stars-component";

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
                    props.product ?
                        props.product.map(data => {
                            const image = "http://localhost:1234/" + data.image[0].replace('\\', '/')
                            return (
                                <Cards key={data.id} id={data.id} onClick={props.nav}>
                                    <CardImage>
                                        <img src={image} />
                                    </CardImage>
                                    <CardContent>
                                        <Content>
                                            <p>{data.title}</p>
                                            <p>{data.username}</p>
                                            <p>{"LA -> London -> Paris -> Tokyo -> Rome"}</p>
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
                                            <Item>
                                                <p>${data.cost}</p>
                                            </Item>
                                        </InfoItem>
                                    </CardContent>
                                </Cards>
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