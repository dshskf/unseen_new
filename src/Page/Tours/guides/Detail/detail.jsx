import React, { useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import Sidebar from "../../../../Components/Sidebar/sidebar";

import { get_tours_guides_detail, post_user_request, get_booking_list, post_agency_request } from "../../../../Redux/tours/tours.action";
import { chats_send_message, get_location_data } from "../../../../Redux/features/features.action";

import { defaultProfile, getImg, renameImg } from "../../../../Constants/get-img";

import { FaRegAddressBook, FaMapMarkerAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import { Body, Sub, Header } from "../../../style.route";

import {
    Container,
    Headers,
    Background,
    Logo,
    Profile,
    AvatarBox,
    Avatar,
    ProfileList,
    ProfileItem,
    ActionBox,
    ActionButton,
    Details,
    Description,
    Splitter,
    Information,
    InformationItem,
    Item,
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
    CommentAction,
    RequestBox,
    RequestDimmer,
    RequestPanel,
    RequestInput,
    RequestSubmit,
    Dropdown,

} from "./style";
import Select from "../../../../Components/Select/select";
import { storage } from "../../../../Constants/request";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useAlert } from "react-alert";

const GuidesToursDetail = (props) => {
    const [guidesData, setGuidesData] = useState(null)
    const [bookingList, setBookingList] = useState(null)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [openRequest, setOpenRequest] = useState(false)
    const [requestForm, setRequestForm] = useState({ offers: '', description: '' })
    const [requestDate, setRequestDate] = useState({ start: '', end: '' })
    const [location, setLocation] = useState({
        countries: null,
        countries_id: null,
        states_id: null,
        states: null,
        cities_id: null,
        cities_name: null,
        cities: null,
    })

    const alert = useAlert()

    useEffect(() => {
        req()
    }, [])

    const req = async () => {
        const post = await props.get_tours_guides_detail({
            id: props.match.params.toursId
        })
        let get_countries = await props.get_location_data({ action: "countries" })
        setLocation({ ...location, countries: get_countries.data })
        setGuidesData(post.guides)
    }

    const handleRequestModal = async () => {
        if (storage.type_code === 'U') {
            setRequestDate({ start: '', end: '' })
            setLocation({
                ...location,
                countries_id: null,
                states_id: null,
                states: null,
                cities_id: null,
                cities_name: null,
                cities: null,
            })
        } else if (storage.type_code === 'A' && !openRequest) {
            let bookingList = await props.get_booking_list()

            if (bookingList.err) {
                return alert.error(bookingList.err)
            }
            bookingList = bookingList.data.map(booking => {
                booking.val = booking.id
                booking.label = booking.tours_title + " | (" + booking.username + ")"
                return booking
            })

            setBookingList(bookingList)
        } else if (storage.type_code === 'G') {
            alert.info('Not available for guides!')
            return 0
        }

        setOpenRequest(!openRequest)
        setRequestForm({ offers: '', description: '' })
    }

    const handleRequestInput = (e) => {
        const { name, value } = e.target
        setRequestForm({ ...requestForm, [name]: value })
    }

    const handleChangeSelect = async (e) => {
        const { name, value } = e.target

        if (name === 'countries') {
            const getStateData = await props.get_location_data({ action: 'states', countries_id: value })
            setLocation({
                ...location,
                countries_id: value,
                states_id: null,
                cities_id: null,
                cities: null,
                states: getStateData.data
            })
        }
        else if (name === 'states') {
            const getCitiesData = await props.get_location_data({ action: 'cities', states_id: value })
            setLocation({
                ...location,
                states_id: value,
                cities_id: null,
                cities: getCitiesData.data
            })
        } else {
            const city_name = location.cities.filter(c => parseInt(c.val) === parseInt(value))[0]
            setLocation({
                ...location,
                cities_id: parseInt(value),
                cities_name: city_name.label
            })
        }
    }

    const handleChangeSelectBookings = (e) => {
        const { value } = e.target
        const selected = bookingList.filter(b => b.id.toString() === value)[0]
        setSelectedBooking(selected)
    }

    const handleDateInput = (value, dateString) => {
        setRequestDate({ start: value[0], end: value[1] })
    }


    const sendRequest = async () => {
        const dataToSubmit = {
            sender_id: storage.id,
            sender_type: storage.type_code,
            receiver_id: guidesData.id,
            country_id: location.countries_id,
            state_id: location.states_id,
            city_id: location.cities_id,
            start_date: requestDate.start,
            end_date: requestDate.end,
            offers_price: requestForm.offers,
            description: requestForm.description,
        }

        const post = await props.post_user_request({ ...dataToSubmit })
        if (!post.err) {
            await props.chats_send_message({
                receiver_id: guidesData.id,
                receiver_type: 'G',
                content: `Hello i'm ${storage.username}, ${requestForm.description}!
                `
            })
            alert.success("Request Success")
        } else {
            alert.error(post.err)
        }
        handleRequestModal()
    }

    const sendAgencyRequest = async () => {
        const post = await props.post_agency_request({
            booking_id: selectedBooking.id,
            sender_id: storage.id,
            sender_type: storage.type_code,
            receiver_id: guidesData.id,
            start_date: selectedBooking.start_date,
            end_date: selectedBooking.end_date,
            offers_price: requestForm.offers,
            description: requestForm.description,
        })

        if (!post.err) {
            await props.chats_send_message({
                receiver_id: guidesData.id,
                receiver_type: 'G',
                content: `Hello i'm agency from ${storage.username}, ${requestForm.description}!`,
                tours_id: guidesData.id,
                tours_type: 'A'
            })
            alert.success("Request Success")
            handleRequestModal()
        } else {
            alert.error(post.err)
            handleRequestModal()
        }
    }

    const InfoData = [
        { label: 'Type', value: 'Europe' },
        { label: 'Gender', value: 'Male' },
        { label: 'Phone', value: guidesData ? guidesData.phone : '-' },
        { label: 'Age', value: '19' },
        { label: 'Email', value: guidesData ? guidesData.email : '-' },
        { label: 'Status', value: 'On' },
    ]

    return (
        <Body>
            <Sidebar page="home" />
            {
                openRequest &&
                <RequestDimmer>
                    <RequestBox>
                        <RequestPanel>
                            <p onClick={handleRequestModal}>X</p>
                        </RequestPanel>

                        {
                            storage.type_code === 'U' ?
                                <React.Fragment>
                                    <RequestInput>
                                        <Item isSelect={true}>
                                            <p>Country</p>
                                            <Select
                                                name="countries"
                                                handler={handleChangeSelect}
                                                option={location.countries && location.countries}
                                                default="Select Country"
                                            />
                                        </Item>
                                        <Item isSelect={true}>
                                            <p>State</p>
                                            <Select
                                                name="states"
                                                handler={handleChangeSelect}
                                                option={location.states && location.states}
                                                default="Select State"
                                            />
                                        </Item>
                                        <Item isSelect={true}>
                                            <p>Cities</p>
                                            <Select
                                                name="cities"
                                                handler={handleChangeSelect}
                                                option={location.cities && location.cities}
                                                default="Select City"
                                            />
                                        </Item>
                                        <Item>
                                            <p>Start & End date</p>
                                            <DateRangePicker
                                                onChange={handleDateInput}
                                                value={[
                                                    requestDate.start,
                                                    requestDate.end
                                                ]}
                                                minDate={new Date(Date.now() + (1000 * 60 * 60 * 72))}
                                                clearIcon={null}
                                                dayPlaceholder={'dd'}
                                                monthPlaceholder={'mm'}
                                                yearPlaceholder={'yyyy'}
                                            />
                                        </Item>
                                    </RequestInput>
                                    <RequestInput>
                                        <label>Offers</label>
                                        <input
                                            type="text"
                                            name="offers"
                                            onChange={handleRequestInput}
                                            value={requestForm.offers}
                                        />
                                    </RequestInput>
                                    <RequestInput>
                                        <label>Description</label>
                                        <textarea
                                            placeholder="Type something here..."
                                            name="description"
                                            onChange={handleRequestInput}
                                            value={requestForm.description}
                                        ></textarea>
                                    </RequestInput>
                                </React.Fragment>
                                :
                                storage.type_code === 'A' &&
                                <React.Fragment>
                                    <RequestInput>
                                        <label>Tours</label>
                                        <Select
                                            name="selectedBookings"
                                            handler={handleChangeSelectBookings}
                                            option={bookingList}
                                            default="Select Bookings"
                                        />
                                    </RequestInput>
                                    <RequestInput>
                                        <label>Offers</label>
                                        <input
                                            type="text"
                                            name="offers"
                                            onChange={handleRequestInput}
                                            value={requestForm.offers}
                                        />
                                    </RequestInput>
                                    <RequestInput>
                                        <label>Description</label>
                                        <textarea
                                            placeholder="Type something here..."
                                            name="description"
                                            onChange={handleRequestInput}
                                            value={requestForm.description}
                                        ></textarea>
                                    </RequestInput>
                                </React.Fragment>
                        }

                        <RequestSubmit onClick={storage.type_code === 'A' ? sendAgencyRequest : sendRequest}>Send Request</RequestSubmit>
                    </RequestBox>
                </RequestDimmer>
            }

            <Sub>
                {
                    guidesData &&
                    <Container>
                        <Headers>
                            <Background>
                                <img src="https://www.hdwallpapers.in/download/autumn_forest-HD.jpg" />
                                <Logo>Unseen</Logo>
                            </Background>
                            <Profile>
                                <AvatarBox>
                                    <Avatar>
                                        <img src={renameImg(guidesData.image)} />
                                        <ProfileList>
                                            <ProfileItem>
                                                <p>{guidesData.username}</p>
                                            </ProfileItem>
                                            <ProfileItem>
                                                <FaMapMarkerAlt />
                                                <label>{guidesData.country}, {guidesData.city}</label>
                                            </ProfileItem>
                                        </ProfileList>
                                    </Avatar>
                                </AvatarBox>
                                <ActionBox>
                                    <ActionButton onClick={handleRequestModal}>
                                        <FaRegAddressBook size={20} />
                                        <p>Request</p>
                                    </ActionButton>
                                    <ActionButton>
                                        <BsChatDots size={20} />
                                        <p>Send Message</p>
                                    </ActionButton>
                                </ActionBox>
                            </Profile>
                        </Headers>
                        {/* <Photo>
                            <PhotoAction>
                                <AiOutlineDoubleLeft />
                            </PhotoAction>
                            <PhotoBox>
                                <PhotoCard>
                                    <img src="https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg" />
                                </PhotoCard>
                            </PhotoBox>
                            <PhotoAction>
                                <AiOutlineDoubleRight />
                            </PhotoAction>
                        </Photo> */}
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
                                    guidesData && InfoData.map(info => (
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
                                <Skill>P</Skill>
                                <Skill>Z</Skill>
                                <Skill>X</Skill>
                                <Skill>P</Skill>
                                <Skill>Z</Skill>
                                <Skill>X</Skill>
                                <Skill>P</Skill>
                                <Skill>Z</Skill>
                                <Skill>X</Skill>
                                <Skill>P</Skill>
                                <Skill>Z</Skill>
                                <Skill>X</Skill>
                                <Skill>P</Skill>
                                <Skill>Z</Skill>
                            </SkillBox>
                            <CommentsBox>
                                <CommentAction>
                                    <AiOutlineDoubleLeft />
                                </CommentAction>
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
                                <CommentAction>
                                    <AiOutlineDoubleRight />
                                </CommentAction>
                            </CommentsBox>
                        </ReviewBox>
                    </Container>
                }

            </Sub>
        </Body>
    );
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
    get_tours_guides_detail: (data) => dispatch(get_tours_guides_detail(data)),
    chats_send_message: (data) => dispatch(chats_send_message(data)),
    post_user_request: (data) => dispatch(post_user_request(data)),
    get_location_data: (data) => dispatch(get_location_data(data)),
    get_booking_list: (data) => dispatch(get_booking_list(data)),
    post_agency_request: (data) => dispatch(post_agency_request(data))
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GuidesToursDetail);
