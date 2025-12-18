import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleJoin = () => {
    console.log("Joining club ID:", id);

 
    navigate(`/dashboard/member/join-club/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Club Details - ID: {id}</h1>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        ullamcorper ultricies nisi. Nam eget dui.
      </p>
      
      <div className="flex gap-4">
        <button onClick={handleJoin} className="btn text-white bg-gradient-to-r from-purple-800 to-pink-500">
          Join This Club
        </button>

        <button 
          onClick={() => navigate("/clubs")} 
          className="btn text-white bg-gradient-to-r from-purple-800 to-pink-500"
        >
          Back to Clubs
        </button>
      </div>
    </div>
  );
};

export default ClubDetails;
