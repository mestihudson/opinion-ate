import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { connect } from 'react-redux'

import { createRestaurant } from '../store/restaurants/actions'

export function NewRestaurantForm({ createRestaurant }) {
  const [name, setName] = useState('')
  const [validationError, setValidationError] = useState(false)
  const [serverError, setServerError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (name) {
      setValidationError(false)
      try {
        await createRestaurant(name)
      } catch {
        setServerError(true)
      }
    } else {
      setValidationError(true)
    }
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      { serverError && (
          <Alert
            severity="error"
          >The restaurant could not be saved. Please try again.</Alert>
      )}
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
