import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="bg-zinc-900 min-h-screen w-full">
      <Nav />
      <div className="mt-20">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
