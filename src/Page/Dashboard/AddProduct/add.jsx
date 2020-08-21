import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { serialize } from 'object-to-formdata';

import Resizer from '../../../script/react-file-image-resizer'
import { add_product } from '../../../Redux/product/product-action'
import { pullToken } from '../../../Redux/auth/auth-selector'

import UploadImage from '../../../Components/Upload/upload'
import {
    Container,
    Forms,
    Left,
    Right,
    Inputs,
    TextArea,
    Buttons,
    DatePickers
} from './style'

class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this);

    }

    state = {
        title: "",
        cost: "",
        destination: "",
        image: "",
        image2: "",
        imgShow: "",
        imgShow2: "",
        start_date: "",
        end_date: "",
        description: ""
    }

    inputHandler = e => {
        let { name, value } = e.target

        if (name === "image" || name === "image2") {
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
                        if (name === "image") {
                            this.setState({ imgShow: uri.base64Img })
                        } else {
                            this.setState({ imgShow2: uri.base64Img })
                        }

                        this.setState({ [name]: value })
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
        const { title, cost, destination, image, image2, start_date, end_date, description } = this.state
        const img = [image, image2]

        let dataToSubmit = {
            title: title,
            cost: cost,
            destination: destination,
            image: img,
            description: description,
            start_date: start_date,
            end_date: end_date
        }
        console.log(dataToSubmit)
        const formData = serialize(dataToSubmit);

        dataToSubmit = {
            form: formData,
            token: this.props.token
        }

        const sendForm = await this.props.addProduct(dataToSubmit)
        console.log(sendForm)
    }

    dateHandler = (value, dateString) => {
        this.setState({ start_date: value[0]._d, end_date: value[1]._d })
    }

    render() {
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        return (
            <Container>
                <Forms method="post" encType="multipart/form-data" onSubmit={this.submitForm} >
                    <Left>
                        <Inputs type="text" name="title" value={this.state.title} onChange={this.inputHandler} placeholder="title" />
                        <Inputs type="text" name="cost" value={this.state.cost} onChange={this.inputHandler} placeholder="cost" />
                        <Inputs type="text" name="destination" value={this.state.destination} onChange={this.inputHandler} placeholder="destination" />
                        <TextArea name="description" placeholder="Description..." onChange={this.inputHandler} />
                    </Left>
                    <Right>
                        <Inputs type="file" name="image" onChange={this.inputHandler} accept=".png, .jpg, .jpeg" />
                        <img src={this.state.imgShow} />
                        <Inputs type="file" name="image2" onChange={this.inputHandler} accept=".png, .jpg, .jpeg" />
                        <img src={this.state.imgShow2} />
                        <DatePickers onChange={this.dateHandler} />
                        <Buttons type="primary" onClick={this.submitForm}>Create Product</Buttons>
                    </Right>
                </Forms>
            </Container>
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
)(AddProduct);