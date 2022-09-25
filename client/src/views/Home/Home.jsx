import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Home(props) {
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     const populateProducts = async () => {
  //       const { data: products } = await getProducts();
  //       if (products && products.length > 0) setProducts(products);
  //     };
  //     populateProducts().catch((e) => {
  //       console.log(e);
  //       toast.error("An error occurred!", { theme: "dark" });
  //     });
  //   }, []);

  return (
    <div className="container-fluid mb-5">
      <div className="row row-cols-1 row-cols-lg-2 mx-2 mb-2 px-3 bg-dark bg-gradient text-white py-5 shadow">
        <div className="col col-md-6 col-lg-8">
          <div>
            <h1
              style={{
                fontSize: "8vw",
                color: "white",
                fontFamily: "cursive",
              }}
            >
              Get Your Own
              <br />
              Digital Identity
            </h1>
          </div>
        </div>
        <div className="col col-md-6 col-lg-4">
          <img
            className="img-fluid p-3"
            style={{ objectFit: "cover" }}
            src="https://img.freepik.com/free-vector/qr-code-person-holding-smartphone_23-2148620753.jpg?size=338&ext=jpg&ga=GA1.2.1101288580.1663340965"
            alt="titleImg"
          />
        </div>
      </div>
      <div className="row mx-2 mb-2 py-5">
        <div className="col col-md-6 col-lg-6 px-3 ">
          <div className="div-dark hover-focus">
            <a className="text-decoration-none" href="/register-user">
              <div className="row">
                <div className="col col-md-6 col-lg-8 d-flex justify-content-center">
                  <h3>REGISTER AS USER</h3>
                </div>
                <div className="col col-md-6 col-lg-4">
                  <img
                    className="img-thumbnail"
                    src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-50426.jpg?size=338&ext=jpg&ga=GA1.2.1101288580.1663340965"
                    alt="user-img"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col col-md-6 col-lg-6 px-3">
          <div className="div-dark hover-focus">
            <a className="text-decoration-none" href="/register-veri">
              <div className="row">
                <div className="col col-md-6 col-lg-8 fw-bold d-flex justify-content-center">
                  <h3 className="">REGISTER AS VERIFIER</h3>
                </div>
                <div className="col col-md-6 col-lg-4">
                  <img
                    className="img-thumbnail"
                    src="https://img.freepik.com/free-vector/payment-card-electronic-funds-transfer-colorful-cartoon-characters-holding-plastic-credit-card-banking-credit-deposit-contactless-payment-system_335657-842.jpg?size=338&ext=jpg&ga=GA1.2.1101288580.1663340965"
                    alt="user-img"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
