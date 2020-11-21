import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './App.css'

import HomePage from './Page/Home/home'
import ResetAction from './Page/Account/reset/reset-action'

import TrackAgency from './Page/Track/agency/track'
import TrackUsers from './Page/Track/users/track'

import { default as UserAuth } from './Page/Account/user/user'
import { default as GuidesAuth } from './Page/Account/guides/guides'
import { default as AgencyAuth } from './Page/Account/agency/agency'

import { default as BookingsPage } from './Page/Bookings/index'
import { default as EditProfilePage } from './Page/Profile/index'
import { default as Chats } from './Page/Chats/index'

import { default as ToursGuides } from './Page/Tours/guides/guide'
import { default as ToursAgency } from './Page/Tours/agency/agency'

import { default as ToursManagement } from './Page/Tours-Management/index'
import { default as TrackPage } from './Page/Track/index'

import AgencyToursDetail from './Page/Tours/agency/Detail/detail'
import GuidesToursDetail from './Page/Tours/guides/Detail/detail'

import { check_token } from './Redux/auth/auth.action'

import { pullResponse, pullLoginStatus, pullUserData } from './Redux/auth/auth.selector'



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

                <Route path="/bookings" component={BookingsPage} />
                <Route path="/profile/edit" component={EditProfilePage} />

                <Route path="/agency/:toursId" component={AgencyToursDetail} />
                <Route path="/guides/:toursId" component={GuidesToursDetail} />

                <Route path="/guides" component={ToursGuides} />
                <Route path="/agency" component={ToursAgency} />
                <Route path="/chats" component={Chats} />

                <Route path="/ads/:method/:adsId" component={ToursManagement} />
                <Route path="/tracks/:id" component={TrackPage} />

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
