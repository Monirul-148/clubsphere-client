import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const CreateEvent = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, getToken } = useAuth();

  const onSubmit = async (data) => {
    try {
      const token = await getToken();
      const res = await fetch(
        "https://clubsphere-server-nine.vercel.app/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...data, managerEmail: user.email }),
        }
      );
      const result = await res.json();
      console.log(result);
      alert("Event created successfully!");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          {...register("name", { required: true })}
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="date"
          {...register("date", { required: true })}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
