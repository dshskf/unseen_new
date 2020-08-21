import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { serialize } from 'object-to-formdata';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import Resizer from '../../../../script/react-file-image-resizer'
import { getImg } from '../../../../Constants/get-img'
import { get_product_dashboard_detail, edit_product, delete_product } from '../../../../Redux/product/product-action'

import { pullDashboardProductId } from '../../../../Redux/product/product-selector'
import { pullToken } from '../../../../Redux/auth/auth-selector'

import { MdKeyboardBackspace } from 'react-icons/md'

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
} from './style'

class Edit extends Component {
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
            console.log(request.product)

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
        if (sendForm) {
            this.props.nav()
        }
    }

    deleteHandler = async () => {
        const dataToSubmit = {
            id: this.state.id,
            token: this.props.token
        }

        const req = await this.props.deleteProduct(dataToSubmit)
        if (!req.err) {
            this.props.nav()
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


    render() {
        return (
            <React.Fragment>

                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1>UNSEEN</h1>
                </Header>
                <Container>
                    <MdKeyboardBackspace style={{ position: 'absolute', top: '-2rem', left: '5%', fontSize: '1.5rem', cursor: 'pointer' }} onClick={this.props.nav} />
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
                                    this.state.imgShow ?
                                        this.state.imgShow.map((data, index) => {
                                            return (
                                                <Sub id={index} onClick={this.call_file_input}>
                                                    <img src={this.state.imgShow[index]} />
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
    productId: pullDashboardProductId
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: data => dispatch(get_product_dashboard_detail(data)),
    editProduct: data => dispatch(edit_product(data)),
    deleteProduct: data => dispatch(delete_product(data)),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Edit);