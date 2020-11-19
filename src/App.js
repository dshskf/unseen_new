import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
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

import Guides from './Page/Temp/Product/Guides/guide'
import Agency from './Page/Temp/Product/Agency/agency'
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

import { pullResponse, pullLoginStatus, pullUserData } from './Redux/auth/auth.selector'
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

                <Route path="/agency/dashboard" component={AgencyBookingDashboard} />
                <Route path="/user/dashboard" component={UserBookingDashboard} />
                <Route path="/user/edit" component={EditUserProfile} />
                <Route path="/agency/edit" component={EditAgencyProfile} />

                <Route path="/agency/:toursId" component={AgencyToursDetail} />
                <Route path="/guides/:toursId" component={GuidesToursDetail} />

                <Route path="/guides" component={Guides} />
                <Route path="/agency" component={Agency} />

                <Route path="/chats" component={Chats} />
                <Route path="/ads/add" component={AddTours} />
                <Route path="/ads/:adsId" component={EditTours} />
                <Route path="/ads" component={AdsList} />

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
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
