import { createSelector } from 'reselect'

const productState = state => state.product

export const pullDashboardProduct = createSelector(
    [productState],
    product => product.product_dashboard
)

export const pullDashboardProductId = createSelector(
    [productState],
    product => product.fetch_id
)

export const pullProductId=createSelector(
    [productState],
    product => product.product_id
)