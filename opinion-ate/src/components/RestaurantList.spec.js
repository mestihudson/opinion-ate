import { render, screen } from '@testing-library/react'

import { RestaurantList } from './RestaurantList'

describe('<RestaurantList />', () => {
  const restaurants = [
    { id: 1, name: 'Sushi Place' },
    { id: 2, name: 'Pizza Place' },
  ]

  let loadRestaurants

  function renderComponent() {
    loadRestaurants = jest.fn().mockName('loadRestaurants')

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />
    )
  }

  it('should load restaurants on first render', () => {
    renderComponent()

    expect(loadRestaurants).toHaveBeenCalled()
  })

  it('should display the restaurants', () => {
    renderComponent()

    expect(screen.getByText('Sushi Place')).toBeInTheDocument()
    expect(screen.getByText('Pizza Place')).toBeInTheDocument()
  })
})
