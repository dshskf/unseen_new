import React from 'react'
import { getImg } from '../../../Constants/get-img'
import {
    Container,
    Lists,
    Rates,
    Avatars
} from './styles'

const data = [
    {
        img: getImg("Product", "b1.jpg"),
        name: "Elon musk",
        from: "England",
        comment: "greatest ever!!",
        rate: 4
    },
    {
        img: getImg("Product", "b1.jpg"),
        name: "Elon musk",
        from: "England",
        comment: "greatest ever!!",
        rate: 4
    },
    {
        img: getImg("Product", "b1.jpg"),
        name: "Elon musk",
        from: "England",
        comment: "greatest ever!!",
        rate: 4
    },
    {
        img: getImg("Product", "b1.jpg"),
        name: "Elon musk",
        from: "England",
        comment: "greatest ever!!",
        rate: 4
    }
]

const ReviewComponent = props => {
    return (
        <Container>
            <Lists
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <Lists.Item
                        actions={[
                            <p>{item.comment}</p>,
                            <Rates allowHalf disabled defaultValue={item.rate} />
                        ]}
                    >
                        <Lists.Item.Meta
                            avatar={
                                <Avatars src={item.img} />
                            }
                            title={<a href="http://localhost:3000">{item.name}</a>}
                            description={item.from}
                        />
                    </Lists.Item>
                )}
            >
            </Lists>
        </Container>
    )
}

export default ReviewComponent