import React, { useEffect, useState } from "react";
import axios from "../../api/axiosSecure"; 
import EventCard from "../../components/Logo/cards/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("https://clubsphere-server-nine.vercel.app/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
