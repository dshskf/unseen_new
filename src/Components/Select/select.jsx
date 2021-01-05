import React from 'react'
import { Container } from './style'

const Select = (props) => {
    return (
        <Container name={props.name} onChange={props.handler} disabled={props.option === null || props.option.length === 0}>
            {
                props.default && <option selected={true}>{props.default}</option>
            }

            {
                props.option ?
                    props.option.map((opt, i) => (
                        <option
                            key={i}
                            value={opt.val}
                        >
                            {opt.label}
                        </option>
                    ))
                    :
                    <option selected={true} disabled={true}></option>
            }
        </Container>
    )
}

export default Select