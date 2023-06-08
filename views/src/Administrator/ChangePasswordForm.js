import React, { useEffect, useState}               from 'react'
import Controlls                         from '../Common/Controlls';
import { UseForm, Form }                 from '..//Common/UseForm';
import axios                             from 'axios';
import {Grid}                            from '@material-ui/core';
import CustomerNavBar                    from  './AdminNavBar'
import { CssBaseline}                    from '@material-ui/core';
import { ThemeProvider,makeStyles }      from "@mui/styles";
import { createTheme }                   from '@mui/material/styles';
import Header                            from '../Header/Header';
import LockResetIcon                     from '@mui/icons-material/LockReset';

import jwt_decode                        from "jwt-decode";
import { useNavigate }                   from 'react-router-dom';

/**
 * Field Values Defined Or Declaration
 */
const fieldValues = {
    userID:0,
    currentPassword: '',
    password: '',
    confirmPassword: '',
}

const theme = createTheme();

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '100px',
        width: '100%'
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)

    },
    
    newButton: {
        position: 'absolute',
        right: '10px',
        fontSize:'10px',
        borderRadius: '25px'
    },
    letterStyle: {
        position: 'absolute',
        right: '20px'
    }
});

export default function ChangePassword(props) {
    let [user,setUser] =useState(()=>localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) :null)
    const Navigate = useNavigate()

    const {addOrEdit} = props;
    const classes = useStyles();


/**
 * Validations....
 * @param {*} fieldValues 
 * @returns 
 */
    const Validate =(fieldValues=values)=>{
        let temp ={...errors}
        if("currentPassword" in fieldValues)
                temp.currentPassword = fieldValues.currentPassword?"":"Current password"
        if("password" in fieldValues)
            temp.password = (/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\:;"'<>,.?/_₹]).{8,16}$/).test(fieldValues.password) ? "" : "password must be eight character with at least one upper case,one lower case,one digit and one special character "
        if("confirmPassword" in fieldValues) 
                temp.confirmPassword = fieldValues.confirmPassword?"":"confirm password and match !"
        
        setErrors({
            ...temp
        });
        if(fieldValues === values)
                return Object.values(temp).every(field=>field ==="");
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange 
    } = UseForm(fieldValues,true,Validate);
  
  
    /**
     * Handle Submit....
     * @param {*} e 
     */
    const handleSubmit=(e) =>{
        e.preventDefault();
        if (values.password === values.confirmPassword) {
            let userID = user.userID
            const data = {
                userID: userID,
                currentPassword: values.currentPassword,
                password: values.password,
            }
            console.log('data : ' + data.currentPassword);
            if (Validate()) {
                axios.patch('http://localhost:9020/api/users/v1/change-password/', data)
                    .then((response) => {
                        window.alert( response.msg);
                        if(response.msg=='success'){
                            Navigate('/login')
                        }
                        resetForm()
                        window.location.reload(true);
                    })
                    .catch((err) => { console.log("Errors ", err) });
            } else {
                window.alert('Check Validations!');
            }
        } else { window.alert('Password Not match') }
    }
 
   
   /**
    * Use Effect
    */
  useEffect(()=>{
      if( addOrEdit!=null)
        setValues({
            ...addOrEdit
        })
       
  },[addOrEdit])
 
      return (
          <>
              <CustomerNavBar />
              <ThemeProvider theme={theme}>
                <div className={classes.appMain}>
                    <Header
                        title="Template To Change Passwords"
                        subTitle="All users change their passwords. whom ever have to know their current password to change!"
                        icon={<LockResetIcon fontSize='medium' />}
                    />
                </div>
                <CssBaseline />
            </ThemeProvider> 
              <Form onSubmit={handleSubmit} encType="multipart/form-data" >
                  <Grid container alignItems="center" justify="center" >
                      <Grid item xs={6}    >
                          <Controlls.InputControls
                              label="Current Password *"
                              name="currentPassword"
                              type="password"
                              value={values.currentPassword}
                              onChange={handleInputChange}
                              error={errors.currentPassword}
                          />

                          <Controlls.InputControls
                              label="Enter New Password *"
                              name="password"
                              type='password'
                              value={values.password}
                              onChange={handleInputChange}
                              error={errors.password}
                          />
                          <Controlls.InputControls
                              label="Confirm Password *"
                              name="confirmPassword"
                              type='password'
                              value={values.confirmPassword}
                              onChange={handleInputChange}
                              error={errors.confirmPassword}
                          />
                          <>
                              <Controlls.Button
                                  type="submit"
                                  text=" Change Password">
                              </Controlls.Button>

                              <Controlls.Button
                                  type="reset"
                                  text="Clear Data"
                                  onClick={resetForm}
                                  color="secondary">
                              </Controlls.Button>
                          </>
                      </Grid>
                  </Grid>
              </Form>
      </>
    )
}
