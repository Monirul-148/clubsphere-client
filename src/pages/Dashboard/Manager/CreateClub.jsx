import { useForm } from "react-hook-form";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";

const CreateClub = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const clubData = {
      ...data,
      managerEmail: user.email,
    };

    const res = await axiosSecure.post("/clubs", clubData);

    if (res.data.insertedId) {
      Swal.fire("Success", "Club sent for approval", "success");
      reset();
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Create Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("clubName")} placeholder="Club Name" className="input input-bordered w-full" />
        <input {...register("category")} placeholder="Category" className="input input-bordered w-full" />
        <input {...register("location")} placeholder="Location" className="input input-bordered w-full" />
        <input {...register("bannerImage")} placeholder="Banner Image URL" className="input input-bordered w-full" />
        <input type="number" {...register("membershipFee")} placeholder="Membership Fee (0 for free)" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full"></textarea>

        <button className="btn btn-primary w-full">
          Create Club
        </button>
      </form>
    </div>
  );
};

export default CreateClub;
