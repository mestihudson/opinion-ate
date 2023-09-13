import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { connect } from 'react-redux'

import { createRestaurant } from '../store/restaurants/actions'

export function NewRestaurantForm({ createRestaurant }) {
  const [name, setName] = useState('')
  const [validationError, setValidationError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name) {
      setValidationError(true)
    } else {
      setValidationError(false)
    }
    await createRestaurant(name)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      { validationError && <Alert severity="error">Name is required</Alert> }
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value) }
        placeholder="Add Restaurant"
        variant="filled"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">Add</Button>
    </form>
  )
}

const mapStateToProps = null
const mapDispatchToProps = { createRestaurant }

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm)
