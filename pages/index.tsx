import Footer from "../components/Footer";
import { NextPageWithLayout } from "../types";
import Layout from "../components/Layout";
import Link from "next/link";
import { useAccount } from "wagmi";

const Home: NextPageWithLayout = () => {
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

  const { status } = useAccount();

  return (
    <div className="bg-gradient-to-r  from-pink-200 to-white w-full h-screen relative ">
      {/* <ParticleBackground settings={settings2} /> */}

      <section className="">
        <div className="flex flex-col w-screen h-screen items-center text-center justify-center text-black">
          <h1 className="text-2xl px-1 mt-16 ss:mt-8 ssm:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl w-12/12 sm:w-10/12 lg:w-8/12 font-extrabold">
            Decentralized Autonomous Organization
          </h1>
          <p className="w-10/12 lg:w-8/12 text-center font-light my-6 text-lg sm:text-xl lg:text-2xl">
            The aim of this project is to showcase my understanding on what DAO,
            Decentralized Autonomous Organization entails.
          </p>
          <div>
            {status == "connected" ? (
              <div>
                <Link href="/proposals">
                  <a className="p-2 bg-gradient-to-tr to-pink-500  from-gray-800 px-4 text-white text-sm ss:text-xl ssm:text-2xl rounded-md">
                    Start Voting
                  </a>
                </Link>

                <Link href="/create">
                  <a className="p-2 ml-4 bg-gradient-to-tr to-pink-500  from-gray-800 px-4 text-white text-sm ss:text-xl ssm:text-2xl rounded-md">
                    Create Proposal
                  </a>
                </Link>
              </div>
            ) : (
              <p className="p-2 ml-4 bg-gradient-to-tr to-red-500  from-red-800 px-4 text-white text-base rounded-md">
                Make sure your wallet is connected.
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="my-4 p-5 flex flex-col text-center  items-center justify-center">
        <h1 className=" text-2xl ss:text-4xl">How It Works</h1>
        <p className="w-12/12 px-2 ssm:w-9/12 text-gray-800 ssm:text-base text-xs py-2">
          A DAO is a community led entity with no central authority. It is fully
          autonomous and transparent. A DAO is governed entirely by its
          individual members who collectively make critical decisions about the
          future of the project <br />
          <br />
          Community members create proposals about the future operations of the
          protocol and then come together to vote on each proposal. Proposals
          that achieve some predefined level of consensus are then accepted and
          enforced by the rules instantiated within the smart contract <br />
          <br />
        </p>
      </section>
      <Footer />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
