import React from 'react'
import { Container } from './style'

const Select = (props) => {
    return (
        <Container name={props.name} onChange={props.handler}>
            {
                props.option ? props.option.map((opt, i) => (
                    <option
                        key={i}
                        value={opt.val}
                    >
                        {opt.label}
                    </option>
                ))
                    :
                    <option selected={true} disabled={true}>No data found!</option>
            }
        </Container>
    )
}

export default Select