import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { serialize } from 'object-to-formdata';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Resizer from '../../../../script/react-file-image-resizer'
import { getImg } from '../../../../Constants/get-img'

import { get_dashboard_detail, edit_tours, delete_tours } from '../../../../Redux/tours/tours.action'
import { get_location_data } from '../../../../Redux/features/features.action'

import { pullToken } from '../../../../Redux/auth/auth.selector'
import { storage } from '../../../../Constants/request'

import { MdKeyboardBackspace } from 'react-icons/md'

import Select from '../../../../Components/Select/select'
import Modal from '../../../../Components/Modal/modal'

import { API } from '../../../../Constants/link'

import {
    Container,
    Item,
    Box,
    Sub,
    Image,
    Dropdown,
    Description,
    Left,
    Right,
    Header,
    ButtonBox,
    DestinationBox,
    DestinationItem
} from './style'

class EditTours extends Component {
    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this);
    }

    state = {
        id: "",
        title: "",
        cost: "",
        image: "",
        imgShow: "", //To show
        image_db: "", //Original image from db
        new_image: ["", "", "", "", ""], //Store to db
        image_to_delete: [], //list of Deleted img
        start_date: null,
        end_date: null,
        description: "",
        isFetch: false,
        period: "",
        destination: [],
        removed_destination: [],
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
        if (!this.state.isFetch) {
            const accountType = storage.type;

            const reqData = {
                id: this.props.match.params.adsId,
                token: this.props.token,
                type: accountType
            }

            let request = await this.props.get_dashboard_detail(reqData)
            let get_countries = await this.props.get_location_data({ action: "countries" })
            request = request.tours

            // Get destination data

            let destination = request.map((data, key) => {
                return data.destination_id && {
                    id: key,
                    destination_id: data.destination_id,
                    city_name: data.city,
                    city_id: data.city_id,
                    period: data.period,
                }

            })
            request = request[0]

            if (request) {
                let { id, title, cost, image, start_date, end_date, description } = request

                start_date = start_date.split('T')[0].replace(/-/g, '/')
                end_date = end_date.split('T')[0].replace(/-/g, '/')

                image = image.map(data => {
                    return API + data.replace('\\', '/')
                })

                this.setState({
                    id: id,
                    title: title,
                    cost: cost,
                    imgShow: image,
                    image_db: image,
                    destination: destination,
                    description: description,
                    start_date: start_date,
                    end_date: end_date,
                    countries: get_countries.data,
                    isFetch: true
                })
            }

        }
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
                        value = uri.blobImg

                        const filterImg = this.state.imgShow.map((data, index) => {
                            if (index.toString() === name.split('-')[1].toString()) {
                                return uri.base64Img
                            }
                            return data
                        })

                        const filterNewImg = this.state.new_image.map((data, index) => {
                            if (index.toString() === name.split('-')[1].toString()) {
                                return value
                            }
                            return data
                        })

                        const thisImage = this.state.imgShow[parseInt(name.split('-')[1])]
                        const check_image_name = thisImage.split('/')[0]

                        if (check_image_name === "http:") {
                            this.setState({ image_to_delete: [...this.state.image_to_delete, thisImage] })
                        }

                        this.setState({ imgShow: filterImg })
                        this.setState({ new_image: filterNewImg })
                    },
                    'base64'
                );
            }
        }
        else {
            this.setState({ [name]: value })
        }
    }

    handleOpenModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

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

    handleRemoveDestination = (key) => {
        const filtered = this.state.destination.filter(data => {
            if (data.id === key && data.destination_id) {
                let rm_dest = this.state.removed_destination
                rm_dest.push(data.destination_id)
                this.setState({ removed_destination: rm_dest })
            } else if (data.id !== key) {
                return data
            }
        })
        this.setState({ destination: filtered })
    }

    handleAddDestination = () => {
        const dest = this.state.destination
        dest.push({
            id: this.state.destination.length,
            tours_id: this.props.match.params.adsId,
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

    submitForm = async e => {
        e.preventDefault()
        let {
            id, title, cost, destination, image_to_delete, new_image,
            image_db, start_date, end_date, description, removed_destination
        } = this.state
        const accountType = storage.type
        new_image = new_image.filter(data => data !== "")

        // Filter new destination        
        destination = destination.filter(dest => dest && !dest.destination_id)

        let dataToSubmit = {
            id: id,
            title: title,
            cost: cost,
            destination: JSON.stringify(destination),
            img_del: image_to_delete,
            img_path: image_db,
            image: new_image,
            description: description,
            start_date: start_date,
            end_date: end_date,
            removed_destination: removed_destination,
            type: accountType
        }
        const formData = serialize(dataToSubmit);

        dataToSubmit = {
            form: formData,
            token: this.props.token
        }

        const sendForm = await this.props.edit_tours(dataToSubmit)
        if (sendForm) {
            this.props.history.push('/ads')
        }
    }

    deleteHandler = async () => {
        const accountType = storage.type
        let rm_dest = this.state.destination.map(dest => {
            if (dest ? dest.destination_id : false) {
                return dest.destination_id
            }
        }).filter(result => result && result)        

        const dataToSubmit = {
            id: this.state.id,
            token: this.props.token,
            type: accountType,
            removed_destination: rm_dest
        }

        const req = await this.props.delete_tours(dataToSubmit)
        if (!req.err) {
            this.props.history.push('/ads')
        }

    }

    dateHandler = (value) => {
        this.setState({ start_date: value[0], end_date: value[1] })
    }

    deleteImage = e => {
        e.stopPropagation();
        console.log(e.currentTarget.id)
    }

    call_file_input = e => document.getElementById('selectImage' + e.currentTarget.id).click()


    optionElement = () => {
        return (
            <React.Fragment>
                <Item isSelect={true}>
                    <p>Country</p>
                    <Select
                        name="countries"
                        handler={this.handleChangeSelect}
                        option={this.state.countries && this.state.countries}
                    />
                </Item>
                <Item isSelect={true}>
                    <p>State</p>
                    <Select
                        name="states"
                        handler={this.handleChangeSelect}
                        option={this.state.states && this.state.states}
                    />
                </Item>
                <Item isSelect={true}>
                    <p>Cities</p>
                    <Select
                        name="cities"
                        handler={this.handleChangeSelect}
                        option={this.state.cities && this.state.cities}
                    />
                </Item>
                <Item>
                    <input type="number" name="period" value={this.state.period} onChange={this.inputHandler} placeholder="Number of Days" />
                </Item>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Header>
                    <img src={getImg("Account", "logo.png")} alt="" />
                    <h1>UNSEEN</h1>
                </Header>

                <Container>
                    <Modal
                        element={this.optionElement}
                        isOpen={this.state.isModalOpen}
                        handleClose={this.handleOpenModal}
                        action={this.handleAddDestination}
                    />
                    <MdKeyboardBackspace
                        style={{ position: 'absolute', top: '-2rem', left: '5%', fontSize: '1.5rem', cursor: 'pointer' }}
                        onClick={() => this.props.history.push('/ads')}
                    />

                    <Left>
                        <Item>
                            <p>Title</p>
                            <input type="text" name="title" value={this.state.title} onChange={this.inputHandler} placeholder="Hello" />
                        </Item>
                        <Item>
                            <p>Cost</p>
                            <input name="cost" value={this.state.cost} type="number" onChange={this.inputHandler} />
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
                                    this.state.imgShow ?
                                        this.state.imgShow.map((data, index) => {
                                            return (
                                                <Sub id={index} onClick={this.call_file_input} key={index}>
                                                    <img src={this.state.imgShow[index]} alt="" />
                                                    <Image>
                                                        <input id={'selectImage' + index} type="file" name={"image-" + index} onChange={this.inputHandler} accept=".png, .jpg, .jpeg" hidden />
                                                        <p>+</p>
                                                    </Image>
                                                    {/* <span id={index} onClick={this.deleteImage}>X</span> */}
                                                </Sub>
                                            )
                                        })
                                        :
                                        null
                                }
                            </Box>

                        </Item>
                    </Left>
                    <Right>
                        <Item>
                            <p>Destination</p>
                            <DestinationBox>
                                {
                                    this.state.destination && this.state.destination.map(dest => dest && (
                                        <DestinationItem key={dest.id}>
                                            <label onClick={() => this.handleRemoveDestination(dest.id)}>X</label>
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
                            <Description name="description" value={this.state.description} onChange={this.inputHandler} placeholder="Enter something..."></Description>
                        </Item>

                        <ButtonBox>
                            <input type="submit" value="Update" onClick={this.submitForm} />
                            <input type="submit" value="Delete" onClick={this.deleteHandler} />
                        </ButtonBox>
                    </Right>
                </Container >
            </React.Fragment >
        )
    }

}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
})

const mapDispatchToProps = (dispatch) => ({
    get_dashboard_detail: data => dispatch(get_dashboard_detail(data)),
    edit_tours: data => dispatch(edit_tours(data)),
    delete_tours: data => dispatch(delete_tours(data)),
    get_location_data: data => dispatch(get_location_data(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditTours);