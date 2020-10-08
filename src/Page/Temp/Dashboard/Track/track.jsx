import React, { Component } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

import Sidebar from '../../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../../Constants/get-img'

import { get_user_location, update_user_location } from '../../../../Redux/features/features.action'
import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'
import { pullSocket } from '../../../../Redux/features/features.selector'

import {
    Container,
    MapBox
} from './style'

class Track extends Component {
    state = {
        zoom: null,
        lat: null,
        lng: null,
        center: null,
        change: false,
        user: null,
        opposite: null
    }

    refreshLocation = () => setInterval(() => {
        this.getPosition()
    }, 3000);

    async componentDidMount() {
        const fetch = await this.props.get_user_location({
            id: this.props.match.params.orderId,
            token: this.props.token
        })

        // Split user and opposite
        const user_data = fetch.data.filter(data => data.id === this.props.user.id ? data : null)[0]
        const opposite_data = fetch.data.filter(data => data.id !== this.props.user.id ? data : null)[0]

        if (!this.state.change) {
            this.getPosition()
        }

        this.setState({ user: user_data, opposite: opposite_data })
        this.refreshLocation()

        this.props.socket.on('new_location', data => {
            this.setState({
                opposite: {
                    ...this.state.opposite,
                    lat: data.lat,
                    lng: data.lng
                }
            })
        })
    }

    getPosition = () => {
        navigator.geolocation.getCurrentPosition(this.currentPosition, this.errPosition, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 6000
        })
    }

    calculateZoomLevel = (location_now) => {

        // Get distance length between user and opposite        
        const distance_lat = location_now.latitude - this.state.opposite.lat
        const distance_lng = Math.abs(location_now.longitude) - Math.abs(this.state.opposite.lng)

        let calculatedDistance = Math.sqrt(Math.pow(distance_lng, 2) + Math.pow(distance_lat, 2))

        calculatedDistance = Math.round(
            calculatedDistance > 15 ? 1 :
                calculatedDistance > 10 ? 4 :
                    calculatedDistance > 1 ? 6 :
                        calculatedDistance > 0.2 ? 8 :
                            calculatedDistance > 0.01 ? 14 : 15
        )

        return calculatedDistance
    }

    calculateCenteredViewPosition = (coordinate = { lat: this.state.lat, lng: this.state.lng }) => {
        const distance_lat = coordinate.latitude - this.state.opposite.lat
        const distance_lng = Math.abs(coordinate.longitude) - Math.abs(this.state.opposite.lng)

        // Calculate maps centered
        const center_lat = ((distance_lat / 2) - coordinate.latitude) * -1
        const center_lng = coordinate.longitude - (distance_lng / 2)

        return { lat: center_lat, lng: center_lng }
    }

    currentPosition = async position => {
        let map_position = null
        let new_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }

        if (this.state.lat || this.state.change === false) {
            // Update user location
            if (this.state.change === false || this.state.lat.toString() !== position.coords.latitude.toString() || this.state.lng.toString() !== position.coords.longitude.toString()) {
                map_position = this.calculateZoomLevel(position.coords)

                const update = await this.props.update_user_location({
                    location: {
                        ...new_location,
                        userId: this.props.user.id
                    },
                    token: this.props.token
                })
                if (update.err) {
                    return
                }

                this.props.socket.emit('update_location', { ...new_location, opposite_id: this.state.opposite.id })
            }
        }

        if (this.state.opposite) {
            map_position = this.calculateZoomLevel(position.coords)
        }

        if (!this.state.change) {
            const center_position = this.calculateCenteredViewPosition(position.coords)
            this.setState({ center: { lat: center_position.lat, lng: center_position.lng } })
        }

        this.setState({
            ...new_location,
            zoom: map_position,
            change: true
        })
    }

    errPosition = err => {
        console.log(err)
    }

    changeCoordinate = () => {
        this.setState({ lat: this.state.lat + 0.0001 })
    }

    map() {
        return (
            <Map
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter={{ lat: this.state.center.lat, lng: this.state.center.lng }}
                style={{ width: "100%", height: "100%" }}
                onClick={() => console.log(this.state.zoom)}
            >
                <Marker
                    name={"You"}
                    title={"You"}
                    position={{ lat: this.state.lat, lng: this.state.lng }}
                />

                {
                    this.state.opposite ?
                        <Marker
                            name={"Other"}
                            title={"Other"}
                            position={{ lat: this.state.opposite.lat, lng: this.state.opposite.lng }}
                        />
                        :
                        null
                }
            </Map>
        )
    }

    render() {
        return (
            <Body>
                <Sidebar page="dashboard" />

                <Sub>
                    <Header>
                        <img src={getImg("Account", "logo.png")} />
                        <h1>UNSEEN</h1>
                    </Header>
                    <Container>
                        <MapBox>
                            {this.state.change ? this.map() : null}
                        </MapBox>
                        {/* <p onClick={this.calculateCenteredViewPosition}>Centered</p> */}
                    </Container>
                </Sub>
            </Body>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData,
    socket: pullSocket
})

const mapDispatchToProps = (dispatch) => ({
    get_user_location: (data) => dispatch(get_user_location(data)),
    update_user_location: (data) => dispatch(update_user_location(data))
})

export default compose(
    withRouter,
    GoogleApiWrapper({
        apiKey: 'AIzaSyC-V00eSeQTl8ug3_pCiOqMD08IsFZ_Xr8'
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(Track);