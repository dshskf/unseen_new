import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

import Sidebar from '../../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../../Constants/get-img'

import { get_track_user_data } from '../../../../Redux/auth/auth-action'
import { pullToken, pullUserData, pullSocket } from '../../../../Redux/auth/auth-selector'

import {
    Container,
    MapBox
} from './style'

const Track = props => {
    const [coordinate, setCoordinate] = useState({ lat: null, lng: null })
    const [change, setChange] = useState(false)
    const [user, setUser] = useState({
        user: null,
        opposite: null
    })

    useEffect(() => {
        const fetchAnotherUser = async () => {
            const fetch = await props.getAnotherUser({
                id: props.match.params.orderId,
                token: props.token
            })
            setUser({ user: fetch.data[1], opposite: fetch.data[0] })
        }

        if (!change) {
            fetchAnotherUser()            
            getPosition()
        }
        const refreshLocation = setInterval(() => {
            console.log("Fetch")
            getPosition()
        }, 10000);
        return () => {
            clearInterval(refreshLocation);
        };
    }, [])

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(currentPosition, errPosition, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 6000
        })
    }

    const errPosition = err => {
        console.log(err)
    }

    const currentPosition = position => {
        setCoordinate({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        setChange(true)
    }

    const map = <Map
        google={props.google}
        zoom={15}
        initialCenter={{ lat: coordinate.lat, lng: coordinate.lng }}
        center={{ lat: coordinate.lat, lng: coordinate.lng }}
        style={{ width: "100%", height: "100%" }}
    >
        <Marker
            name={"You"}
            title={"You"}
            position={{ lat: coordinate.lat, lng: coordinate.lng }}
        />

        <Marker
            name={"Other"}
            title={"Other"}
            position={{ lat: -6.117664, lng: 106.906349 }}
        />
    </Map>

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
                        {change ? map : null}
                    </MapBox>
                </Container>
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData,
    socket: pullSocket
})

const mapDispatchToProps = (dispatch) => ({
    getAnotherUser: (data) => dispatch(get_track_user_data(data))
})

export default compose(
    withRouter,
    GoogleApiWrapper({
        apiKey: 'AIzaSyC-V00eSeQTl8ug3_pCiOqMD08IsFZ_Xr8'
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(Track);