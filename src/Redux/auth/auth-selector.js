import { createSelector } from 'reselect'

const authState = state => state.auth

export const pullResponse = createSelector(
    [authState],
    auth => auth.response
)

export const pullToken = createSelector(
    [authState],
    auth => auth.token
)

export const pullLoginStatus = createSelector(
    [authState],
    auth => auth.isLogin
)

export const pullUserData = createSelector(
    [authState],
    auth => auth.user_data
)

export const pullSocket = createSelector(
    [authState],
    auth => auth.io
)