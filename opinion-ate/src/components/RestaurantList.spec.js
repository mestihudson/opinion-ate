import { render, screen } from '@testing-library/react'

import RestaurantList from './RestaurantList'

describe('<RestaurantList />', () => {
  it('should load restaurants on first render', () => {
    const loadRestaurants = jest.fn().mockName('loadRestaurants')
    const restaurants = []

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />
    )

    expect(loadRestaurants).toHaveBeenCalled()
  })

  it('should display the restaurants', () => {
    const noop = () => {}
    const restaurants = [
      { id: 1, name: 'Sushi Place' },
      { id: 2, name: 'Pizza Place' },
    ]

    render(<RestaurantList loadRestaurants={noop} restaurants={restaurants}/>)

    expect(screen.getByText('Sushi Place')).toBeInTheDocument()
    expect(screen.getByText('Pizza Place')).toBeInTheDocument()
  })
})
