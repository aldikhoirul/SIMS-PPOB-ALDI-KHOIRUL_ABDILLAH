import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanner, getService } from "../redux/apiThunk";
import { clearError } from "../redux/homeSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Saldo from "./Saldo";
import Slider from "react-slick";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { banner, service, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getBanner());
    dispatch(getService());

    return () => dispatch(clearError());
  }, [dispatch]);

  const handleServiceClick = (service) => {
    navigate("/payment/", { state: { service } });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Memuat...</span>
            </div>
            <p>Memuat, harap tunggu...</p>
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
        <div className="row mb-4 ">
          {Array.isArray(service) && service.length > 0 ? (
            service.map((item) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center m-2" key={item.id} onClick={() => handleServiceClick(item)} style={{ cursor: "pointer", width: "100px" }}>
                <img src={item.service_icon} alt={item.service_name} className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
                <p style={{ fontSize: "13px", marginTop: "5px" }}>{item.service_name}</p>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Tidak ada layanan yang tersedia.</p>
            </div>
          )}
        </div>

        {/* Image Slider */}
        <div className="mb-4">
          {Array.isArray(banner) && banner.length > 0 ? (
            <Slider {...sliderSettings}>
              {banner.map((item) => (
                <div className="text-center m-2" key={item.id}>
                  <img src={item.banner_image} alt={item.banner_name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover", margin: "0 auto" }} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="col-12 text-center">
              <p>Tidak ada banner yang tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
