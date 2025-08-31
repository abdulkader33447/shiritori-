export default function WordHistory({ words }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Word History</h2>
      {words.length === 0 ? (
        <div>No words yet.</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {words.map((w, idx) => (
            <span
              key={w + idx}
              className="px-3 py-1 rounded-full text-sm"
            >
              {w}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
