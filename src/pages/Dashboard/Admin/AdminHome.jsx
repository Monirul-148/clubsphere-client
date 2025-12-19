
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const { user, getToken } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClubs: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const usersRes = await fetch(
          "https://clubsphere-server-nine.vercel.app/users",
          { headers }
        );
        const usersData = await usersRes.json();

        const clubsRes = await fetch(
          "https://clubsphere-server-nine.vercel.app/clubs",
          { headers }
        );
        const clubsData = await clubsRes.json();

        const paymentsRes = await fetch(
          "https://clubsphere-server-nine.vercel.app/payments",
          { headers }
        );
        const paymentsData = await paymentsRes.json();

        setStats({
          totalUsers: usersData.length,
          totalClubs: clubsData.length,
          totalPayments: paymentsData.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
          <Link
            to="/dashboard/admin/manage-users"
            className="text-blue-600 underline mt-2 block"
          >
            Manage Users
          </Link>
        </div>
        <div className="p-6 border rounded shadow">
          <h2 className="text-xl font-semibold">Total Clubs</h2>
          <p className="text-2xl">{stats.totalClubs}</p>
          <Link
            to="/dashboard/admin/manage-clubs"
            className="text-blue-600 underline mt-2 block"
          >
            Manage Clubs
          </Link>
        </div>
        <div className="p-6 border rounded shadow">
          <h2 className="text-xl font-semibold">Total Payments</h2>
          <p className="text-2xl">{stats.totalPayments}</p>
          <Link
            to="/dashboard/admin/payments"
            className="text-blue-600 underline mt-2 block"
          >
            View Payments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
