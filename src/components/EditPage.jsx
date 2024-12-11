// src/Profile.jsx
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, updateProfileImage } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const EditPage = () => {
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setEmail(response.data.email);
        setProfileImage(response.data.profile_image);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
      } catch (error) {
        console.error(error.response?.data?.message);
        setError(error.response?.data?.message);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension !== "jpeg" && fileExtension !== "jpg" && fileExtension !== "png") {
        Swal.fire("Gagal", "Hanya file dengan ekstensi .jpeg atau .png yang diperbolehkan.", "error");
        setImageFile(null);
        setProfileImage("");
        return;
      }

      setImageFile(file);

      // Menampilkan pratinjau gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      setError("Nama Depan dan Nama Belakang tidak boleh kosong");
      return;
    }

    try {
      const response = await updateProfile(firstName, lastName);
      console.log(response.data.message);
      setMessage(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.error(error.response?.data?.message);
      setError(error.response?.data?.message);
      Swal.fire("Gagal", error.response?.data?.message, "error");
    }

    // if (imageFile === null) {
    //   setError("Foto profil tidak boleh kosong");
    //   Swal.fire("Gagal", "Anda harus memilih foto profil", "error");
    //   return;
    // }

    if (imageFile) {
      try {
        const response = await updateProfileImage(imageFile);
        Swal.fire("Berhasil", "Foto profil berhasil diperbarui", "success");
        navigate("/profile");
      } catch (error) {
        console.error(error.response?.data?.message);
        Swal.fire("Gagal", "Gagal memperbarui foto profil", "error");
      }
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="d-flex flex-column align-items-center mt-4">
        <img src={profileImage || "/default-profile.jpg"} alt="Profile" className="img-fluid rounded-circle mb-4 profile-image" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
        <h2 className="mb-4">
          {firstName} {lastName}
        </h2>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                @
              </span>
              <input type="email" className="form-control" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Nama Depan
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                <i className="bi bi-person"></i>
              </span>
              <input type="text" className="form-control" id="firstName" placeholder="Nama depan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Nama Belakang
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: "#ffffff" }}>
                <i className="bi bi-person"></i>
              </span>
              <input type="text" className="form-control" id="lastName" placeholder="Nama belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="profileImage" className="form-label">
              Foto Profil
            </label>
            <input type="file" className="form-control" id="profileImage" accept="jpeg,jpg,png" onChange={handleImageChange} />
            <small className="text-muted">Pilih gambar untuk mengganti foto profil.</small>
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Simpan
          </button>
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleCancel}>
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
