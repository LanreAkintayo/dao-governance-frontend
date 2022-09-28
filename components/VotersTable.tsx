import { Voter } from "../lib/fetchProposals";
import { fromWei, inDollarFormat } from "../utils/helper";

export default function VotersTable({ allVoters, options }:{allVoters:any[][], options:string[][]}) {
    // console.log("inside voters table: ", allVoters.length)
    let votersId = 1;
  
  return (
    <table className="mt-10 w-10/12 self-center table-auto rounded-lg shadow text-sm text-left overflow-x-scroll">
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
            const currentIndex = allVoters.indexOf(voter)
            const optionIndexes = voter[1] as number[];
            const optionVotes = voter[2] as number[];
            const voterAddress = voter[0] as string;

            if (optionIndexes?.length > 0) {
              let i = 0;
              const rows = optionIndexes.map((currentIndex) => {
                const currentVote: number = Number(optionVotes[i]);
                const optionText = options[currentIndex][1];
                i++;

                return (
                  <tr key={currentIndex} className="bg-white border-t border-gray-300 "  >
                    <td className="py-4 pl-3 text-xs lg:text-sm">
                      {voterAddress.substring(0, 5)}...
                      {voterAddress.substring(
                        voterAddress.length - 6,
                        voterAddress.length
                      )}
                    </td>
                    <td className="pl-3 text-xs lg:text-sm">{optionText}</td>
                    <td className="pl-3 text-xs lg:text-sm">{inDollarFormat(Number(fromWei(currentVote)))} LAR</td>
                  </tr>
                );
              });
              return rows

            } else {
              console.log("We are here....");
              return (
                <tr  key={currentIndex}  className="bg-white border-t border-gray-300">
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
              No Votes 
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
