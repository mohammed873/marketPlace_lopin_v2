import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import jwt from "jwt-decode";
import axios from "axios";
import '../../styles/stats.css'

const useStyles = makeStyles({
  root: {
    fontSize: "100px",
    color: "gray",
  },
});

export default function Stats() {
  const classes = useStyles();
  const [seller, setSeller] = useState({});
  const token = localStorage.getItem("token");
  const seller_id = jwt(token)._id;

  useEffect(() => {
    getSeller();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSeller = async () => {
    await axios
      .get("http://localhost:5000/seller/getOne/" + seller_id)
      .then((response) => {
        setSeller(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="face face1">
          <div className="content">
            <div className="icon">
            <i class="fa fa-dollar"></i>
            <p style={{textAlign:'center',fontSize: '35px',color: 'white',fontFamily: 'emoji'}}>Turnover</p>
            </div>
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <h3>
              {seller.turnOver}
            </h3>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="face face1">
          <div className="content">
            <div className="icon">
              <i class="fa fa-product-hunt"></i>
              <p style={{textAlign:'center',fontSize: '35px',color: 'white',fontFamily: 'emoji'}}>Poduct count</p>
            </div>
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <h3>
              {seller.productsCount}
            </h3>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="face face1">
          <div className="content">
            <div className="icon">
            <i class="fa fa-user-circle"></i>
            <p style={{textAlign:'center',fontSize: '35px',color: 'white',fontFamily: 'emoji'}}>Account Typet</p>
            </div>
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <h3>
               {seller.type}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
