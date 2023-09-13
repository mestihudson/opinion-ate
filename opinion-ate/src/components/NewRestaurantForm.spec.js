import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NewRestaurantForm } from './NewRestaurantForm'

describe('<NewRestaurantForm />', () => {
  const restaurantName = 'Sushi Place'
  let user
  let createRestaurant

  function renderComponent() {
    user = userEvent.setup()
    createRestaurant = jest.fn().mockName('createRestaurant')

    render(<NewRestaurantForm createRestaurant={createRestaurant} />)
  }

  describe('when filled in', () => {
    async function fillInForm() {
      renderComponent()
      await user.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      )
      await user.click(screen.getByText('Add'))
    }

    it('should call createRestaurant with the name', async () => {
      await fillInForm()
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName)
    })

    it('should clear the name', async () => {
      await fillInForm()
      expect(screen.getByPlaceholderText('Add Restaurant')).toHaveValue('')
    })
  })
})