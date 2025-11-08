export default function WordHistory({ words }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Word History</h2>
      {words.length === 0 ? (
        <h3 className="px-3 py-1 rounded-full text-sm bg-gray-700 w-30">No words yet.</h3>
      ) : (
        <div className="flex flex-wrap gap-2">
          {words.map((w, idx) => (
            <span key={w + idx} className="px-3 py-1 rounded-full text-sm bg-gray-700">
              {w}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
