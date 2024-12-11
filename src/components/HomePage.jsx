// src/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { getBanner, getService } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Saldo from "./Saldo";
import Slider from "react-slick";

const HomePage = () => {
  const [banner, setBanner] = useState([]);
  const [service, setService] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerResponse, serviceResponse] = await Promise.all([getBanner(), getService()]);
        setBanner(bannerResponse.data);
        setService(serviceResponse.data);
      } catch (error) {
        console.error(error.response?.data?.message || "Terjadi kesalahan");
        setError(error.response?.data?.message || "Kesalahan yang tidak terduga terjadi. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleServiceClick = (service) => {
    navigate("/payment/", { state: { service } });
  };

  const sliderSettings = {
    dots: true, // tambah titik navigasi
    infinite: true, // aktifkan loop
    speed: 500, // kecepatan transisi
    slidesToShow: 4, // menampilkan 4 gambar salam satu waktu
    slidesToScroll: 1, // scroll 1 slide setiap waktu
    autoplay: true, // fitur autoplay
    autoplaySpeed: 3000, // atur waktu transisi antar gambar
    // arrows: true, // menampilkan tombol panah kiri dan kanan
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
        <div className="d-flex flex-wrap mb-4 ">
          {service.map((item) => (
            <div className="text-center m-2" key={item.id} onClick={() => handleServiceClick(item)} style={{ cursor: "pointer", width: "80px" }}>
              <img src={item.service_icon} alt={item.service_name} className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
              <p style={{ fontSize: "13px", marginTop: "5px" }}>{item.service_name}</p>
            </div>
          ))}
        </div>

        {/* Image Slider */}
        <div className="mb-4">
          <Slider {...sliderSettings}>
            {banner.map((item) => (
              <div className="text-center m-2" key={item.id}>
                <img src={item.banner_image} alt={item.banner_name} className="img-fluid" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
