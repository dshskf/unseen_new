import React from 'react';
import ReactStars from "react-rating-stars-component";
import { API } from '../../../../Constants/link'

import {
    Container,
    Products,
    Cards,
    Content,
    Info,
    InfoItem,
    Text,
    AddBox,
    AddSub
} from './style'

const Guides = props => {
    return (
        <Container>
            <Products>
                {
                    props.product ?
                        props.product.map(data => {
                            const image = API + data.image[0].replace('\\', '/')
                            return (
                                <Cards key={data.id} id={data.id} onClick={props.nav}>
                                    <Content>
                                        <img src={image} />
                                        <Text>{data.destination}</Text>
                                        <Text>{data.title}</Text>
                                        <Text>Find your best <b>guide</b> for real</Text>
                                    </Content>

                                    <Info>
                                        <InfoItem>
                                            <p>Rating</p>
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
                                        </InfoItem>
                                        <InfoItem>
                                            <p>Cost</p>
                                            <p>${data.cost}/h</p>
                                        </InfoItem>
                                    </Info>
                                </Cards>
                            )
                        })
                        :
                        null
                }
                <AddBox onClick={props.navAdd}>
                    <h1>+</h1>
                </AddBox>
            </Products>
        </Container>
    )
}

export default Guides