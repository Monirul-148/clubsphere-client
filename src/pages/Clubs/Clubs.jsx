import React from "react";
import { useClubs } from "../../hooks/useClubs.js";

const Clubs = () => {
  const { data: clubs = [], isLoading, error } = useClubs();

  if (isLoading) return <p>Loading clubs...</p>;
  if (error) return <p>Error loading clubs: {error.message}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {clubs.length === 0 && <p>No clubs available.</p>}
      {clubs.map((club) => (
        <div key={club._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img src={club.bannerImage} alt={club.clubName} className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{club.clubName}</h2>
          <p className="text-gray-600">{club.description}</p>
          <p className="mt-1 font-medium">Category: {club.category}</p>
          <p className="mt-1 font-medium">Location: {club.location}</p>
          <p className="mt-1 font-semibold">Membership Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Clubs;
