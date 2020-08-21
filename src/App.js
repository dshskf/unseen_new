import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import io from 'socket.io-client'
import { createBrowserHistory } from 'history'
import './App.css'

import HomePage from './Page/Home/home'

import Dashboard from './Page/Dashboard/dashboard'

import ResetAction from './Page/Account/Reset/reset-action'
import EditProfile from './Page/Account/Edit-profile/edit_profile'
import Products from './Page/Products/products'
import ProductDetail from './Page/Products/Detail/detail'
import RequestForm from './Page/Products/Request/request'
import Management from './Page/Account/Management/management'
import Maps from './Page/Account/Maps/maps'

import Account from './Page/Temp/Account/account'
import Product from './Page/Temp/Product/product.route'
import Chats from './Page/Temp/chats/chat.route'
import AdsList from './Page/Temp/Ads/ads'
import Edit from './Page/Temp/Ads/Edit/edit'
import AdminDashboard from './Page/Temp/Dashboard/admin/admin'
import UserDashboard from './Page/Temp/Dashboard/user/user'
import ProductDetails from './Page/Temp/Product/Detail/detail'

import { check_token, set_io_connection } from './Redux/auth/auth-action'
import { pullResponse, pullLoginStatus, pullUserData } from './Redux/auth/auth-selector'


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
      const API = "localhost:1234"

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
      <Router history={createBrowserHistory({ forceRefresh: true })}>
        <div className="App">
          {
            this.state.isCheck ?
              null
              :
              <Switch>

                <Route path="/reset/:token" component={ResetAction} />

                <Route path="/management" component={Management} />
                <Route path="/edit" component={() => <EditProfile isReady={this.state.isCheck} />} />

                <Route path="/dashboard/product" component={() => <Dashboard page="product" />} />
                <Route path="/dashboard/add" component={() => <Dashboard page="add" />} />
                <Route path="/dashboard/edit" component={() => <Dashboard page="edit" />} />
                <Route path="/dashboard/management" component={() => <Dashboard page="management" />} />

                <Route path="/products/request" component={RequestForm} />
                <Route path="/products/detail" component={ProductDetail} />
                <Route path="/products" component={Products} />

                <Route path="/map" component={Maps} />

                <Route path="/account" component={Account} />

                <Route path="/temp" component={Product} />
                <Route path="/chats" component={Chats} />
                <Route path="/ads" component={AdsList} />
                <Route path="/t-edit" component={Edit} />
                <Route path="/d-admin" component={AdminDashboard} />
                <Route path="/d-user" component={UserDashboard} />
                <Route path="/p-detail" component={ProductDetails} />
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
