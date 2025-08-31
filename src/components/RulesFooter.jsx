export default function RulesFooter() {
  return (
    <footer className="mt-6 text-xs">
      <h1>Rules</h1>
      <li>The first player will say an English word.</li>
      <li>
        The next player must say a new English word using the last letter of
        that word.
      </li>
      <li>No word can be used more than once.</li>
      <li>
        If a player cannot find a new word, they lose 2 points and the turn
        passes.
      </li>
      <li>
        A player can skip their turn, losing 1 point, and the turn passes.
      </li>
    </footer>
  );
}
