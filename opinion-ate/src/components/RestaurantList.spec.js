import { render, screen } from '@testing-library/react'

import { RestaurantList } from './RestaurantList'

describe('<RestaurantList />', () => {
  const restaurants = [
    { id: 1, name: 'Sushi Place' },
    { id: 2, name: 'Pizza Place' },
  ]

  let loadRestaurants

  function renderComponent(propsOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      restaurants,
      loading: false,
      ...propsOverrides,
    }
    loadRestaurants = props.loadRestaurants

    render(<RestaurantList { ...props } />)
  }

  it('should load restaurants on first render', () => {
    renderComponent()

    expect(loadRestaurants).toHaveBeenCalled()
  })

  it('should display the loading indicator while loading', () => {
    renderComponent({ loading: true })

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  describe('when loading succeeds', () => {
    it('should display the restaurants', () => {
      renderComponent()

      expect(screen.getByText('Sushi Place')).toBeInTheDocument()
      expect(screen.getByText('Pizza Place')).toBeInTheDocument()
    })

    it('should not display the loading indicator while not loading', () => {
      renderComponent()

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })
})
