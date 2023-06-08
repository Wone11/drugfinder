import React from 'react'
import { Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

export default function Notification(props) {
    const {notify,}           =  props;
    return (
        <Snackbar open ={notify.isOpen}
                outoHideDuration= {3000}
        >
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
