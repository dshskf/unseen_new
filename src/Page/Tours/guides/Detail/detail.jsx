import React, { useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import Sidebar from "../../../../Components/Sidebar/sidebar";

import {
    get_tours_guides_detail,
    post_user_request,
} from "../../../../Redux/tours/tours.action";
import { chats_send_message } from "../../../../Redux/features/features.action";

import {
    pullToken,
    pullUserData,
} from "../../../../Redux/auth/auth.selector";
import { getImg } from "../../../../Constants/get-img";

import { FiGitPullRequest } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

import { Body, Sub, Header } from "../../../style.route";

import {
    Container,
    Headers,
    Background,
    Logo,
    Profile,
    AvatarBox,
    Avatar,
    NameBox,
    ActionBox,
    ActionButton,
    Details,
    Description,
    Splitter,
    Information,
    InformationItem,
    Photo,
    PhotoAction,
    PhotoBox,
    PhotoCard,
    ReviewBox,
    SkillBox,
    Skill,
    CommentsBox,
    Comments,
    C_Header,
    Message,
} from "./style";

const GuidesToursDetail = (props) => {
    const InfoData = [
        {
            label: 'Type',
            value: 'Europe'
        },
        {
            label: 'Gender',
            value: 'Male'
        },
        {
            label: 'Phone',
            value: '0821-xxxx-xxxx'
        },
        {
            label: 'Age',
            value: '19'
        },
        {
            label: 'Email',
            value: 'elon@gmail.com'
        },
        {
            label: 'Status',
            value: 'On'
        },

    ]
    return (
        <Container>
            <Headers>
                <Background>
                    <img src="https://www.worldforestry.org/wp-content/uploads/2020/02/dan-otis-OYFHT4X5isg-unsplash-scaled.jpg" />
                    <Logo>Unseen</Logo>
                </Background>
                <Profile>
                    <AvatarBox>
                        <Avatar>
                            <img src="https://i.imgur.com/BHPUd0d.jpg" />
                            <NameBox>
                                <p>Elon Musk</p>
                                <p>UK, London</p>
                            </NameBox>
                        </Avatar>
                    </AvatarBox>
                    <ActionBox>
                        <ActionButton>
                            <button>Request</button>{" "}
                        </ActionButton>
                        <ActionButton>
                            <button>Chats</button>
                        </ActionButton>
                    </ActionBox>
                </Profile>
            </Headers>
            <Photo>
                <PhotoAction>&lt;</PhotoAction>
                <PhotoBox>
                    <PhotoCard>
                        <img src="https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg" />
                    </PhotoCard>
                </PhotoBox>
                <PhotoAction>&gt;</PhotoAction>
            </Photo>
            <Details>
                <Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum...
        </Description>
                <Splitter>
                    <div></div>
                </Splitter>
                <Information>
                    {
                        InfoData.map(info => (
                            <InformationItem>
                                <p>{info.label}</p>
                                <p>{info.value}</p>
                            </InformationItem>
                        ))
                    }
                </Information>
            </Details>
            <ReviewBox>
                <SkillBox>
                    <Skill></Skill>
                </SkillBox>                
                <CommentsBox>
                    <PhotoAction>&lt;</PhotoAction>
                    <Comments>
                        <C_Header>
                            <img src="https://cdn.vox-cdn.com/thumbor/4rDBWtnZ7FDBL4fHNL-sLTAV8_k=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/67108186/elon_musk_tesla_3036.0.jpg" />
                            <p>Elon musk</p>
                        </C_Header>
                        <Message>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam</Message>
                    </Comments>
                    <PhotoAction>&gt;</PhotoAction>
                </CommentsBox>

            </ReviewBox>
        </Container>
    );
};

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData,
});

const mapDispatchToProps = (dispatch) => ({
    get_tours_guides_detail: (data) => dispatch(get_tours_guides_detail(data)),
    chats_send_message: (data) => dispatch(chats_send_message(data)),
    post_user_request: (data) => dispatch(post_user_request(data)),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GuidesToursDetail);
