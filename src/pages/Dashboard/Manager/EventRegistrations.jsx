import React, { useEffect, useState } from "react";
import axiosSecure from "../../../api/axiosSecure";
import Loading from "../../Shared/Loading/Loading";

const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axiosSecure.get("/event-registrations/my");
        setRegistrations(res.data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Event Registrations</h2>
      {registrations.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrations.map((reg) => (
            <div
              key={reg._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{reg.eventName}</h3>
              <p>
                <strong>Status:</strong> {reg.status}
              </p>
              <p>
                <strong>Registered At:</strong>{" "}
                {new Date(reg.registeredAt).toLocaleString()}
              </p>
              <p>
                <strong>User Email:</strong> {reg.userEmail}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
