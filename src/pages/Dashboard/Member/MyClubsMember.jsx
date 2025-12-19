import React from "react";

const MyClubsMember = () => {
  
  const myClubs = [
    { id: "1", name: "Photography Club" },
    { id: "3", name: "Book Club" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Clubs</h2>
      <ul className="list-disc pl-5">
        {myClubs.map(club => (
          <li key={club.id} className="mb-2">
            {club.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyClubsMember;
