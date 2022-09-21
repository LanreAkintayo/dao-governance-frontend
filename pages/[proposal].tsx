import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Proposal: NextPage = () => {
  return (
    <div className="flex flex-col justify-between bg-gray-50 h-full">
      <div>
        <Header />
        <div className="flex mt-24 mx-4">
          <div className="w-8/12 p-2 pl-4 pr-11 ">
            <h1 className="text-2xl">
              hic voluptates pariatur est explicabo fugiat, dolorum eligendi
              quam cupiditate excepturi mollitia maiores labore suscipit quas?
              Nulla, placeat
            </h1>

            <div className="mt-4 ">
              <h1 className="text-lg text-gray-700">Description</h1>
              <p className="text-gray-700">
                Voluptatem quaerat non architecto ab laudantium modi minima sunt
                esse temporibus sint culpa, recusandae aliquam numquam totam
                ratione voluptas quod exercitationem fuga. Possimus quis earum
                veniam quasi aliquam eligendi, placeat qui corporis! <br />
                <br />
                aliquam numquam totam ratione voluptas quod exercitationem fuga.
                Possimus quis earum veniam quasi aliquam eligendi, placeat qui
                corporis!
                <br />
                <br />
                aliquam numquam totam ratione voluptas quod exercitationem fuga.
                Possimus quis earum veniam quasi aliquam eligendi, placeat qui
                corporis!
              </p>
            </div>

            <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Cast your Vote
              </h1>
              <div>
                <div className="w-full h-full text-center items-center">
                  <p className="rounded-md p-2 bg-blue-100 text-blue-900 text-xl">No</p>
                  <p className="mt-2 rounded-md p-2  bg-blue-100 text-blue-900 text-xl">Yes</p>
                  <p className="mt-2 rounded-md p-2 bg-blue-400 text-white text-xl">Vote</p>
                </div>
              </div>
            </div>

            <table className="mt-10 w-10/12 self-center table-fixed rounded-lg shadow text-sm text-left ">
              <thead className=" rounded-lg bg-gray-50">
                <tr className="text-white bg-blue-400">
                  <th
                    scope="col"
                    colSpan={3}
                    className="py-3 pl-3"
                  >
                    List of Voters
                  </th>
                </tr>
              </thead>

              <tbody className="">
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">No</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">Yes</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">Yes</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">0xdd4f32....9b124</td>
                  <td className="pl-3">Yes</td>
                  <td className="pl-3 ">43,432 LAR</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-4/12 rounded-md  text-sm">
            <div className="shadow bg-white p-3 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Information
              </h1>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Voting System</p>
                <p>Single Choice Voting</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Start Date</p>
                <p>April 29, 2022, 7:50 PM</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">End Date</p>
                <p>April 29, 2022, 7:50 PM</p>
              </div>
            </div>

            <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Results
              </h1>
              <div>
                <div className="w-full h-full flex justify-between items-center">
                  <p>
                    <small>No</small>
                  </p>
                  <p>
                    <small>100 LAR 11.2%</small>
                  </p>
                </div>
                <div className="bg-gray-200 rounded-lg h-3 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-3 absolute rounded-lg  top-0 bg-blue-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="w-full h-full flex mt-2 justify-between items-center">
                  <p>
                    <small>Yes</small>
                  </p>
                  <p>
                    <small>100 LAR 11.2%</small>
                  </p>
                </div>
                <div className="bg-gray-200 rounded-lg h-3 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-3 absolute rounded-lg  top-0 bg-blue-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Proposal;
