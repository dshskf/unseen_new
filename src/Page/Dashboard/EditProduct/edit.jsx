import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { serialize } from 'object-to-formdata';
import moment from 'moment';

import Resizer from '../../../script/react-file-image-resizer'
import { get_product_dashboard_detail, edit_product } from '../../../Redux/product/product-action'

import { pullDashboardProductId } from '../../../Redux/product/product-selector'
import { pullToken } from '../../../Redux/auth/auth-selector'

// import UploadImage from '../../Components/Upload/upload'
import {
    Container,
    Forms,
    Left,
    Right,
    Inputs,
    TextArea,
    Buttons,
    DatePickers
} from '../AddProduct/style'

class EditProduct extends Component {

    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this);
    }

    state = {
        id: "",
        title: "",
        cost: "",
        destination: "",
        image: "",
        imgShow: "", //To show
        image_db: "", //Original image from db
        new_image: ["", "", "", "", ""], //Store to db
        image_to_delete: [], //list of Deleted img
        start_date: null,
        end_date: null,
        description: "",
        isFetch: false
    }

    async componentDidMount() {
        if (!this.state.isFetch) {
            const reqData = {
                id: this.props.productId,
                token: this.props.token
            }

            const request = await this.props.getProduct(reqData)
            const link_api = 'http://localhost:1234/'

            if (request.product) {
                let { id, title, cost, destination, image, start_date, end_date, description } = request.product

                start_date = start_date.split('T')[0].replace(/-/g, '/')
                end_date = end_date.split('T')[0].replace(/-/g, '/')

                image = image.map(data => {
                    return link_api + data.replace('\\', '/')
                })

                this.setState({
                    id: id,
                    title: title,
                    cost: cost,
                    destination: destination,
                    imgShow: image,
                    image_db: image,
                    description: description,
                    start_date: start_date,
                    end_date: end_date,
                    isFetch: true
                })
            }

        }
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

    submitForm = async e => {
        e.preventDefault()

        let { id, title, cost, destination, image_to_delete, new_image, image_db, start_date, end_date, description } = this.state
        // const img = [image, image2]
        new_image = new_image.filter(data => data !== "")

        let dataToSubmit = {
            id: id,
            title: title,
            cost: cost,
            destination: destination,
            img_del: image_to_delete,
            img_path: image_db,
            image: new_image,
            description: description,
            start_date: start_date,
            end_date: end_date
        }
        const formData = serialize(dataToSubmit);

        dataToSubmit = {
            form: formData,
            token: this.props.token
        }

        const sendForm = await this.props.editProduct(dataToSubmit)
        console.log(sendForm)
    }

    dateHandler = (value, dateString) => {
        this.setState({ start_date: value[0]._d, end_date: value[1]._d })
    }

    render() {
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        const dateFormat = 'YYYY/MM/DD';

        return (
            <Container>
                <Forms method="post" encType="multipart/form-data" onSubmit={this.submitForm} >
                    <Left>
                        <Inputs type="text" name="title" value={this.state.title} onChange={this.inputHandler} placeholder="title" />
                        <Inputs type="text" name="cost" value={this.state.cost} onChange={this.inputHandler} placeholder="cost" />
                        <Inputs type="text" name="destination" value={this.state.destination} onChange={this.inputHandler} placeholder="destination" />
                        <TextArea name="description" value={this.state.description} placeholder="Description..." onChange={this.inputHandler} />
                    </Left>
                    <Right>
                        {
                            this.state.imgShow ?
                                this.state.imgShow.map((data, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Inputs type="file" name={"image-" + index} onChange={this.inputHandler} accept=".png, .jpg, .jpeg" />
                                            <img src={this.state.imgShow[index]} style={{ width: 100, height: 100 }} />
                                        </React.Fragment>
                                    )
                                })
                                :
                                null
                        }

                        {
                            this.state.start_date ?
                                <DatePickers
                                    defaultValue={[moment(this.state.start_date, dateFormat), moment(this.state.end_date, dateFormat)]}
                                    format={dateFormat}
                                    onChange={this.dateHandler} />
                                :
                                null
                        }

                        <Buttons type="primary" onClick={this.submitForm}>Create Product</Buttons>
                    </Right>
                </Forms>
            </Container>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    productId: pullDashboardProductId
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: data => dispatch(get_product_dashboard_detail(data)),
    editProduct: data => dispatch(edit_product(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditProduct);