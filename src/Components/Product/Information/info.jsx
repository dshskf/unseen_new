import React from 'react'
import { getImg } from "../../../Constants/get-img";
// import { RetweetOutlined, MessageOutlined } from '@ant-design/icons'
import {
    Container,
    DataBox,
    ImgBox,
    DataDetail,
    Avatars,
    RatingBox,
    Rates,
    ButtonBox,
    Buttons
} from './styles'

const InfoComponent = props => {
    return (
        <React.Fragment>
            <ImgBox />
            <Container>
                <DataBox>
                    <Avatars src={getImg('Product', 'b2.jpg')} />
                    <DataDetail>
                        <h1>Elon Musk</h1>

                        <p>Jakarta, Indonesia</p>
                        <p>Male, 20</p>
                    </DataDetail>
                </DataBox>
                <RatingBox>
                    <Rates allowHalf disabled defaultValue={4.5} />
                    <p>4.5 / 5</p>
                </RatingBox>
                <ButtonBox>
                    {/* <Buttons type="primary" icon={<RetweetOutlined />}>Book</Buttons> */}
                    {/* <Buttons icon={<MessageOutlined />}>Contact</Buttons> */}
                </ButtonBox>
            </Container>
        </React.Fragment>
    )
}

export default InfoComponent