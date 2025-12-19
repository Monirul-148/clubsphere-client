import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

const MyEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://clubsphere-server-nine.vercel.app/my-events?email=${user.email}`
      )
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, [user.email]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      {events.length === 0 ? (
        <p>No events registered.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event._id} className="border p-3 rounded">
              <h3 className="font-semibold">{event.eventTitle}</h3>
              <p>Date: {event.eventDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
