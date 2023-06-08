import React, { useContext } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import AuthContext from "../../Context/AuthContext";


const Signup = () => {
  let {RegisterNewUser} = useContext(AuthContext)

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="form"   onSubmit={RegisterNewUser} className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="email *" />
                <CustomInput type="text"  name="city" placeholder="City *" />
                <CustomInput type="password" name="password" placeholder="Password *"/>
                <CustomInput type="file"   name="authorizationDocument" placeholder="Authorization Document *"/>
                <CustomInput type="tel"   name="phoneNumber" placeholder="Mobile Number *"/>
                <CustomInput type="text"   name="fullName" placeholder="Full Name *"/>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;