import React from "react";
import { Link } from "react-router-dom";

const MemberHome = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, Member!</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="my-clubs" className="btn btn-primary">My Clubs</Link>
        <Link to="my-events" className="btn btn-secondary">My Events</Link>
        <Link to="payment-history" className="btn btn-accent">Payment History</Link>
      </div>
    </div>
  );
};

export default MemberHome;
