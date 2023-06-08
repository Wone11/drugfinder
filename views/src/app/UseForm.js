import React, { useState }            from 'react'
import {makeStyles}                   from '@material-ui/core'


//Reusable Field Values Forming for Form
//---------------------------------------
export  function UseForm(intialFieldValues,validateOnChange=false,validate) {
    const [values,setValues] = useState(intialFieldValues);
    const [errors,setErrors] = useState({});

    //Handle Data Inputs
    const handleInputChange=(e)=>{
        const {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        });   
        if(validateOnChange)
        validate({[name]:value})     
    }
//Reset Form Cokntroll Function 
//------------------------------
const resetForm =() =>{
    setValues(intialFieldValues);
    setErrors({})
}
    return{
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange,
    }
}

//Styles 
const useStyles = makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1),
        }
    }
}));

//Form Components to Pass a Values!
//---------------------------------
export function Form(props) {
    const clasess  = useStyles();
     
    const {children,...others} = props; 
     
    return (
        <form className={clasess.root} autoCorrect='on' {...others} >
            {props.children}
        </form>
    )
}
