import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";

export const useClubs = () => {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });
};
