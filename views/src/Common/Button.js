import { Button as MuiButton, makeStyles } from '@material-ui/core'
import React from 'react'

//Buttons Styles 
const useStyles = makeStyles(theme =>({
    root:{
        margin: theme.spacing(5),
        borderRadius:'25px'
    },
    label:{
        textTransform:'none'
    }

}));

export default function Button(props) {
    const { text, size, color, variant, onClick, ...others } = props;

    const classes = useStyles();

    return (
            <MuiButton className = {classes.root}
                variant={variant || "contained"}
                text={text       || "Submit"}
                size={size       || "medium"}
                color={color     || "primary"}
                onClick={onClick}
                {...others}
                classes ={{label:classes.label}}>
                {text}
             </MuiButton>
    )
}
