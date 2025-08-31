export default function PlayerCard({ name, score, isCurrent }) {
  const badge = isCurrent
    ? ""
    : "bg-gray-200 text-gray-800 transition duration-500";

  return (
    <div
      className={`border border-blue-500 rounded-xl sm:p-4 p-2 ${
        isCurrent ? "bg-blue-500 transition duration-500" : "transition duration-500"
      }`}
    >
      <div className="flex sm:flex-row flex-col items-center gap-5 justify-center">
        <div className="font-semibold">{name}</div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${badge}`}>
          {isCurrent ? "Your Turn" : "Waiting"}
        </div>
      </div>
      <div className="sm:text-3xl text-xl text-center font-bold mt-2">
        {score}
      </div>
    </div>
  );
}
