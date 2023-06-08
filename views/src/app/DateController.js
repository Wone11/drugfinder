import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'


export default function DateController(props) {

    const { name, label, value, onChange } = props;

    const convertTodefEventPara=(name,value)=>({
        target:{
            name,value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant='inline' inputVariant='outlined'
                label={label} format='DD/MMM/YYYY' name={name}
                value={value} onChange={date=>onChange(convertTodefEventPara(name,date))} />
        </MuiPickersUtilsProvider>
    )
}
