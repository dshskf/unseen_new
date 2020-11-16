import React from 'react'
import {
    Container,
    Index
} from './style'

const Pagination = props => {
    let { page, current, actions } = props
    return (
        <Container>
            <Index onClick={() => actions(current - 1)}>&lt;</Index>
            {
                page && page.map(data => {
                    return (
                        <Index isActive={data.isActive} onClick={() => actions(data.index)}>{data.index}</Index>
                    )
                })
            }
            <Index onClick={() => actions(current + 1)}>&gt;</Index>
        </Container>
    )
}

export default Pagination

