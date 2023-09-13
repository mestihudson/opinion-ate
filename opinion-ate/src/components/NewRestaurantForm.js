import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export function NewRestaurantForm() {
  return (
    <form>
      <TextField placeholder="Add Restaurant" variant="filled" fullWidth />
      <Button variant="contained" color="primary">Add</Button>
    </form>
  )
}

export default NewRestaurantForm
