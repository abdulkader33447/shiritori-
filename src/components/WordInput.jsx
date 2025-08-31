export default function WordInput({
  playerName,
  input,
  setInput,
  onSubmit,
  onSkip,
  error,
  loading,
  words,
  word,
}) {
  // Checking if the current input is already used
  const isWordUsed =
    input.trim().toLowerCase() && words.includes(input.trim().toLowerCase());

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex sm:flex-row flex-col items-stretch gap-2 mb-3"
      >
        <button
          type="button"
          onClick={onSkip}
          disabled={loading}
          className={`cursor-pointer px-4 py-2 rounded-xl text-white ${
            loading
              ? "bg-gray-300"
              : "bg-gray-600 hover:bg-gray-700 transition duration-500"
          }`}
        >
          Skip (-1)
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${playerName} enter a word...`}
          className={`flex-1 border border-blue-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ${
            isWordUsed ? "text-red-500" : ""
          }`}
          autoFocus
          required
          disabled={loading}
        />
        <div className=" gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer px-4 w-full py-2 rounded-xl text-white ${
              loading
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700 transition duration-500"
            }`}
          >
            {loading ? "Checking..." : "Submit"}
          </button>
        </div>
      </form>
      {error && <div className="mb-4 text-sm text-red-600 ">{error}</div>}
      {isWordUsed && <div className="mb-4 text-sm text-red-500 ">Used</div>}
    </>
  );
}
