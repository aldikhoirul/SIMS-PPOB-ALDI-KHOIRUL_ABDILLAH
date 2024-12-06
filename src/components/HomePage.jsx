// src/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { getBanner, getService } from "../services/api";
import Navbar from "./Navbar";
import Saldo from "./Saldo";

const HomePage = () => {
  const [banner, setBanner] = useState([]);
  const [service, setService] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerResponse, serviceResponse] = await Promise.all([getBanner(), getService()]);
        setBanner(bannerResponse.data);
        setService(serviceResponse.data);
      } catch (error) {
        console.error(error.response.data.message);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="row mt-4">
        <Saldo />

        {/* Service */}
        <div className="d-flex flex-wrap mb-4">
          {service.map((item) => (
            <div className="text-center m-2" key={item.id}>
              <img src={item.service_icon} alt={item.service_icon} className="img-thumbnail" />
              <p>{item.service_name}</p>
            </div>
          ))}
        </div>

        {/* Image Slider */}
        <div className="d-flex flex-wrap mb-4">
          {banner.map((item) => (
            <div className="text-center m-2" key={item.id}>
              <img src={item.banner_image} alt="Banner" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
