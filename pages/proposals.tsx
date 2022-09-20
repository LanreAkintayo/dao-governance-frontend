import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Proposals: NextPage = () => {
  return (
    <div className="flex flex-col justify-between bg-gray-200">
      <div>
        <Header />
        <section className="px-5 mt-24 flex flex-col items-center ">
          <div className="flex justify-center">
            <div className="p-2 w-80 rounded-md bg-white shadow">
              <p className="text-lg text-gray-700">Proposals Created</p>
              <p className="text-xl">100</p>
            </div>
            <div className="p-2 w-80 ml-4 rounded-md bg-white shadow">
              <p className="text-lg text-gray-700">Proposals Ongoing</p>
              <p className="text-xl">30</p>
            </div>
          </div>

          <div className="mt-11 w-8/12">
            <h1 className="text-xl text-gray-700 py-4 ">Proposals</h1>
            <div className="rounded-md shadow bg-gray-100 w-full p-3 px-11">
              <div className="flex w-full justify-between items-center">
                <p>Account: </p>
                <p className="rounded-md text-red-700 p-1 bg-red-200">Closed</p>
              </div>
              <h1 className="text-xl mt-2 text-gray-900">
                This is the title of the Proposal
              </h1>
              <p className="text-sm mt-2 text-gray-500">
                This is the description of the project with some additional
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum!
              </p>
              <div className="my-4">
                <div className="bg-gray-200 h-9 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>Yes 400 LAR</p>
                    <p>72.34%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md shadow mt-6 bg-gray-100 w-full p-3 px-11">
              <div className="flex w-full justify-between items-center">
                <p>Account: </p>
                <p className="rounded-md text-red-700 p-1 bg-red-200">Closed</p>
              </div>
              <h1 className="text-xl mt-2 text-gray-900">
                This is the title of the Proposal
              </h1>
              <p className="text-sm mt-2 text-gray-500">
                This is the description of the project with some additional
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum!
              </p>
              <div className="my-4">
                <div className="bg-gray-200 h-9 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>Yes 400 LAR</p>
                    <p>72.34%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md shadow mt-6 bg-gray-100 w-full p-3 px-11">
              <div className="flex w-full justify-between items-center">
                <p>Account: </p>
                <p className="rounded-md text-red-700 p-1 bg-red-200">Closed</p>
              </div>
              <h1 className="text-xl mt-2 text-gray-900">
                This is the title of the Proposal
              </h1>
              <p className="text-sm mt-2 text-gray-500">
                This is the description of the project with some additional
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum!
              </p>
              <div className="my-4">
                <div className="bg-gray-200 h-9 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>Yes 400 LAR</p>
                    <p>72.34%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="rounded-md shadow mt-6 bg-gray-100 w-full p-3 px-11">
              <div className="flex w-full justify-between items-center">
                <p>Account: </p>
                <p className="rounded-md text-red-700 p-1 bg-red-200">Closed</p>
              </div>
              <h1 className="text-xl mt-2 text-gray-900">
                This is the title of the Proposal
              </h1>
              <p className="text-sm mt-2 text-gray-500">
                This is the description of the project with some additional
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum!
              </p>
              <div className="my-4">
                <div className="bg-gray-200 h-9 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>Yes 400 LAR</p>
                    <p>72.34%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
                  <div
                    className={`h-9 absolute top-0 bg-gray-400`}
                    style={{ width: `${10}%` }}
                  ></div>
                  <div className="absolute px-4 w-full h-full flex justify-between items-center">
                    <p>No 100 LAR</p>
                    <p>11.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Proposals;