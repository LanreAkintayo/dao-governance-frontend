import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ParticleBackground from "react-particle-backgrounds";
import Link from "next/link";
import Header from "../components/Header";

const Home: NextPage = () => {
  const settings2 = {
    particle: {
      particleCount: 500,
      color: "#000d1a",
      maxSize: 2,
    },
    velocity: {
      directionAngle: 180,
      directionAngleVariance: 60,
      minSpeed: 0.1,
      maxSpeed: 0.3,
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.4,
      opacityTransitionTime: 10000,
    },
  };

  return (
    <div className="bg-gradient-to-r  from-pink-200 to-white w-full h-screen relative">
      <ParticleBackground settings={settings2} />

      <section className="z-10 absolute top-0 left-0 ">
        <Header />
        <div className="flex flex-col w-screen h-screen items-center text-center justify-center text-black">
          <h1 className="text-6xl w-8/12 font-extrabold">
            Decentralized Autonomous Organization
          </h1>
          <p className="w-8/12 text-center font-light my-6 text-2xl">
            The aim of this platform is to showcase my understanding on what
            DAO, Decentralized Autonomous Organization is all about.
          </p>
          <button className="p-2 bg-gray-300 px-4 text-black text-3xl rounded-md">Start Voting</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
