import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="border rounded shadow p-4">
      <img
        src={event.bannerImage}
        alt={event.eventName}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="font-semibold text-xl mt-2">{event.eventName}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
    </div>
  );
};

export default EventCard;
