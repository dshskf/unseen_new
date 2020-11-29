import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { serialize } from 'object-to-formdata';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Resizer from '../../../script/react-file-image-resizer'
import { getImg } from '../../../Constants/get-img'

import { get_location_data } from '../../../Redux/features/features.action'
import { add_tours } from '../../../Redux/tours/tours.action'
import { pullToken } from '../../../Redux/auth/auth.selector'
import { storage } from '../../../Constants/request'

import Select from '../../../Components/Select/select'
import Modal from '../../../Components/Modal/modal'

import {
    Container,
    Item,
    Box,
    Sub,
    Image,
    Description,
    Left,
    Right,
    Header,
    ButtonBox,
    DestinationBox,
    DestinationItem
} from './style'

class AddTours extends Component {

    state = {
        title: "",
        cost: 0,
        quota: 0,
        image: ['', '', '', ''],
        imgShow: ['', '', '', ''],
        start_date: "",
        end_date: "",
        description: "",
        period: "",
        destination: [],
        countries_id: null,
        countries: null,
        states_id: null,
        states: null,
        cities_id: null,
        cities_name: null,
        cities: null,
        lat: null,
        lng: null,
        isModalOpen: false
    }

    async componentDidMount() {
        let get_countries = await this.props.get_location_data({ action: "countries" })
        this.setState({ countries: get_countries.data })
    }

    clearModalState = () => {
        this.setState({
            period: "",
            countries_id: null,
            states_id: null,
            states: null,
            cities_id: null,
            cities_name: null,
            cities: null,
            lat: null,
            lng: null,
            isModalOpen: false
        })
    }

    inputHandler = e => {
        let { name, value } = e.target

        if (name.split('-')[0] === "image") {
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
                        let index = name.split('-')[1]
                        value = uri.blobImg

                        let new_image = this.state.image
                        let new_imgShow = this.state.imgShow

                        new_image[index] = value
                        new_imgShow[index] = uri.base64Img

                        this.setState({ imgShow: new_imgShow, image: new_image })
                    },
                    'base64'
                );
            }
        }
        else {
            this.setState({ [name]: value })
        }
    }

    handleChangeSelect = async (e) => {
        const { name, value } = e.target

        if (name === 'countries') {
            const getStateData = await this.props.get_location_data({ action: 'states', countries_id: value })
            this.setState({
                countries_id: value,
                states_id: null,
                cities_id: null,
                cities: null,
                states: getStateData.data
            })
        }
        else if (name === 'states') {
            const getCitiesData = await this.props.get_location_data({ action: 'cities', states_id: value })
            this.setState({
                states_id: value,
                cities_id: null,
                cities: getCitiesData.data
            })
        } else {
            const city_name = this.state.cities.filter(c => parseInt(c.val) === parseInt(value))[0]
            this.setState({
                cities_id: parseInt(value),
                cities_name: city_name.label
            })
        }
    }

    handleAddDestination = () => {
        const dest = this.state.destination
        dest.push({
            country_id: this.state.countries_id,
            state_id: this.state.states_id,
            city_id: this.state.cities_id,
            city_name: this.state.cities_name,
            period: this.state.period,
            isGuides: storage.type === 'guides'
        })

        this.setState({ destination: dest })
        this.clearModalState()
    }

    dateHandler = (value, dateString) => {
        this.setState({ start_date: value[0], end_date: value[1] })
    }

    call_file_input = e => document.getElementById('selectImage' + e.currentTarget.id).click()

    submitForm = async e => {
        e.preventDefault()
        let { title, cost, quota, destination, image, start_date, end_date, description } = this.state
        image = image.filter(data => data !== '')

        let dataToSubmit = {
            title: title,
            cost: cost,
            quota: quota,
            quota_left: quota,
            destination: JSON.stringify(destination),
            image: image,
            description: description,
            start_date: start_date,
            end_date: end_date,
        }

        const formData = serialize(dataToSubmit);
        const sendForm = await this.props.add_tours(formData)

        if (!sendForm.err) {
            this.props.history.push('/ads/list/0')
        }
    }

    optionElement = () => {
        return (
            <React.Fragment>
                <Item isSelect={true}>
                    <p>Country</p>
                    <Select
                        name="countries"
                        handler={this.handleChangeSelect}
                        option={this.state.countries && this.state.countries}
                        default="Select Country"
                    />
                </Item>
                <Item isSelect={true}>
                    <p>State</p>
                    <Select
                        name="states"
                        handler={this.handleChangeSelect}
                        option={this.state.states && this.state.states}
                        default="Select State"
                    />
                </Item>
                <Item isSelect={true}>
                    <p>Cities</p>
                    <Select
                        name="cities"
                        handler={this.handleChangeSelect}
                        option={this.state.cities && this.state.cities}
                        default="Select City"
                    />
                </Item>
                <Item>
                    <input type="number" name="period" value={this.state.period} onChange={this.inputHandler} placeholder="Number of Days" />
                </Item>
            </React.Fragment>
        )
    }

    handleOpenModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

    render() {
        return (
            <React.Fragment>
                <Header>
                    <img src={getImg("Account", "logo.png")} alt='' />
                    <h1>UNSEEN</h1>
                </Header>
                <Container>
                    <Modal
                        element={this.optionElement}
                        isOpen={this.state.isModalOpen}
                        handleClose={this.clearModalState}
                        action={this.handleAddDestination}
                    />
                    <Left>
                        <Item>
                            <p>Title</p>
                            <input type="text" name="title" value={this.state.title} onChange={this.inputHandler} />
                        </Item>
                        <Item>
                            <p>Cost</p>
                            <input type="number" name="cost" value={this.state.cost} onChange={this.inputHandler} />
                        </Item>
                        <Item>
                            <p>Quota</p>
                            <input type="number" name="quota" value={this.state.quota} onChange={this.inputHandler} />
                        </Item>
                        <Item>
                            <p>Start & End date</p>
                            <DateRangePicker
                                onChange={this.dateHandler}
                                value={[
                                    this.state.start_date,
                                    this.state.end_date
                                ]}
                                minDate={new Date(Date.now() + (1000 * 60 * 60 * 72))}
                                clearIcon={null}
                                dayPlaceholder={'dd'}
                                monthPlaceholder={'mm'}
                                yearPlaceholder={'yyyy'}
                            />
                        </Item>
                        <Item>
                            <p>Image</p>
                            <Box>
                                {
                                    this.state.imgShow.map((data, index) => {
                                        return (
                                            <Sub id={index} onClick={this.call_file_input}>
                                                {
                                                    data !== '' ?
                                                        <React.Fragment>
                                                            <img src={data} alt='' />
                                                            <span id={index} onClick={this.deleteImage}>X</span>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                                <Image>
                                                    <input id={'selectImage' + index} type="file" name={"image-" + index} onChange={this.inputHandler} accept=".png, .jpg, .jpeg" hidden />
                                                    <p>+</p>
                                                </Image>

                                            </Sub>
                                        )
                                    })
                                }
                            </Box>

                        </Item>
                    </Left>
                    <Right>
                        <Item>
                            <p>Destination</p>
                            <DestinationBox>
                                {
                                    this.state.destination && this.state.destination.map(dest => (
                                        <DestinationItem>
                                            <label>X</label>
                                            <p>{dest.city_name} ({dest.period}days)</p>
                                        </DestinationItem>
                                    ))
                                }
                                <DestinationItem isAdd={true} onClick={this.handleOpenModal}>
                                    <label>+</label>
                                </DestinationItem>
                            </DestinationBox>
                        </Item>
                        <Item>
                            <p>Description</p>
                            <Description name="description" value={this.state.description} onChange={this.inputHandler}></Description>
                        </Item>

                        <ButtonBox>
                            <input type="submit" value="Create" onClick={this.submitForm} />
                            <input type="submit" value="Cancel" onClick={() => this.props.history.push('/ads')} />
                        </ButtonBox>
                    </Right>
                </Container >
            </React.Fragment>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    token: pullToken
})

const mapDispatchToProps = (dispatch) => ({
    add_tours: data => dispatch(add_tours(data)),
    get_location_data: data => dispatch(get_location_data(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AddTours);