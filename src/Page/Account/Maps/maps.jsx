import React, { useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'


const Maps = props => {
    const [coordinate, setCoordinate] = useState({ lat: null, long: null })
    const [change, setChange] = useState(false)

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(currentPosition, errPosition, {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0
        // })
    }, [])

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(currentPosition, errPosition, {
            enableHighAccuracy: true,

            timeout: 5000,
            maximumAge: 60000
        })
    }

    const errPosition = err => {
        console.log(err)
    }

    const currentPosition = position => {
        console.log(position.coords)
        console.log(coordinate)
        setCoordinate({
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
        setChange(!change)
    }

    const m = <Map
        google={props.google}
        zoom={6}
        initialCenter={{ lat: coordinate.lat, lng: coordinate.long }}
        style={{ width: "80vw", height: "30rem" }}
    />

    const locChange = e => {
        console.log(e)
    }


    return (
        <React.Fragment>
            {change ? m : null}
            {change ? null : m}
            <div style={{ position: "fixed", bottom: 300, zIndex: 5 }}>
                <input type="submit" value="refresh" style={{ marginLeft: '85vw' }} onClick={getPosition} />
            </div>


        </React.Fragment>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC-V00eSeQTl8ug3_pCiOqMD08IsFZ_Xr8'
})(Maps)