import React from 'react'
import {Paper,Card, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:'#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(2),
        display: 'flex',
        marginBottom:theme.spacing(2)
    },

    pageIcon:{
        display: 'inline-block',
        padding: theme.spacing(1),
        color:  '#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(2),
        '& .MuiTypography-subitle1':{
            opacity:'0.3'
        }
        
        },
    shape:{
        borderRadius:'10px'
    }

}));

export default function Header(props) {
    const classes = useStyles();
    const {title,subTitle,icon} =props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant='h6'
                        component='div'
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant='subitle6'
                        component='div'
                    >
                        {subTitle}
                    </Typography>
                </div>
            </div>
        </Paper>

    )
}
