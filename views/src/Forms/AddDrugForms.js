//Import Region here
import React, { useState, useEffect } from 'react'
import Controlls                      from '../Common/Controlls';
import { UseForm, Form }              from '../Common/UseForm';
import axios                          from 'axios';
import { Grid,  }                     from '@material-ui/core';
// import { isAuthenticated }            from '../Helper/Auth';
import * as RespectiveUnit                 from '../Common/GetRespectiveUnits'

import jwt_decode  from "jwt-decode";

/**
 * Field Values defined Here!
 */
const fieldValues = {
    productID: '',
    userID: '',
    businessName:'',
    drugName: '',
    city:'',
    handleCity:'',
    price: 0.0,
    amount: 0,
    description: '',
    soldOut: 0,
    latitude: 0.0,
    longitude: 0.0,
}
export default function ProductForms(props) {
    let [user,setUser] =useState(()=>localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) :null)
    const { addOrEdit } = props;
    const [, setLoading] = useState(false);
    const [productImage, setSelectedFile] = useState();
    const [, setIsFilePicked] = useState(false);
    const [disable, setDisable]           = useState(true);

    /**
     * Select productImage selected on click 
     * @param {*} event 
     */
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    /**
     * Form Controller Validations
     * @param {*} fieldValues 
     * @returns 
     */
    const Validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ("businessName" in fieldValues)
            temp.businessName = fieldValues.businessName ? "" : "Business Name is required *"
        if ("city" in fieldValues)
            temp.city = fieldValues.city ? "" : "city is required *"
        if ("drugName" in fieldValues)
            temp.drugName = fieldValues.drugName ? "" : "Drug Name is required *"
        if("price" in fieldValues)
                temp.price = fieldValues.price?"":"drug price value is required"
        if ("amount" in fieldValues)
            temp.amount = fieldValues.amount ? "" : "amount of drug in store is required!"
        setErrors({
            ...temp
        });
        if (fieldValues === values)
            return Object.values(temp).every(field => field === "");
    }

    /**
     * Use forms to pass values
     */
    const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange
    } = UseForm(fieldValues, true, Validate);


    //Handle Submit Event Here!
    const handleSubmit = (e) => {
        e.preventDefault();
        const userID = user.userID
        const productID = 0
        const soldOut = 0
        const formData = new FormData();
       
        formData.append("productID", productID);
        formData.append("userID", userID);
        // formData.append("regionName", isAuthenticated().regionName);
        formData.append("businessName", values.businessName);
        if(values.city==='Others'){
            formData.append("city", values.handleCity);  
          }
          else{
            formData.append("city", values.city);
          }
        formData.append("drugName", values.drugName);
        formData.append("productImage", productImage);
        formData.append("price", values.price);
        formData.append('amount', values.amount);
        formData.append('description', values.description);
        formData.append('soldOut', soldOut);
        formData.append('latitude', values.latitude);
        formData.append('longitude', values.longitude);

        if (Validate()) {
            axios.post('http://localhost:9020/api/products/v2/add-product/', formData)
                .then((response) => {
                    window.alert('Added successfully!', response);
                    resetForm()
                })
                .catch((err) => { console.log("Errors ", err) });
        } else {
            window.alert('Check Validations!');
        }
    }

    /**
     * React hook state management
     */
    useEffect(() => {
        if (addOrEdit != null)
            setValues({
                ...addOrEdit
            })
    }, [addOrEdit,setValues])
 

    /**
     * Use Effect
     */
    useEffect(() => {
        if (addOrEdit != null)
            setValues({
                ...addOrEdit
            })

    }, [addOrEdit])


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container >
                <Grid item xs={6}>
                   
                    <Controlls.InputControls
                        name="businessName"
                        label="Business Name *"
                        value={values.businessName}
                        onChange={handleInputChange}
                        error={errors.businessName}
                    />

                    <Controlls.Select
                        name="city"
                        label="City Name *"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        options={RespectiveUnit.Cities()}
                    />
                    <Controlls.InputControls
                        name="handleCity"
                        label="Specify Others"
                        value={values.handleCity}
                        onChange={handleInputChange}
                        error={errors.handleCity}
                        disabled={disable ? values.city !== 'Others' : values.typeOfProperty === 'Others'}
                    />

                    <Controlls.InputControls
                        name="drugName"
                        label="Drug Name *"
                        value={values.drugName}
                        onChange={handleInputChange}
                        error={errors.drugName}
                    />
                    <Controlls.InputControls
                        label=""
                        name='productImage'
                        type='file'
                        onChange={changeHandler}
                    />
                  

                    <Controlls.Button
                        type="reset"
                        text="  Clear Data "
                        size='200px'
                        onClick={resetForm}
                        color="secondary">
                    </Controlls.Button>

                </Grid>
                <Grid item xs={6}>

                    <Controlls.InputControls
                        name="price"
                        label="Price  *"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                     <Controlls.InputControls
                        name="amount"
                        label="Available Amount *"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                    />
                     <Controlls.InputControls
                        name="description"
                        label="Drug Description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                    <Controlls.InputControls
                        name="latitude"
                        label="Latitude"
                        value={values.latitude}
                        onChange={handleInputChange}
                        error={errors.latitude}
                    />
                    <Controlls.InputControls
                        name="longitude"
                        label="Longitude "
                        value={values.longitude}
                        onChange={handleInputChange}
                        error={errors.longitude}
                    />
                     <Controlls.Button
                        type="submit"
                        text=" Add Items">
                    </Controlls.Button>
                    
                </Grid>
            </Grid>
        </Form>
    )
}
