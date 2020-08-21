import React from 'react'
import Header from '../../Components/Header/header'
import InfoComponent from '../../Components/Product/Information/info'
import SkillComponent from '../../Components/Product/Skill/skill'
import ReviewComponent from '../../Components/Product/Review/review'

const ProductPage = props => {
    return (
        <React.Fragment>
            <Header />
            <InfoComponent />
            <SkillComponent />
            <ReviewComponent />
        </React.Fragment>

    )
}


export default ProductPage