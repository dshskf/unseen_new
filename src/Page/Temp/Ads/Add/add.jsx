import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { serialize } from 'object-to-formdata';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Resizer from '../../../../script/react-file-image-resizer'
import { getImg } from '../../../../Constants/get-img'

import { add_product } from '../../../../Redux/product/product-action'
import { pullToken } from '../../../../Redux/auth/auth-selector'


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
    ButtonBox
} from '../Edit/style'

class Add extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        title: "",
        cost: 0,
        destination: "",
        image: ['', '', '', ''],
        imgShow: ['', '', '', ''],
        start_date: "",
        end_date: "",
        description: ""
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

    submitForm = async e => {
        e.preventDefault()
        let { title, cost, destination, image, start_date, end_date, description } = this.state

        image = image.filter(data => data !== '')

        let dataToSubmit = {
            title: title,
            cost: cost,
            destination: destination,
            image: image,
            description: description,
            start_date: start_date,
            end_date: end_date
        }


        const formData = serialize(dataToSubmit);

        dataToSubmit = {
            form: formData,
            token: this.props.token
        }

        const sendForm = await this.props.addProduct(dataToSubmit)
        if (!sendForm.err) {
            this.props.nav()
        }
    }

    dateHandler = (value, dateString) => {
        this.setState({ start_date: value[0], end_date: value[1] })
    }

    call_file_input = e => document.getElementById('selectImage' + e.currentTarget.id).click()


    render() {
        return (
            <React.Fragment>
                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1>UNSEEN</h1>
                </Header>
                <Container>
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
                            <p>Destination</p>
                            <input type="text" name="destination" value={this.state.destination} onChange={this.inputHandler} placeholder="destination" />
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
                                                            <img src={data} />
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
                            <p>Description</p>
                            <Description name="description" value={this.state.description} onChange={this.inputHandler}></Description>
                        </Item>

                        <ButtonBox>
                            <input type="submit" value="Create" onClick={this.submitForm} />
                            <input type="submit" value="Cancel" onClick={this.props.nav} />
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
    addProduct: data => dispatch(add_product(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Add);