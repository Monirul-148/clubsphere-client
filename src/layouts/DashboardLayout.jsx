
import React from "react";
import { Link, Outlet } from "react-router-dom";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 text-black flex-shrink-0">
        <div className="p-6 text-center border-b border-gray-700">
          <Link to='/'><h3 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-pink-500 bg-clip-text text-transparent">
            ClubSphere Dashboard
          </h3></Link>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-6 py-3 hover:bg-gray-200">
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-200">
              <Link to="/dashboard/create-club">Create Club</Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-200">
              <Link to="/dashboard/my-clubs">My Clubs</Link>
            </li>
            <li className="px-6 py-3 hover:bg-gray-200">
              <Link to="/dashboard/event-registrations">Event Registrations</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
