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

    describe('while loading', () => {
      it('should set a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        }

        const initialState = {}

        const store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(
            thunk.withExtraArgument(api),
          ),
        )

        store.dispatch(loadRestaurants())

        expect(store.getState().loading).toEqual(true)
      })
    })
  })

  describe('initially', () => {
    it('should not have the loading flag set', () => {
      const initialState = {}

      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk),
      )

      expect(store.getState().loading).toEqual(false)
    })
  })
})
