// src/pages/Dashboard/Admin/ManageClubs.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const ManageClubs = () => {
  const { getToken } = useAuth();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:5000/clubs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setClubs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClubs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Clubs</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Club Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Members</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club._id}>
              <td className="border px-4 py-2">{club.name}</td>
              <td className="border px-4 py-2">{club.description}</td>
              <td className="border px-4 py-2">{club.membersCount || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClubs;
