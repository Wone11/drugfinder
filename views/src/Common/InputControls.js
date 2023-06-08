import React from 'react'
import {TextField} from '@material-ui/core'

export default function InputControls(props){
    
    const {name,label,value,error=null,onChange,...other} = props;
    return (
        <div>
            <TextField
                variant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...other}
                {...(error && {error:true,helperText:error})}
            />
        </div>
    )
}
