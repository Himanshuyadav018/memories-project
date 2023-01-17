import React from 'react'
import {Grid, TextField, InputAdornment, IconButton} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const InputField = ({name, label, handleChange, autoFocus, type, handleShowPassword, half}) => {
  return (
    <Grid item sx={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            variant='outlined'
            autoFocus={autoFocus}
            required
            fullWidth
            type={type}
            InputProps = {name === 'password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />} 
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
        />
    </Grid>
  )
}

export default InputField
