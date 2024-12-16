import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile, updateProfileImage } from "../redux/apiThunk";
import { clearMessages } from "../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const EditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, profileImage, firstName, lastName, error, successMessage, loading } = useSelector((state) => state.profile);

  const [localFirstName, setLocalFirstName] = useState("");
  const [localLastName, setLocalLastName] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(profileImage);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire("Berhasil", successMessage, "success");
      dispatch(clearMessages());
      navigate("/profile");
    }
    if (error) {
      Swal.fire("Gagal", error, "error");
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch, navigate]);

  useEffect(() => {
    setLocalFirstName(firstName);
    setLocalLastName(lastName);
  }, [firstName, lastName]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension !== "jpeg" && fileExtension !== "jpg" && fileExtension !== "png") {
        Swal.fire("Gagal", "Hanya file dengan ekstensi .jpeg atau .png yang diperbolehkan.", "error");
        setImageFile(null);
        setPreviewImage(profileImage);
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localFirstName && localLastName) {
      dispatch(updateProfile({ first_name: localFirstName, last_name: localLastName }));
    }
    if (!imageFile) {
      Swal.fire("Gagal", "Anda belum memilih gambar", "error");
      return;
    }
    dispatch(updateProfileImage(imageFile));
  };

  const handleCancel = () => navigate("/profile");

  return (
    <div className="container">
      <Navbar />
      <div className="d-flex flex-column align-items-center mt-4">
        <img src={profileImage || "/default-profile.jpg"} alt="Profile" className="img-fluid rounded-circle mb-4" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
        <form className="col-12 col-md-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email || ""} disabled />
          </div>
          <div className="mb-3">
            <label>Nama Depan</label>
            <input type="text" className="form-control" value={localFirstName || ""} onChange={(e) => setLocalFirstName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Nama Belakang</label>
            <input type="text" className="form-control" value={localLastName || ""} onChange={(e) => setLocalLastName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Foto Profil</label>
            <input type="file" className="form-control" accept="jpeg,jpg,png" onChange={handleImageChange} />
          </div>
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Memuat..." : "Simpan"}
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
