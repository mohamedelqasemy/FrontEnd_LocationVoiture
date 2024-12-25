/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, updateClient, uploadProfileImage } from "../../services/ClientService";
import "../../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [disabledBtn,setDisabledBtn] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswords({ ...passwords, [name]: value });
  // };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => {
      const updatedPasswords = { ...prevPasswords, [name]: value };
  
      // Vérifiez si le mot de passe et la confirmation ne correspondent pas
      if (updatedPasswords.newPassword !== updatedPasswords.confirmPassword) {
        setPasswordError("New password and confirm password do not match");
        setDisabledBtn(true);
      } else {
        setDisabledBtn(false);
        setPasswordError(""); // Réinitialiser l'erreur si les deux champs correspondent
      }
  
      return updatedPasswords;
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    handleImageChange
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Stocker le fichier image sélectionné
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mettre à jour les informations utilisateur
      const updatedUser = await updateClient(user.id, user);
      setUser(updatedUser);

      // Gérer l'upload de l'image (si un fichier est sélectionné)
      if (imageFile) {
        const response = await uploadProfileImage(user.id, imageFile);
        setUser((prevUser) => ({
          ...prevUser,
          image: response.image,
        }));
      }
      // Gérer la modification du mot de passe
      if (passwords.oldPassword && passwords.newPassword && passwords.confirmPassword) {
        if(passwords.confirmPassword == passwords.newPassword){
          await changePassword(user.id, passwords);
        }
        else{
          setMessage({
            type: "error",
            text: "Failed to update Password. Please try again.",
          });
        }
        
      }

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3 id="main_title">My Profile</h3>
        <hr />
        <div className="row">
          <div className="col-4 profile-photo">
            <div className="square">
              {user?.image ? (
                <img
                  id="profilePreview"
                  src={"http://localhost:8000/"+user.image} // URL correcte pour l'image
                  alt="Profile"
                  className="profile-img"
                />
              ) : (
                <img
                  id="profilePreview"
                  src="/assets/images/default_image.png"
                  alt="Profile"
                  className="profile-img"
                />
              )}
            </div>
            <div className="custom-file-upload">
              <label htmlFor="uploadPhoto" className="upload-label">
                Choose a file
              </label>
              <input
                type="file"
                id="uploadPhoto"
                className="file-input"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="col-8">
            <div className="form-section section1">
              <h4>Contact Details</h4>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="nom">Nom :</label>
                  <input
                    type="text"
                    name="nom"
                    id="nom"
                    className="form-control"
                    value={user?.nom || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="prenom">Prenom :</label>
                  <input
                    type="text"
                    name="prenom"
                    id="prenom"
                    className="form-control"
                    value={user?.prenom || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="numtel">Numéro Téléphone :</label>
                  <input
                    type="text"
                    name="numtel"
                    id="numtel"
                    className="form-control"
                    value={user?.numtel || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
              <h4>Change Password</h4>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="oldPassword">Old Password:</label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    className="form-control"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                  />
                  
                </div>
                <div className="col-6">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="form-control"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="col-6" style={{fontSize:'12px',color:'red'}}>
                    <div>
                      {passwordError ? (
                        <small className="text-danger">{passwordError}</small>
                      )
                      :
                      (
                        <div style={{color:'transparent'}}>loraemloraemloraemloraemloraemloraemloraemloraemloraemloraemloraemloraemloraem</div>
                      )
                    }
                    </div>
                  </div>
              </div>
            </div>
          </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary"  disabled={disabledBtn}>
            Update Profile
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

        {message && (
          <div
            className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
