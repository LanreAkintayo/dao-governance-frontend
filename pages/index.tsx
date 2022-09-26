import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ParticleBackground from "react-particle-backgrounds";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";


/*
The proposal page should be displayed properly when the contents are not yet ready
If we haven't connect to metamask, we should not be able to create, or vote
Responsiveness is still an issue
handle all this typescript issue

*/
const Home: NextPage = () => {
  const settings2 = {
    particle: {
      particleCount: 100,
      color: "#000d1a",
      maxSize: 2,
    },
    velocity: {
      directionAngle: 180,
      directionAngleVariance: 90,
      minSpeed: 0.1,
      maxSpeed: 0.4,
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.4,
      opacityTransitionTime: 10000,
    },
  };

  return (
    <div className="bg-gradient-to-r  from-pink-200 to-white w-full h-screen relative ">
      <ParticleBackground settings={settings2} />

      <section className="z-10 absolute top-0 left-0 ">
        <Header />
        <div className="flex flex-col w-screen h-screen items-center text-center justify-center text-black">
          <h1 className="text-2xl px-1 mt-16 ss:mt-8 ssm:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl w-12/12 sm:w-10/12 lg:w-8/12 font-extrabold">
            Decentralized Autonomous Organization
          </h1>
          <p className="w-10/12 lg:w-8/12 text-center font-light my-6 text-lg sm:text-xl lg:text-2xl">
            The aim of this project is to showcase my understanding on what
            DAO, Decentralized Autonomous Organization is all about.
          </p>
          <div>
            <button className="p-2 bg-gradient-to-tr to-pink-500  from-gray-800 px-4 text-white text-base ss:text-xl ssm:text-3xl rounded-md">
              Start Voting
            </button>
            <button className="ml-4 p-2 bg-gradient-to-tr from-pink-500  to-gray-800 px-4 text-white text-base ss:text-xl ssm:text-3xl rounded-md">
              Learn more
            </button>
          </div>
        </div>
      </section>
      <section className="my-4 p-5 flex flex-col text-center  items-center justify-center">
        <h1 className=" text-2xl ss:text-4xl">How It Works</h1>
        <p className="w-12/12 px-2 ssm:w-9/12 text-gray-800 ssm:text-base text-xs py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
