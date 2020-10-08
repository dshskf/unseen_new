import { createSelector } from 'reselect'

const featuresState = state => state.features

export const pullSocket = createSelector(
    [featuresState],
    features => features.io
)