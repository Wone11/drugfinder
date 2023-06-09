import "./App.css";
import React,{Fragment}                   from 'react';

//auth provider
import { AuthProvider } from "./Context/AuthContext";

// import {BrowserRouter, Routes , Route}   from 'react-router-dom'
import {BrowserRouter as Router ,Routes,Route}  from 'react-router-dom'

import Layout         from './Public/Components/Layout';
import Home           from './Public/Pages/Home';
import Contact        from './Public/Pages/Contact';
import About          from './Public/Pages/About';
import Login          from "./Public/Pages/Login";
import OurStore       from "./Public/Pages/OurStore";
import Signup         from "./Public/Pages/Signup";
import Documentations from "./Public/Pages/Documentations";
import Forgotpassword from "./Public/Pages/ForgotPassword";


//All customers Import
import Customer                   from "./Customers/Customers";
import ChangePasswordForCustomer  from "./Customers/ChangePasswordForm";
import Informations               from "./Customers/Informations";

//customers protected routes
import UsersProtectedRoute        from './ProtectedRoutes/UsersProtectedRoutes'

//admins protected routes
import AdminProtectedRoutes       from './ProtectedRoutes/AdministratorProtectedRoutes'

//admin page imports
import Stores                     from "./Administrator/Stores";
import AdminsInformations         from "./Administrator/AdminsInformations";
import InActiveCustomers          from "./Administrator/InACtiveCustomers";
import ActiveCustomers            from "./Administrator/ActiveCustomers"
import PendedCustomer             from "./Administrator/UsersPending";
import ChangePasswordAdmin        from "./Administrator/ChangePasswordForm";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          {/* <Fragment> */}
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='contact' element={<Contact />} />
                <Route path='about-us' element={<About />} />
                <Route path='documentations' element={<About />} />
                <Route path='product' element={<OurStore />} />
                <Route path='login' element={<Login />} />
                <Route path='forgot-password' element={<Forgotpassword />} />
                <Route path='Signup' element={<Signup />} />
              </Route >
            </Routes>
            
            {/* @ admin routes here... */}
            <Routes element={<AdminProtectedRoutes/>}>
              <Route path="/stores" Component={Stores} />
              <Route path="/admins-information" Component={AdminsInformations} />
              <Route path="/active-customers" Component={ActiveCustomers} />
              <Route path="/inactive-customer" Component={InActiveCustomers} />
              <Route path="/pended-customers" Component={PendedCustomer} />
              <Route path="/change-admin-password" Component={ChangePasswordAdmin} /> 
            </Routes>

            <Routes element={<UsersProtectedRoute/>} >
              <Route path="/add-items"  Component={Customer}/>
              <Route path="/informations"  Component={Informations}/>
              <Route path="/change-password-customer"  Component={ChangePasswordForCustomer}/>
            </Routes>
          {/* </Fragment> */}
        </AuthProvider>

      </Router >
    </>
  );
}

export default App;
