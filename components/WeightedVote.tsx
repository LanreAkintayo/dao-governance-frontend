export default function WeightedVote(){
    return (
        <div className="shadow bg-white p-3 pb-5 mt-4 w-10/12">
              <h1 className="my-3 pb-3 text-gray-800 border-l-0 border-r-0 border-b border-gray-300 ">
                Cast your Vote W
              </h1>
              <div>
                <div className="w-full h-full text-center items-center">
                  <p className="rounded-md p-2 border shadow  border-gray-700 text-gray-700 text-xl">
                    No
                  </p>
                  <p className="mt-2 rounded-md p-2 border border-gray-700 text-gray-700 text-xl">
                    Yes
                  </p>
                  <p className="mt-2 rounded-md p-2 bg-blue-800 text-white text-xl">
                    Vote
                  </p>
                </div>
              </div>
            </div>
    )
}