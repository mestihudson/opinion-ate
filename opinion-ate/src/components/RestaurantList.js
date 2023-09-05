import { useEffect } from 'react'

export default function RestaurantList({ loadRestaurants }) {
  useEffect(() => {
    loadRestaurants()
  }, [loadRestaurants])

  return (
    <div>
      <h1>RestaurantList</h1>
    </div>
  )
}
