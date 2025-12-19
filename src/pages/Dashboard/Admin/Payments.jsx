
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Payments = () => {
  const { getToken } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = await getToken();
        const res = await fetch(
          "https://clubsphere-server-nine.vercel.app/payments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border px-4 py-2">
                {p.userId?.name || "Unknown"}
              </td>
              <td className="border px-4 py-2">{p.amount}</td>
              <td className="border px-4 py-2">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
