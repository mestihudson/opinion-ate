import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import restaurantsReducer from './restaurants/reducers'
import { createRestaurant, loadRestaurants } from './restaurants/actions'

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

  describe('createRestaurant action', () => {
    const newRestaurantName = 'Sushi Place'
    const existingRestaurant = { id: 1, name: 'Pizza Place' }
    const responseRestaurant = { id: 2, name: newRestaurantName }

    let api
    let store

    beforeEach(() => {
      api = {
        createRestaurant: jest.fn().mockName('createRestaurant')
      }

      const initialState = { records: [existingRestaurant] }

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(
          thunk.withExtraArgument(api),
        ),
      )
    })

    it('should save the restaurant to the server', () => {
      store.dispatch(createRestaurant(newRestaurantName))

      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName)
    })

    describe('when save succeeds', () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant)

        return store.dispatch(createRestaurant(newRestaurantName))
      })

      it('should store the returned restaurant in the store', () => {
        expect(store.getState().records).toEqual([
          existingRestaurant,
          responseRestaurant,
        ])
      })
    })

    describe('when save fails', () => {
      it('should reject', () => {
        api.createRestaurant.mockRejectedValue()
        const promise = store.dispatch(createRestaurant(newRestaurantName))
        return expect(promise).rejects.toBeUndefined()
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
