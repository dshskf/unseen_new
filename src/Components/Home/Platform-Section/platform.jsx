import React from 'react'
import {
    Container,
    Title,
    Sub,
    Platform,
    Instruction,
    List,
    ListHeader,
    PlatformImage
} from './styles'

const instruction_data = [
    {
        header: 1,
        text: "Find your destination"
    },
    {
        header: 2,
        text: "Book, pay and track"
    },
    {
        header: 3,
        text: "Meet with your guides"
    },
    {
        header: 4,
        text: "Enjoy your travels!"
    }
]

const getImage = imgName => require(`../../../Assets/Image/Home/${imgName}`)

const PlatformComponent = props => {
    return (
        <Container>
            <Title>
                <h1>How it works</h1>
            </Title>
            <Sub>
                <Platform>
                    <PlatformImage autoplay>
                        <div>
                            <img src={getImage("b2.jpg")} alt="" />
                        </div>
                        <div>
                            <img src={getImage("b1.jpg")} alt="" />
                        </div>
                    </PlatformImage>
                </Platform>
                <Instruction>
                    {
                        instruction_data.map((data, index) => {
                            return (
                                <List key={index}>
                                    <ListHeader>
                                        <h1>{data.header}</h1>
                                    </ListHeader>
                                    <p>{data.text}</p>

                                </List>
                            )
                        })
                    }
                </Instruction>
            </Sub>
        </Container>
    )
}

export default PlatformComponent