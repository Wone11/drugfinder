import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Container from "../Components/Container";
import HomeBanner from "../Images/main-b10.avif";
import HomeBanner1 from "../Images/main-b1.avif";
import HomeBanner2 from "../Images/main-a1.avif";
import HomeBanner3 from "../Images/main-a.avif";
import HomeBanner4 from "../Images/main-a2.avif";
// import Products    from '../../API/ProductsAPI'
import axios       from "axios";

const Home = () => {
  const [, setLoading] = useState(false);
  const [products, setProducts] = useState([])
  const [searchInput , setSearchInput] = useState('')


 /**
     * Use Effect...
     */
 useEffect(() => {
  const fetchData = async () => {
      setLoading(true);
      try {
          const { data: response } = await axios.get(`http://localhost:9020/api/products/v2/products`);
          setProducts(response);
          console.log("response : " +response);
      } catch (error) {
          console.error(error.message);
      }
      setLoading(true);
  }
 
  fetchData();
}, []);


  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative p-3 ">
              <img 
                src={HomeBanner}
                className="img-fluid rounded-3"
                alt=""
              />
              <br></br>
              <div className="main-banner-content position-absolute">
                <h4>Highly Advanced Search For Medicine Store.</h4>
                <h5>Direction Finder</h5>
                <p>choice your best.</p>
                <Link className="button">DIRECTION</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src={HomeBanner1}
                  className="img-fluid rounded-3"
                  alt="home banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sake</h4>
                  <h5>Good look and feels.</h5>
                  <p>
                    From your locatios <br /> to shopping address.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={HomeBanner2}
                  className="img-fluid rounded-3"
                  alt=""
                />
                <div className="small-banner-content position-absolute">
                  <h4>Here wa are available every device</h4>
                  <h5>Android devices</h5>
                  <p>
                    only Search!
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={HomeBanner3}
                  className="img-fluid rounded-3"
                  alt=""
                />
                <div className="small-banner-content position-absolute">
                  <h4>Nerar by Store First</h4>
                  <h5>don't forget to select </h5>
                  <p>
                   your city !
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={HomeBanner4}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Always Best Routes</h4>
                  <h5>You have to follow</h5>
                  <p>
                    to minimize enery, cost and time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">

        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {products?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.productImage} alt="" />
                    <div>
                      <h6>drug name :{i.drugName}</h6>
                      <h6>price : {i.price} ETB</h6>
                      <p className="mb-0">item available : {i.amount}</p>
                      {/* <p className="mb-0">descriptions : {i.description}</p> */}
                      <br></br>
                      <p className="mb-0">city : {i.city}</p>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src={HomeBanner} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner1} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner2} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner3} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner4} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={HomeBanner1} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

    </>
  );
};

export default Home;
