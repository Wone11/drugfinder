import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../Images/newsletter.png";
const Footer = () => {

  const HandleSubmit=(e) =>{
    window.alert('subscribed')
  }
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <button onClick={HandleSubmit}>
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Phone :  +251 990909090, <br /> Email:hunmande1212@gmail.com <br />
                  contry: Ethiopia
                </address>
                <a
                  href="/"
                  title="tel:+251 8264954234"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +251 8264954234
                </a>
                <a
                  href="/"
                  text="mailto:hunmande1212@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  hunmande1212@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="http://www.linkedin.com/hunmande1212">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="http://www.instagram.com/hunmande1212">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="http://www.github.com/wone11/">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="http://www.youtube.com/hunmande1212">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Social Media</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">facebook</Link>
                <Link className="text-white py-2 mb-1">Github</Link>
                <Link className="text-white py-2 mb-1">Youtube</Link>
                <Link className="text-white py-2 mb-1">Telegram</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Developer's GC 2023
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
