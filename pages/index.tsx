import Footer from "../components/Footer";
import { NextPageWithLayout } from "../types";
import Layout from "../components/Layout";
import Link from "next/link";
import { useAccount } from "wagmi";
import "animate.css"

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
    <div className="bg-gradient-to-r from-[#0D1321] via-[#0D1321] to-[#11264d]  w-full relative">
      {/* <ParticleBackground settings={settings2} /> */}
      
      <section className="flex flex-col ft:grid ft:grid-cols-12 items-center h-full px-10 py-10">
        <div className="flex flex-col text-center ft:text-left  ft:col-span-6 px-3 justify-center text-white">
          <h1 className="text-xl ssm:text-3xl mt-12 ft:mt-0 font-bold lg:text-4xl xl:text-4xl">
            Decentralized
          </h1>
          <h1 className="text-xl ssm:text-3xl ft:mt-0 font-bold lg:text-4xl xl:text-4xl">
            Autonomous Organization
          </h1>
          <p className="animate__animated animate__backInLeft font-light my-6 text-lg sm:text-lg lg:text-[18px]">
            The aim of this project is to showcase my understanding on what DAO,
            Decentralized Autonomous Organization entails.
          </p>
          <div>
            {status == "connected" ? (
              <div className="mt-2 flex flex-col ssm:flex-row justify-center ft:justify-start gap-4">
                <div className="bg-amber-500 rounded-full text-white  px-5 py-3 hover:bg-amber-700 ">
                <Link href="/proposals">
                  <a className="text-sm text-[15px]">
                    Start Voting
                  </a>
                </Link>
                </div>

              <div className="border border-amber-500 rounded-full px-5 py-3 ">
                <Link href="/create">
                  <a className="text-amber-500  text-[15px]">
                    Create Proposal
                  </a>
                </Link>
                </div>
              </div>
            ) : (
              <p className="p-2 bg-gradient-to-tr to-amber-500  from-amber-800 px-4 text-white text-base rounded-md">
                Make sure your wallet is connected.
              </p>
            )}
          </div>
        </div>
        <div className="ft:col-span-5 md:col-span-6 mt-12">

        <img src="./governance2.svg" width={500} height={300}/>

        </div>

      </section>

      <section className="my-5 sm:my-16 p-5 flex flex-col text-center  text-white items-center justify-center">
        <h1 className=" text-2xl ss:text-4xl">How It Works</h1>
        <p className="w-12/12 px-2 ssm:w-9/12  ssm:text-base text-xs py-2">
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
