import { fromWei, inDollarFormat } from "../utils/helper";
import useProposals from "../hooks/useProposals";

export default function VotingPower({ className }: { className: string }) {

  const { larBalance } = useProposals();

  console.log("Lar balance: ", larBalance.toString());


  return (
    <div className={`${className} bg-white p-2 rounded-full text-xs `}>
      {larBalance && (
        <p className="whitespace-nowrap">
          Voting Power: {inDollarFormat(Number(fromWei(larBalance.toString())))} LAR
        </p>
      )}
    </div>
  );
}
