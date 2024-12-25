import { useState } from "react";
import { register } from "../../services/ClientService";
import { useNavigate } from "react-router-dom";

const Registerform = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [numtel, setNumtel] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name; // Nom unique
    const filePath = `${fileName}`; // Chemin logique
    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imagePath = null;
    if (image) {
      imagePath = handleFileUpload(image);
    }

    const formData = {
      nom,
      prenom,
      password,
      numtel,
      image: imagePath, // Chemin envoyé au backend
    };

    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      setError(error.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input
            type="text"
            value={numtel}
            onChange={(e) => setNumtel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image de profil :</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Registerform;
