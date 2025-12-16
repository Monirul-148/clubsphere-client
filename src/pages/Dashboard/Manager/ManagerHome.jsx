// // src/pages/Dashboard/Manager/ManagerHome.jsx
// import React, { useEffect, useState } from "react";
// import  useAuth  from "../../../hooks/useAuth";

// const ManagerHome = () => {
//   const [stats, setStats] = useState({ totalClubs: 0, totalEvents: 0 });
//   const { user, getToken } = useAuth();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = await getToken();
//         const res = await fetch("http://localhost:5000/manager/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchStats();
//   }, [user]);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Manager Dashboard</h2>
//       <div className="grid grid-cols-2 gap-6">
//         <div className="p-6 bg-white rounded-xl shadow">
//           <h3 className="text-xl font-semibold">Total Clubs</h3>
//           <p className="text-2xl font-bold">{stats.totalClubs}</p>
//         </div>
//         <div className="p-6 bg-white rounded-xl shadow">
//           <h3 className="text-xl font-semibold">Total Events</h3>
//           <p className="text-2xl font-bold">{stats.totalEvents}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerHome;
