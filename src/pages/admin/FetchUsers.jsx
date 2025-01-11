import DataTable from "react-data-table-component";
import './FetchUsers.css';
import { useState, useEffect } from "react";
import { getClients } from "../../services/AdminService";

const columns = [
  {
    name: "Nom",
    selector: row => row.nom, // Champ 'nom' de vos données
  },
  {
    name: "Prénom",
    selector: row => row.prenom, // Champ 'prenom' de vos données
  },
  {
    name: "NumTel",
    selector: row => row.numtel, // Champ 'numtel' de vos données
  },
];

const customStyles = {
  table: {
    style: {
      borderRadius: '10px',
      overflow: 'hidden',
    },
  },
  headCells: {
    style: {
      backgroundColor: "#0072ff", 
      color: "white", 
      fontSize: "15px", 
      fontWeight: "bold", 
      textAlign:"center",
      border:"2px solid #0072ff",
    },
  },
  cells: {
    style: {
      width: '200px',
      borderRadius: '5px',
    },
  },
};

// Fonction pour récupérer les clients


export const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Charger les utilisateurs depuis l'API au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientData = await getClients();
        setUsers(clientData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Filtrer les utilisateurs selon le prénom
  const handleChange = (e) => {
    let q = e.target.value;
    setSearchQuery(q);

    // Filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = users.filter(item =>
      item.prenom.toLowerCase().includes(q.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <div>
      <div className="search">
        <h1>Table of users</h1>
        <input
          type="text"
          placeholder="Search by prénom"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      
      <DataTable
        columns={columns}
        data={users}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[4, 8, 12]}
        customStyles={customStyles}
      />
    </div>
  );
};
