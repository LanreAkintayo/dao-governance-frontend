export default function Option({option}){
    console.log("Option: ", option)
    return (
        <div className="bg-gray-200 h-9 mt-2 shadow dark:bg-gray-700 relative">
          <div
            className={`h-9 absolute top-0 bg-gray-400`}
            style={{ width: `${option?.optionPercentage}%` }}
          ></div>
          <div className="absolute px-4 w-full h-full flex justify-between items-center">
            <p>{option?.optionText} {option?.optionVote} LAR</p>
            <p>{option?.optionPercentage}%</p>
          </div>
        </div>
    )
}