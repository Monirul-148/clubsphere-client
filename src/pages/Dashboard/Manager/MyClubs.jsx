import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";

const MyClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["myClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/my");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        My Clubs
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {clubs.map((club) => (
          <div key={club._id} className="border p-4 rounded">
            <h3 className="font-semibold">{club.clubName}</h3>
            <p>Status: <b>{club.status}</b></p>
            <p>Fee: {club.membershipFee}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClubs;
