import React from 'react'
import {
    RequestDimmer,
    RequestBox,
    RequestPanel,
} from './style'

const Modal = props => {
    let boolPanelBackground = false
    const { component, handler, background, open } = props
    boolPanelBackground = background

    return open && (
        <RequestDimmer>
            <RequestBox>
                <RequestPanel is_colored={boolPanelBackground} onClick={handler} >
                    <p>X</p>
                </RequestPanel>
                {
                    component()
                }                
            </RequestBox>
        </RequestDimmer >
    )
}

export default Modal

