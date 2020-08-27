import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import io from 'socket.io-client'
import './App.css'

import HomePage from './Page/Home/home'

// import ResetAction from './Page/Account/Reset/reset-action'
import EditUserProfile from './Page/Temp/Profile/User/user'
import Track from './Page/Temp/Dashboard/Track/track'

import Maps from './Page/Account/Maps/maps'

import Account from './Page/Temp/Account/account'
import Product from './Page/Temp/Product/product.route'
import Chats from './Page/Temp/chats/chat.route'
import AdsList from './Page/Temp/Ads/ads'

import AdminDashboard from './Page/Temp/Dashboard/admin/admin'
import UserDashboard from './Page/Temp/Dashboard/user/user'
import ProductDetails from './Page/Temp/Product/Detail/detail'

import { check_token, set_io_connection } from './Redux/auth/auth-action'
import { pullResponse, pullLoginStatus, pullUserData } from './Redux/auth/auth-selector'
import { API } from './Constants/link'


class App extends React.Component {

  state = {
    token: localStorage.getItem('login_data') ?
      JSON.parse(localStorage.getItem('login_data')) ?
        JSON.parse(localStorage.getItem('login_data')).token
        :
        null
      : null,
    isCheck: true
  }

  async componentDidMount() {
    if (this.state.token) {
      await this.props.checkToken(this.state.token)
    }

    if (this.props.user) {

      let socket = io(API)
      socket.emit('join_room', {
        room_id: this.props.user.id
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

                {/* <Route path="/reset/:token" component={ResetAction} /> */}

                <Route path="/map" component={Maps} />

                <Route path="/account" component={Account} />
                <Route path="/home" component={Product} />
                <Route path="/chats" component={Chats} />
                <Route path="/ads" component={AdsList} />

                <Route path="/admin/dashboard" component={AdminDashboard} />
                <Route path="/user/dashboard" component={UserDashboard} />
                <Route path="/user/edit" component={EditUserProfile} />

                <Route path="/product/detail" component={ProductDetails} />
                <Route path="/tracks/:orderId" component={Track} />
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
