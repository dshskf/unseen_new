import React from 'react';
import ReactStars from "react-rating-stars-component";
import { color_collections } from './color'
import { API } from '../../../../Constants/link'

import {
    Container,
    Products,
    Cards,
    Content,
    Info,
    InfoItem,
    Text
} from './style'

const Guides = props => {
    let i = 0
    return (
        <Container>
            <Products>
                {
                    props.product ?
                        props.product.map(data => {
                            const image = API + data.image[0].replace('\\', '/')
                            i += 1
                            if (i > 7) {
                                i = 0
                            }
                            return (
                                <Cards key={data.id} id={data.id} onClick={props.nav} color={color_collections[i]}>
                                    <Content color={color_collections[i]}>
                                        <img src={image} />
                                        <Text>{data.destination}</Text>
                                        <Text>{data.title}</Text>                                        
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
                            )
                        })
                        :
                        null
                }
            </Products>
        </Container>
    )
}

export default Guides