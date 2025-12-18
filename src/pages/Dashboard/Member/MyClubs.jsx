import { useEffect, useState } from "react";
import useAxiosSecure from "../../../api/axiosSecure";
import {useAuth } from "../../../hooks/useAuth";

const MyClubs = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get("/manager/my-clubs")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setClubs(res.data);
        } else {
          setClubs([]);
        }
      })
      .catch(() => {
        setClubs([]);
      });
  }, [user, axiosSecure]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Clubs</h2>

      {clubs.length === 0 && <p>No clubs found</p>}

      {clubs.map((club) => (
        <div key={club._id}>
          <h3>{club.clubName}</h3>
        </div>
      ))}
    </div>
  );
};

export default MyClubs;
