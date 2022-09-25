import { fromWei, inDollarFormat } from "../utils/helper";

export default function VotersTable({ allVoters, options }) {
    // console.log("inside voters table: ", allVoters.length)
  
  return (
    <table className="mt-10 w-10/12 self-center table-fixed rounded-lg shadow text-sm text-left ">
      <thead className=" rounded-lg bg-gray-50">
        <tr className="text-gray-700 bg-gray-300">
          <th scope="col" colSpan={3} className="py-3 pl-3">
            List of Voters
          </th>
        </tr>
      </thead>

      {allVoters.length > 0 ? (
        <tbody className="">
          {allVoters.map((voter) => {
            // console.log("A voter: ", voter)
            const optionIndexes: number[] = voter[1];
            const optionVotes: number[] = voter[2];
            const voterAddress: string = voter[0];

            if (optionIndexes?.length > 0) {
              let i = 0;
              const rows = optionIndexes.map((currentIndex) => {
                const currentVote: number = Number(optionVotes[i]);
                const optionText = options[currentIndex][1];
                i++;

                return (
                  <tr className="bg-white border-t border-gray-300">
                    <td className="py-4 pl-3">
                      {voterAddress.substring(0, 5)}...
                      {voterAddress.substring(
                        voterAddress.length - 6,
                        voterAddress.length
                      )}
                    </td>
                    <td className="pl-3">{optionText}</td>
                    <td className="pl-3 ">{inDollarFormat(Number(fromWei(currentVote)))} LAR</td>
                  </tr>
                );
              });
              return rows

            } else {
              console.log("We are here....");
              return (
                <tr className="bg-white border-t border-gray-300">
                  <td className="py-4 pl-3">No Votes </td>
                </tr>
              );
            }
          })}
        </tbody>
      ) : (
        <tbody className="">
          <tr className="bg-white border-t border-gray-300">
            <td className="py-4 pl-3 text-center" colSpan={3}>
              No Votes yet
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
