import { FormControl, InputLabel, MenuItem, Select as MiuSelect,FormHelperText } from '@material-ui/core';
import React from 'react'

export default function BranchSelection(props) {
    const {name,label,value,error=null, onChange,options} = props;
    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MiuSelect
             label     = {label}
             name      = {name}
             value     = {value}
             onChange  = {onChange}>
                 <MenuItem value ="">Select your Choice</MenuItem>
                 {
                     options.map(
                         item =>(<MenuItem key={item.BranchID} value ={item.BranchName}>{item.BranchName}</MenuItem>)
                     )
                 }
             </MiuSelect>
             {error &&<FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
