import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ClubDetails = () => {
  const { id } = useParams(); // URL থেকে id
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/clubs/${id}`)
      .then((res) => {
        setClub(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios error 👉", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!club) return <p>Club not found</p>;

  return (
    <div>
      <h2>{club.clubName}</h2>
      <p>{club.description}</p>
      <p>Status: {club.status}</p>
      <img src={club.bannerImage} alt={club.clubName} width="400" />
    </div>
  );
};

export default ClubDetails;
