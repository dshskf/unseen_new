import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import io from 'socket.io-client'
import './App.css'

import HomePage from './Page/Home/home'

import ResetAction from './Page/Account/Reset/reset-action'
import EditUserProfile from './Page/Temp/Profile/User/user'
import EditAgencyProfile from './Page/Temp/Profile/Agency/agency'

import TrackAgency from './Page/Temp/Track/agency/track'
import TrackUsers from './Page/Temp/Track/users/track'

import UserAuth from './Page/Temp/Account/user/user'
import GuidesAuth from './Page/Temp/Account/guides/guides'
import AgencyAuth from './Page/Temp/Account/agency/agency'

import Product from './Page/Temp/Product/product.route'
import Chats from './Page/Temp/chats/chat.route'

import AdsList from './Page/Temp/Ads/ads'
import AddTours from './Page/Temp/Ads/Add/add'
import EditTours from './Page/Temp/Ads/Edit/edit'

import UserBookingDashboard from './Page/Temp/Bookings/user/user'
import AgencyBookingDashboard from './Page/Temp/Bookings/agency/agency'

import AgencyToursDetail from './Page/Temp/Product/Agency/Detail/detail'
import GuidesToursDetail from './Page/Temp/Product/Guides/Detail/detail'

import Test from './Page/Account/test'

import { check_token } from './Redux/auth/auth.action'
import { set_io_connection } from './Redux/features/features.action'
import { pullResponse, pullLoginStatus, pullUserData } from './Redux/auth/auth.selector'
import { API } from './Constants/link'
import { storage } from './Constants/request'


class App extends React.Component {

  state = {
    storage: localStorage.getItem('login_data') && JSON.parse(localStorage.getItem('login_data')),
    isCheck: true
  }

  async componentDidMount() {
    if (this.state.storage) {
      await this.props.checkToken(this.state.storage)
    }

    if (this.props.user && storage) {
      let socket = io(API)
      socket.emit('join_room', {
        room_id: `${this.props.user.id}-${storage.type[0].toUpperCase()}`
      })

      await this.props.setIOConnection(socket)
    }

    this.setState({ isCheck: false })

  }

  render() {
    return (
      <Router>
        <div className="App">
          {
            this.state.isCheck ?
              null
              :
              <Switch>

                <Route path="/reset/:token" component={ResetAction} />

                <Route path="/user/auth" component={UserAuth} />
                <Route path="/guides/auth" component={GuidesAuth} />
                <Route path="/agency/auth" component={AgencyAuth} />

                <Route path="/home" component={Product} />
                <Route path="/chats" component={Chats} />


                <Route path="/ads/add" component={AddTours} />
                <Route path="/ads/:adsId" component={EditTours} />
                <Route path="/ads" component={AdsList} />

                <Route path="/agency/dashboard" component={AgencyBookingDashboard} />
                <Route path="/user/dashboard" component={UserBookingDashboard} />
                <Route path="/user/edit" component={EditUserProfile} />
                <Route path="/agency/edit" component={EditAgencyProfile} />

                <Route path="/tours/agency/:toursId" component={AgencyToursDetail} />
                <Route path="/tours/guides/:toursId" component={GuidesToursDetail} />
                {/* <Route path="/profile/guides/:toursId" component={AgencyToursDetail} /> */}

                <Route path="/tracks/users/:id" component={TrackUsers} />
                <Route path="/tracks/agency/:id" component={TrackAgency} />
                <Route path="/test" component={Test} />
                <Route path="/" component={HomePage} />
              </Switch>
          }

        </div>
      </Router >
    );
  }
}


const mapStateToProps = createStructuredSelector({
  response: pullResponse,
  isLogin: pullLoginStatus,
  user: pullUserData
})


const mapDispatchToProps = (dispatch) => ({
  checkToken: (data) => dispatch(check_token(data)),
  setIOConnection: (data) => dispatch(set_io_connection(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
