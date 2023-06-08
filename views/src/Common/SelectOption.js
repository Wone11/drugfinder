import { FormControl, InputLabel, MenuItem, Select as MiuSelect, FormHelperText } from '@material-ui/core';
import React from 'react'

export default function SelectOption(props) {
    const { name, label, value, error = null, onChange, multiple = false, options, disabled } = props;
    return (
        <FormControl variant="outlined"
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MiuSelect
                multiple={multiple}
                label={label}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}>
                <MenuItem value="" disabled={value}>Select your Choice</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
                    )
                }
            </MiuSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
