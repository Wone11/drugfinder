import { DialogContent,DialogTitle,Dialog, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Controls from '../../Components/Common/Controlls'
import CloseIcon from '@material-ui/icons/Close'

const useStyles  = makeStyles(theme=>({
    dialogWrapper:{
        padding: theme.spacing(1),
        position: 'fixed',
        width:'800px',
        fontFamily:"Roboto",
        top: theme.spacing(1),
        fontSize:'24px' 
    },
    formTitle:{
        alignItems:'center'
    },
    dialogTitle:{
        paddingRight: '0px',
        paddingTop: '0px'
    }

}))
export default function Popup(props) {
    const {title,children,openPopup,setOpenPopup}  = props;
    const classes   = useStyles();

    return (
        <Dialog
         open={openPopup}
         maxWidth="lg"
         classes={{paper:classes.dialogWrapper}}
         >
            <DialogTitle className ={classes.dialogTitle} >
                <div style={{display:'flex'}} >
                    <Typography variant='h6' component='div' style={{flexGrow:1}} >
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                         color='secondary'
                         onClick ={()=>{setOpenPopup(false)}}
                    >
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent deviders>
                {children}
            </DialogContent>
        </Dialog>
    )
}
