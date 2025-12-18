
import React, { useEffect, useState } from "react";
import  { useAuth }  from "../../../hooks/useAuth";

const MyClubs = () => {
  const [clubs, setClubs] = useState([]);
  const { user, getToken } = useAuth();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:5000/manager/my-clubs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setClubs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClubs();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Clubs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="p-4 border rounded-xl shadow">
            <h3 className="text-xl font-semibold">{club.name}</h3>
            <p className="text-gray-500">{club.description}</p>
            <p className="mt-2 text-sm text-gray-600">
              Status: {club.status}
            </p>
          </div>
        ))}
        {clubs.length === 0 && <p>No clubs found.</p>}
      </div>
    </div>
  );
};

export default MyClubs;
