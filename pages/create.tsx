import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Create: NextPage = () => {
  return (
    <div className="flex flex-col justify-between bg-gray-50 h-full">
      <div>
        <Header />
        <div className="flex mt-24 mx-4">
          <div className="w-8/12 p-2 pl-4 pr-11 ">
            <div className="mt-4 w-10/12">
              <p className="text-gray-700">
                <small>Title: Ask a question</small>
              </p>
              <textarea
                cols={100}
                wrap="soft"
                className="text-gray-700 p-2 w-full h-10 rounded-md  outline-none border border-gray-200"
              ></textarea>
            </div>
            <div className="mt-3 w-10/12">
              <p className="text-gray-700">
                <small>Description: Tell more about your proposal</small>
              </p>
              <textarea
                cols={100}
                wrap="soft"
                className="text-gray-700 w-full h-40 border outline-none p-2  text-sm rounded-md border-gray-200"
              ></textarea>
            </div>
            <div className="mt-3 w-10/12 border border-gray-200 px-4 py-3">
              <p className="text-gray-700">
                <small>Choices</small>
              </p>
              <div className="flex border bg-white items-center mb-2 border-gray-200">
                <div className="flex items-center px-2">
                  <p className="ml-1 text-gray-700">1.</p>
                  <textarea
                    cols={100}
                    wrap="soft"
                    className="text-gray-700 p-2 w-full h-10 outline-none"
                  ></textarea>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="small-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex border bg-white items-center mb-2 border-gray-200">
                <div className="flex items-center px-2">
                  <p className="ml-1 text-gray-700">2.</p>
                  <textarea
                    cols={100}
                    wrap="soft"
                    className="text-gray-700 p-2 w-full h-10 outline-none"
                  ></textarea>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="small-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full my-2 mt-4 flex justify-center">
                <button className="bg-gray-200 rounded-md p-2 px-4 self-center">
                  Add More options
                </button>
              </div>
            </div>

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

export default Create;
