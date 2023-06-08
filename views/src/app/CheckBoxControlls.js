import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react'

export default function CheckBoxControlls(props) {
    const {name,label,value,onChange} = props;

    const convertToDefaultEventParameter = (name,value) =>({
        target:{
            name,value
        }
    })

    return (
          <FormControl>
              <FormControlLabel
              control={<Checkbox
              name={name}
              color='primary'
              label={label}
              checked={value}
              onChange={e=>onChange(convertToDefaultEventParameter(name,e.target.checked))}
              />}
              label={label}
              />
          </FormControl>

    )
}
