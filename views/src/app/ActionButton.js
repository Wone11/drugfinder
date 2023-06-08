import React from 'react'
import  { Button, FormGroup, makeStyles } from '@material-ui/core';

//Passing Styles from Make Style Material UIs'
const useStyles = makeStyles(theme=>({
    root:{
        width: '0',
        margin: theme.spacing(0.5)
    },
    secondary:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiButton-label':{
            color: theme.palette.secondary.main,
        }
    },
    primary:{
        backgroundColor:theme.palette.primary.light,
        '& .MuiButton-label':{
            color: theme.palette.primary.main,
        }
    }

}))

//Function Of Action Buttons.....
export default function ActionButton(props) {

    const {color,children,onClick,size} = props;
    const classes  = useStyles();

    return (
       <FormGroup  row>
            <Button 
            size ={size}
            className={`${classes.root} ${classes[color]}`} 
            onClick={onClick}
        >
            {children}
        </Button>
       </FormGroup>
    )
}
