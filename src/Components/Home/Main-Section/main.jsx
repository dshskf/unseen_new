import React from 'react';
import { Container, Sub, SearchBox, Links } from './styles'

const MainComponent = props => {
    return (
        <Container>
            <Sub>
                <h1>FIND YOUR DESTINATION</h1>
                <h3>Explore new place thats you never see before</h3>
                <SearchBox>
                    <input type="text" placeholder="Enter something..." />                    
                    <Links>Search</Links>
                </SearchBox>
            </Sub>
        </Container>
    )
}

export default MainComponent