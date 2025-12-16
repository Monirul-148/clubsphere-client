import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const JoinClubButton = ({ club }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinClub = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // ✅ FREE CLUB
      if (club.membershipFee === 0) {
        const res = await axiosSecure.post("/memberships", {
          clubId: club._id,
          clubName: club.clubName,
        });

        if (res.data.insertedId) {
          Swal.fire("Success!", "You joined this club!", "success");
        }
      }
      // 💳 PAID CLUB
      else {
        const res = await axiosSecure.post("/payments/create-intent", {
          amount: club.membershipFee,
          clubId: club._id,
        });

        navigate(`/dashboard/member/payment/${res.data.clientSecret}`);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Join failed",
        "error"
      );
    }
  };

  return (
    <button
      onClick={handleJoinClub}
      className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
    >
      Join Club
    </button>
  );
};

export default JoinClubButton;
