import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://clubsphere-server-nine.vercel.app/payments?email=${user.email}`
      )
      .then((res) => setPayments(res.data))
      .catch((err) => console.log(err));
  }, [user.email]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Club</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay._id}>
                <td>{pay.clubName}</td>
                <td>${pay.amount}</td>
                <td>{new Date(pay.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
