import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import restaurantsReducer from './restaurants/reducers'
import { loadRestaurants } from './restaurants/actions'

describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    describe('when loading succeeds', () => {
      const records = [
        { id: 1, name: 'Sushi Place' },
        { id: 2, name: 'Pizza Place' },
      ]

      let store

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        }

        const initialState = {
          records: []
        }

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(
            thunk.withExtraArgument(api)
          ),
        )

        return store.dispatch(loadRestaurants())
      })

      it('should fill the restaurants store state from api', () => {
        expect(store.getState().records).toEqual(records)
      })

      it('should clear the loading flag', () => {
        expect(store.getState().loading).toEqual(false)
      })
    })

    describe('when loading fails', () => {
      let store

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.reject(),
        }

        const initialState = {}

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(
            thunk.withExtraArgument(api),
          ),
        )

        return store.dispatch(loadRestaurants())
      })

      it('should set an error flag', () => {
        expect(store.getState().loadError).toEqual(true)
      })

      it('should clear the loading flag', () => {
        expect(store.getState().loading).toEqual(false)
      })
    })

    describe('while loading', () => {
      let store

      beforeEach(() => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        }

        const initialState = { loadError: true }

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(
            thunk.withExtraArgument(api),
          ),
        )

        store.dispatch(loadRestaurants())
      })

      it('should set a loading flag', () => {
        expect(store.getState().loading).toEqual(true)
      })

      it('should clear the error flag', () => {
        expect(store.getState().loadError).toEqual(false)
      })
    })
  })

  describe('initially', () => {
    let store

    beforeEach(() => {
      const initialState = {}

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk),
      )
    })

    it('should not have the loading flag set', () => {
      expect(store.getState().loading).toEqual(false)
    })

    it('should not have the error flag set', () => {
      expect(store.getState().loadError).toEqual(false)
    })
  })
})
