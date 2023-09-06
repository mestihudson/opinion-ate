export const STORE_RESTAURANTS = 'STORE_RESTAURANTS'

export const loadRestaurants = () => async (dispatch, getState, api) => {
  const records = await api.loadRestaurants()
  dispatch(storeRestuarants(records))
}

const storeRestuarants = (records) => ({
  type: STORE_RESTAURANTS,
  records,
})
