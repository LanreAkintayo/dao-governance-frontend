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
      color: "#e3d5d5",
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
    <div className="bg-peach w-full h-screen relative">
      <ParticleBackground settings={settings2}/>
      <div className="">
      <Header />
      </div>
      <section className="absolute top-0 left-0 text-royalBlue">
          <div className="flex flex-col w-screen h-screen items-center justify-center ">
          <h1 className="text-5xl">Decentralized Autonomous Organization</h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
