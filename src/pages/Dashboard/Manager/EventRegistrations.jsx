// // src/pages/Dashboard/Manager/EventRegistrations.jsx
// import React, { useEffect, useState } from "react";
// import  useAuth  from "../../../hooks/useAuth";

// const EventRegistrations = () => {
//   const [registrations, setRegistrations] = useState([]);
//   const { user, getToken } = useAuth();

//   useEffect(() => {
//     const fetchRegistrations = async () => {
//       try {
//         const token = await getToken();
//         const res = await fetch(
//           "http://localhost:5000/manager/event-registrations",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await res.json();
//         setRegistrations(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchRegistrations();
//   }, [user]);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Event Registrations</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {registrations.map((reg) => (
//           <div key={reg._id} className="p-4 border rounded-xl shadow">
//             <h3 className="text-xl font-semibold">{reg.eventName}</h3>
//             <p>User: {reg.userEmail}</p>
//             <p>Status: {reg.status}</p>
//             <p>Registered At: {new Date(reg.registeredAt).toLocaleString()}</p>
//           </div>
//         ))}
//         {registrations.length === 0 && <p>No registrations yet.</p>}
//       </div>
//     </div>
//   );
// };

// export default EventRegistrations;
