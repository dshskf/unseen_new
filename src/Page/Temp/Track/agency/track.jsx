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

import { storage } from '../../../../Constants/request'
import { BiTargetLock } from 'react-icons/bi'

import {
    Container,
    MapBox,
    FocusBox
} from './style'

class TrackAgency extends Component {
    state = {
        zoom: null,
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
            booking_id: this.props.match.params.id,
        })

        // Split user and opposite
        const user_data = fetch.data.filter(data => {
            if (data.type === storage.type[0].toUpperCase()) {
                data.lat = data.lat ? data.lat : -6.200000
                data.lng = data.lng ? data.lng : 106.816666
                return data
            }
        })[0]
        const opposite_data = fetch.data.filter(data => {
            if (data.type !== storage.type[0].toUpperCase()) {
                data.lat = data.lat ? data.lat : -6.200000
                data.lng = data.lng ? data.lng : 106.816666
                return data
            }
        })[0]
        const coords = {
            lat: user_data.lat,
            lng: user_data.lng
        }

        this.setState({
            user: user_data,
            opposite: opposite_data,
            center: coords,
            zoom: 15,
        })

        this.refreshLocation() // start listener

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

    async componentWillUnmount() {
        await this.props.update_user_location({ lat: this.state.user.lat, lng: this.state.user.lng })
    }

    getPosition = () => {
        navigator.geolocation.getCurrentPosition(this.currentPosition, this.errPosition, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 6000
        })
    }

    currentPosition = async position => {
        let new_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        let user = this.state.user

        if (user.lat.toString() !== new_location.lat.toString() || user.lng.toString() !== new_location.lng.toString()) {
            this.props.socket.emit('update_location', { ...new_location, opposite_id: `${this.state.opposite.id}-${this.state.opposite.type}` })
            user.lat = new_location.lat
            user.lng = new_location.lng

            const post = await this.props.update_user_location({ ...new_location })

            this.setState({
                user: user
            })
        }
    }

    errPosition = err => {
        console.log(err)
    }

    handleFocusLocation = () => {
        const center_position = this.calculateCenteredViewPosition()
        let zoom_level = this.calculateZoomLevel()
        zoom_level = this.state.zoom === zoom_level + 0.001 ? zoom_level - 0.001 : zoom_level + 0.001

        this.setState({
            center: center_position,
            zoom: zoom_level,
        })
    }

    calculateZoomLevel = () => {
        let user = this.state.user
        let opposite = this.state.opposite

        // Get distance length between user and opposite                
        const distance_lat = user.lat - opposite.lat
        const distance_lng = Math.abs(user.lng) - Math.abs(opposite.lng)
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

    calculateCenteredViewPosition = () => {
        let user = this.state.user
        let opposite = this.state.opposite

        const distance_lat = user.lat - opposite.lat
        const distance_lng = Math.abs(user.lng) - Math.abs(opposite.lng)

        // Calculate maps centered
        const center_lat = ((distance_lat / 2) - user.lat) * -1
        const center_lng = user.lng - (distance_lng / 2)

        return { lat: center_lat, lng: center_lng }
    }


    mapComponent() {
        return (
            <Map
                google={this.props.google}
                zoom={this.state.zoom}
                initialCenter={this.state.center}
                center={this.state.center}
                style={{ width: "100%", height: "100%" }}
                onClick={() => console.log(this.state)}
            >
                <Marker
                    name={"You"}
                    title={"You"}
                    icon={{
                        url: "https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png",
                        anchor: new window.google.maps.Point(32, 32),
                        scaledSize: new window.google.maps.Size(20, 20)
                    }}
                    position={{ lat: this.state.user.lat, lng: this.state.user.lng }}
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
                            {this.state.center ? this.mapComponent() : null}
                        </MapBox>

                        <FocusBox onClick={this.handleFocusLocation}>
                            <BiTargetLock color="white" size="20" />
                            <p>Focus</p>
                        </FocusBox>
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
)(TrackAgency);