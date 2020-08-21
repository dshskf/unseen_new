import React from 'react'
import { data as userData } from './data'
import { Typography } from 'antd'

import {
    Container,
    Switch,
    SwitchItem,
    Sub,
    Item,
    ImageContainer,
    DataContainer,
    Personal,
    PersonalData,
    PersonalPrice,
    Review,
    Perfomance,
    PerfomanceItem,
    Title,
    Links,
    ReviewList,
    Avatars
} from './styles'

const ItemComponent = props => {
    const image = require("../../../Assets/Image/Home/b2.jpg")
    const { Text } = Typography
    return (
        <Container>
            <Switch>
                <SwitchItem isActive={true}>
                    <Links isActive={true}>TOUR GUIDES</Links>
                </SwitchItem>
                <SwitchItem isActive={false}>
                    <Links isActive={false}>PACKETS</Links>
                </SwitchItem>
            </Switch>
            <Sub >
                {
                    userData.map((data, index) => {
                        return (
                            <Item key={index}>
                                <ImageContainer>
                                    <img src={image} alt="" />
                                </ImageContainer>

                                <DataContainer>
                                    <Personal>
                                        <PersonalData>
                                            <p>{data.name}</p>
                                            <p>{data.location}</p>
                                        </PersonalData>
                                        <PersonalPrice>
                                            <p>${data.price}/H</p>
                                        </PersonalPrice>
                                    </Personal>
                                    <Review dotPosition="left">
                                        <ReviewList>
                                            <Avatars src={image} />
                                            <Text>Wow thats Amazing man</Text>
                                        </ReviewList>
                                        <ReviewList>
                                            <Avatars src={image} />
                                            <Text>Wow thats Amazing man</Text>
                                        </ReviewList>
                                    </Review>
                                    <Perfomance>
                                        <PerfomanceItem>
                                            <Title>Status</Title>
                                            <p>{data.status}</p>
                                        </PerfomanceItem>
                                        <PerfomanceItem>
                                            <Title>Reviews</Title>
                                            <p>{data.review}</p>
                                        </PerfomanceItem>
                                        <PerfomanceItem>
                                            <Title>Rating</Title>
                                            <p>{data.rating}/10</p>
                                        </PerfomanceItem>
                                    </Perfomance>
                                </DataContainer>
                            </Item>
                        )
                    })
                }
            </Sub>
        </Container>

    )
}

export default ItemComponent