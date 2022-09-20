import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Proposal: NextPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Header />
        <div className="flex mt-24 mx-4">
          <div className="w-8/12 p-2 ">
            <h1>This is the title</h1>
          </div>
          <div className="w-4/12 ">
            <div className="shadow p-2">
                <h1>Information</h1>
                <div className="flex items-center justify-between"></div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Proposal;
