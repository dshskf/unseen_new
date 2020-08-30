import React, { useState } from 'react'
import { Container, Sub, Overlay, Image } from './styles'
import { city_data } from './data'

const CityComponent = props => {
    const [hovers, setHovers] = useState([false, false, false, false, false, false, false, false])

    const hoverHandler = index => setHovers(hovers.map((data, i) => {
        return i === index ? !hovers[i] : hovers[i]
    }))


    return (
        <Container>
            {
                city_data.map((data, index) => {
                    return (
                        <Sub key={index} onMouseOver={() => hoverHandler(index)} onMouseLeave={() => hoverHandler(index)}>
                            <Overlay isHover={hovers[index]} />
                            <Image src={data.img} alt="" isHover={hovers[index]} />
                            <p>{data.name}</p>
                        </Sub>
                    )
                })
            }
        </Container>
    )
}

export default CityComponent