import React, { useRef, useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { serialize } from 'object-to-formdata';

import Resizer from '../../../../script/react-file-image-resizer'
import Sidebar from '../../../../Components/Sidebar/sidebar'
import { getImg } from '../../../../Constants/get-img'
import { Body, Sub, Header } from '../../style.route'
import { storage } from '../../../../Constants/request'

import { get_edit_profile, post_edit_profile } from '../../../../Redux/agency/agency.action'
import { get_location_data } from '../../../../Redux/features/features.action'
import { pullToken } from '../../../../Redux/auth/auth.selector'
import { API } from '../../../../Constants/link'

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



const EditAgencyProfile = props => {
    const clickImage = useRef(null)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        image_to_delete: null,
        image_to_store: null,
        image_to_show: null
    })
    const [location, setLocation] = useState({
        country: [],
        states: [],
        city: [],
        country_id: null,
        state_id: null,
        city_id: null,
        lat: null,
        lng: null
    })


    useEffect(() => {
        const fetchUsers = async () => {
            let user = await props.get_edit_profile({ token: storage.token })
            // user.image = user.image ? user.image.replace('\\', '/') : null
            user = user.data            

            let get_location = await props.get_location_data({ action: "countries" })
            let location_data = { ...location, country: get_location.data }

            // if user already fill location
            if (user.country_id) {
                let state = await props.get_location_data({ action: "states", countries_id: user.country_id })
                let city = await props.get_location_data({ action: "cities", states_id: user.state_id })

                let fetch_location = await props.get_location_data({ action: "fetch_data", cities_id: user.city_id })

                location_data = {
                    ...location_data,
                    ...fetch_location.data[0],
                    states: state.data,
                    city: city.data
                }
            }

            setLocation(location_data)
            setFormData({
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                image_to_show: user.image ? API + user.image : null,
                image_to_store: user.image
            })
        }

        fetchUsers()
    }, [])

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
                        image_to_delete: formData.image_to_store,
                        image_to_show: uri.base64Img,
                        image_to_store: uri.blobImg
                    })
                },
                'base64'
            );
        }
    }

    const inputHandler = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const locationHandler = async e => {
        const { name, value } = e.target
        let getDataLocation
        if (name === 'country') {
            getDataLocation = await props.get_location_data({ action: "states", countries_id: value })

            setLocation({
                ...location,
                country_id: value,
                state_id: null,
                city_id: null,
                city: null,
                states: getDataLocation.data
            })
        }
        else if (name === 'state') {
            getDataLocation = await props.get_location_data({ action: "cities", states_id: value })
            setLocation({
                ...location,
                state_id: value,
                city_id: null,
                city: getDataLocation.data
            })
        } else {
            setLocation({
                ...location,
                city_id: parseInt(value),
            })
        }
    }

    const submitForm = async e => {
        const dataToSubmit = {
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            country: location.country_id,
            state: location.state_id,
            city: location.city_id,
            lat: location.lat,
            lng: location.lng,
            images: formData.image_to_store,
            images_to_delete: formData.image_to_delete
        }
        
        const post = await props.post_edit_profile({ user: serialize(dataToSubmit), token: props.token })
        if (!post.err) {
            props.history.push('/home')
        }
    }

    return (
        <Body>
            <Sidebar page="profile" />
            <Sub>
                <Header>
                    <img src={getImg("Account", "logo.png")} alt="" />
                    <h1>UNSEEN</h1>
                </Header>
                <Container>
                    <Form>
                        <ImageBox>
                            <input type="file" id="image-input" ref={clickImage} onChange={imageHandler} hidden />
                            <img src={formData.image_to_show ? formData.image_to_show : getImg("Account", "guest.png")} onClick={() => clickImage.current.click()} alt="" />
                        </ImageBox>
                        <FormInput>
                            <Left>
                                <InputBox>
                                    <label>Username</label>
                                    <input type="text" name="username" value={formData.username} onChange={inputHandler} />
                                </InputBox>
                                <InputBox>
                                    <label>Email</label>
                                    <input type="text" name="email" value={formData.email} onChange={inputHandler} />
                                </InputBox>
                                <InputBox>
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={inputHandler} />
                                </InputBox>
                            </Left>
                            <Right>
                                <InputBox>
                                    <label>Country</label>
                                    <select name="country" onChange={locationHandler}>
                                        <option value="" disabled selected>Select your country</option>
                                        {
                                            location.country && location.country.map((data, index) => {
                                                if (data.val === location.country_id) {
                                                    return <option key={index} value={data.val} selected>{data.label}</option>
                                                }
                                                return <option key={index} value={data.val}>{data.label}</option>
                                            })
                                        }
                                    </select>
                                </InputBox>
                                <InputBox>
                                    <label>States</label>
                                    <select
                                        name="state"
                                        onChange={locationHandler}
                                        disabled={location.states ? false : true}
                                    >
                                        <option value="" disabled selected>Select your states</option>
                                        {
                                            location.states && location.states.map((data, index) => {
                                                if (data.val === location.state_id) {
                                                    return <option key={index} value={data.val} selected>{data.label}</option>
                                                }
                                                return <option key={index} value={data.val}>{data.label}</option>
                                            })
                                        }
                                    </select>
                                </InputBox>
                                <InputBox>
                                    <label>City</label>
                                    <select
                                        name="city"
                                        onChange={locationHandler}
                                        disabled={location.city ? false : true}
                                    >
                                        <option value="" disabled selected>Select your cities</option>
                                        {
                                            location.city && location.city.map((data, index) => {
                                                if (data.val === location.city_id) {
                                                    return <option key={index} value={data.val} selected>{data.label}</option>
                                                }
                                                return <option key={index} value={data.val} >{data.label}</option>
                                            })
                                        }
                                    </select>
                                </InputBox>
                            </Right>
                        </FormInput>
                        <SubmitBox>
                            <input type="submit" value="UPDATE" onClick={submitForm} />
                        </SubmitBox>
                    </Form>
                </Container>
            </Sub >
        </Body >
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
})

const mapDispatchToProps = (dispatch) => ({
    get_edit_profile: data => dispatch(get_edit_profile(data)),
    post_edit_profile: data => dispatch(post_edit_profile(data)),
    get_location_data: data => dispatch(get_location_data(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditAgencyProfile);