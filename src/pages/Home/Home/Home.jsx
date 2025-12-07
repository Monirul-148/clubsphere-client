import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Home = () => {

  //  Fetch Featured Clubs
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await fetch("https://api.example.com/clubs?limit=6");
      return res.json();
    }
  });

  return (
    <div className="space-y-24">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Welcome to ClubSphere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 max-w-xl mx-auto"
        >
          Discover amazing clubs, join exciting events, and connect with great communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link className="btn btn-primary">Join a Club</Link>
          <Link className="btn btn-secondary">Create a Club</Link>
        </motion.div>
      </section>

      {/* ---------------- FEATURED CLUBS ---------------- */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Featured Clubs
        </h2>

        {isLoading ? (
          <p>Loading clubs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <motion.div
                key={club._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 border rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold">{club.name}</h3>
                <p className="text-gray-500">{club.description}</p>

                <div className="mt-3 text-sm text-gray-600">
                  Members: {club.membersCount}
                </div>

                <Link className="btn btn-sm btn-primary mt-4" to={`/clubs/${club._id}`}>
                  View Club
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="py-16 bg-base-200 roun">
        <h2 className="text-3xl font-semibold text-center mb-10">
          How ClubSphere Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Create Account", "Join Clubs", "Attend Events", "Grow Community"].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 border rounded-xl bg-white shadow"
            >
              <h3 className="text-xl font-bold mb-2">{step}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- WHY JOIN A CLUB ---------------- */}
      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Join a Club?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Meet New People</h3>
            <p className="text-gray-600">Build lasting friendships with like-minded people.</p>
          </div>
          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Develop New Skills</h3>
            <p className="text-gray-600">Participate in activities that help you grow.</p>
          </div>
          <div className="p-6 border rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Have Fun</h3>
            <p className="text-gray-600">Enjoy events, competitions, and community vibes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

