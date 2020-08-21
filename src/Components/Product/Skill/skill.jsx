import React from 'react'
import {
    Container,
    Left,
    Right,
    Rows,
    Cols,
    Parameter
} from './styles'

const SkillComponent = props => { 
    return (
        <Container>
            <Left>
                <Rows align="middle" gutter="xs">
                    <Cols span={14}>
                        <h1>Job:</h1>
                    </Cols>
                    <Cols span={8}>
                        <p>CEO</p>
                    </Cols>
                </Rows>
                <Rows align="middle" gutter="xs" >
                    <Cols span={14}>
                        <h1>Status:</h1>
                    </Cols>
                    <Cols span={8}>
                        <p>Single</p>
                    </Cols>
                </Rows>
                <Rows align="middle" gutter="xs" >
                    <Cols span={14}>
                        <h1>Citizen:</h1>
                    </Cols>
                    <Cols span={8}>
                        <p>USA</p>
                    </Cols>
                </Rows>
            </Left>

            <Right>
                <Rows align="middle" gutter="xs">
                    <Cols span={8}>
                        <h1>Knowledge</h1>
                    </Cols>
                    <Cols span={14}>
                        <Parameter percent={90} status="active" strokeWidth={14} strokeColor={{
                            '0%': 'red',
                            '70%': 'rgba(254,116,0,0.99)',
                        }} />
                    </Cols>
                </Rows>
                <Rows align="middle" gutter="xs">
                    <Cols span={8}>
                        <h1>Humor</h1>
                    </Cols>
                    <Cols span={14}>
                        <Parameter percent={70} status="active" strokeWidth={14} strokeColor={{
                            '0%': 'red',
                            '70%': 'rgba(254,116,0,0.99)',
                        }}/>
                    </Cols>
                </Rows>
                <Rows align="middle" gutter="xs">
                    <Cols span={8}>
                        <h1>Adventure</h1>
                    </Cols>
                    <Cols span={14}>
                        <Parameter percent={75} status="active" strokeWidth={14} strokeColor={{
                            '0%': 'red',
                            '70%': 'rgba(254,116,0,0.99)',
                        }}/>
                    </Cols>
                </Rows>
                <Rows align="middle" gutter="xs">
                    <Cols span={8}>
                        <h1>Skill</h1>
                    </Cols>
                    <Cols span={14}>
                        <Parameter percent={95} status="active" strokeWidth={14} strokeColor={{
                            '0%': 'red',
                            '70%': 'rgba(254,116,0,0.99)',
                        }}/>
                    </Cols>
                </Rows>
            </Right>
        </Container>
    )
}

export default SkillComponent