
import React, { useState, useEffect } from "react";

const EventRegistrations = () => {
  
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
   
    const fetchData = async () => {
      const data = [
        {
          id: "1",
          eventName: "Photography Workshop",
          memberName: "John Doe",
          email: "john@example.com",
          status: "Registered",
        },
        {
          id: "2",
          eventName: "Hiking Adventure",
          memberName: "Alice Smith",
          email: "alice@example.com",
          status: "Registered",
        },
        {
          id: "3",
          eventName: "Book Club Meetup",
          memberName: "Bob Johnson",
          email: "bob@example.com",
          status: "Pending",
        },
      ];
      setRegistrations(data);
    };

    fetchData();
  }, []);

  // Handle status update (example)
  const handleStatusChange = (id, newStatus) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.id === id ? { ...reg, status: newStatus } : reg
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Event Registrations</h1>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Event Name</th>
                <th className="px-4 py-2 border">Member Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr key={reg.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{reg.eventName}</td>
                  <td className="px-4 py-2 border">{reg.memberName}</td>
                  <td className="px-4 py-2 border">{reg.email}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        reg.status === "Registered"
                          ? "bg-green-500"
                          : reg.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border flex justify-center gap-2">
                    {reg.status !== "Registered" && (
                      <button
                        onClick={() =>
                          handleStatusChange(reg.id, "Registered")
                        }
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                    )}
                    {reg.status !== "Rejected" && (
                      <button
                        onClick={() =>
                          handleStatusChange(reg.id, "Rejected")
                        }
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
