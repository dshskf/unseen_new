import React, { useRef, useState } from 'react';

import Resizer from '../../../../script/react-file-image-resizer'
import Sidebar from '../../../../Components/Sidebar/sidebar'
import { getImg } from '../../../../Constants/get-img'
import { Body, Sub, Header } from '../../style.route'

import {
    Container,
    Form,
    FormInput,
    Left,
    Right,
    ImageBox,
    InputBox,
    SubmitBox
} from './style'



const EditUserProfile = props => {
    const clickImage = useRef(null)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phones: '',
        country: '',
        state: '',
        city: '',
        image_to_store: null,
        image_to_show: null
    })

    const imageHandler = e => {
        let file = e.target.files[0]
        let fileExt = file.name.split('.')[1]

        if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg') {
            Resizer.imageFileResizer(
                file,
                400,
                400,
                fileExt,
                100,
                0,
                uri => {
                    setFormData({
                        ...formData,
                        image_to_show: uri.base64Img,
                        image_to_store: uri.blobImg
                    })
                },
                'base64'
            );
        }
    }

    return (
        <Body>
            <Sidebar page="profile" />
            <Sub>
                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1>UNSEEN</h1>
                </Header>
                <Container>
                    <Form>
                        <ImageBox>
                            <input type="file" id="image-input" ref={clickImage} onChange={imageHandler} hidden />
                            <img src={formData.image_to_show ? formData.image_to_show : getImg("Account", "guest.png")} onClick={() => clickImage.current.click()} />
                        </ImageBox>
                        <FormInput>
                            <Left>
                                <InputBox>
                                    <label>Username</label>
                                    <input type="text" />
                                </InputBox>
                                <InputBox>
                                    <label>Email</label>
                                    <input type="text" />
                                </InputBox>
                                <InputBox>
                                    <label>Phones</label>
                                    <input type="text" />
                                </InputBox>
                            </Left>
                            <Right>
                                <InputBox>
                                    <label>Country</label>
                                    <select>
                                        <option value="England">England</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </InputBox>
                                <InputBox>
                                    <label>States</label>
                                    <select>
                                        <option value="England">England</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </InputBox>
                                <InputBox>
                                    <label>City</label>
                                    <select>
                                        <option value="England">England</option>
                                        <option value="USA">USA</option>
                                    </select>
                                </InputBox>
                            </Right>
                        </FormInput>
                        <SubmitBox>
                            <input type="submit" value="UPDATE" />
                        </SubmitBox>
                    </Form>
                </Container>
            </Sub>
        </Body>
    )
}

export default EditUserProfile