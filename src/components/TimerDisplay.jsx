export default function TimerDisplay({ secondsLeft, requiredStart }) {
  return (
    <section className="flex sm:flex-row flex-col gap-5 items-center justify-between border border-blue-400 rounded-xl sm:p-4 p-2 mb-4">
      <div className="text-lg">
        {requiredStart ? (
          <>
            Must start with:{" "}
            <span className="font-semibold">{requiredStart.toUpperCase()}</span>
          </>
        ) : (
          <span>Any word to start</span>
        )}
      </div>
      <div
        className={`text-lg flex gap-2 ${
          secondsLeft <= 5 ? "text-red-500" : ""
        }`}
      >
        Time left: <p className="font-semibold w-5">{secondsLeft}s</p>
      </div>
    </section>
  );
}
