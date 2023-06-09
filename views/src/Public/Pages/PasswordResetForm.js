import React,{useContext} from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import AuthContext from "../../Context/AuthContext";

const ResetPasswordForm = () => {
  let {ResetPassword} = useContext(AuthContext)

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                Enter token send through your email `🙌`
              </p>
              <form action="form" onSubmit={ResetPassword} className="d-flex flex-column gap-15">
                <CustomInput type="text" name="token" placeholder="password reset token *" />
                <CustomInput type="password" name="password" placeholder="New password *" />
                <CustomInput type="password" name="confirmPassword" placeholder="Confirm password *" />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default ResetPasswordForm;