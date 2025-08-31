import { useEffect, useMemo, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";
import TimerDisplay from "./TimerDisplay";
import WordInput from "./WordInput";
import WordHistory from "./WordHistory";
import RulesFooter from "./RulesFooter";
import { alphaHead, alphaTail } from "../utils/utils";

const TIMER_SECONDS = 30;

export default function ShiritoriGame() {
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState({ 0: 0, 1: 0 });
  const [words, setWords] = useState([]);
  const [requiredStart, setRequiredStart] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const intervalRef = useRef(null);

  const otherPlayer = useMemo(
    () => (currentPlayer === 0 ? 1 : 0),
    [currentPlayer]
  );

  function resetTimer() {
    clearInterval(intervalRef.current);
    setSecondsLeft(TIMER_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          handleTimeout();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function startNewTurn(nextPlayer) {
    setCurrentPlayer(nextPlayer);
    setInput("");
    setError("");
  }

  function handleTimeout() {
    setScores((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] - 2, // Deduct 2 points for timeout
    }));
    startNewTurn(otherPlayer);
  }

  function handleSkip() {
    setScores((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] - 1, // Deduct 1 point for skip
    }));
    startNewTurn(otherPlayer);
    resetTimer();
  }

  useEffect(() => {
    resetTimer();
    return () => clearInterval(intervalRef.current);
  }, [currentPlayer]);

  function basicValidation(rawWord) {
    const word = rawWord.trim().toLowerCase();
    if (!word) return { ok: false, msg: "Enter a word" };
    if (!/^[a-z]+$/i.test(word))
      return { ok: false, msg: "Use letters A–Z only" };
    if (words.includes(word)) return { ok: false, msg: "Word already used" };
    if (requiredStart && alphaHead(word) !== requiredStart)
      return {
        ok: false,
        msg: `Word must start with '${requiredStart.toUpperCase()}'`,
      };
    return { ok: true, word };
  }

  async function isValidDictionaryWord(word) {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          word
        )}`
      );
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const { ok, msg, word } = basicValidation(input);
    if (!ok) {
      setError(msg);
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] - 2, // Deduct 2 points for invalid word
      }));
      startNewTurn(otherPlayer);
      return;
    }

    setLoading(true);
    const dictOk = await isValidDictionaryWord(word);
    setLoading(false);

    if (!dictOk) {
      setError("Not a valid English word ");
      // setScores((prev) => ({
      //   ...prev,
      //   [currentPlayer]: prev[currentPlayer] - 2, // Deduct 2 points for invalid dictionary word
      // }));
      // startNewTurn(otherPlayer);
      return;
    }

    const tail = alphaTail(word);
    setWords((w) => [...w, word]);
    setRequiredStart(tail);
    setScores((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 2,
    }));
    startNewTurn(otherPlayer);
  }

  function handleResetGame() {
    clearInterval(intervalRef.current);
    setScores({ 0: 0, 1: 0 });
    setWords([]);
    setRequiredStart(null);
    setCurrentPlayer(0);
    setInput("");
    setError("");
    setSecondsLeft(TIMER_SECONDS);
    resetTimer();
  }

  return (
    <div className="w-full flex items-center justify-center sm:p-4">
      <div className="w-full max-w-3xl shadow-2xl rounded-2xl sm:p-6 p-3">
        <header className="flex items-center justify-between gap-2 mb-6">
          <h1 className="text-2xl font-bold">
            English Shiritori (Word game)
          </h1>
          <button
            className="cursor-pointer px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
            onClick={handleResetGame}
          >
            Reset
          </button>
        </header>

        <section className="grid grid-cols-2 gap-3 mb-4">
          {players.map((name, i) => (
            <PlayerCard
              key={i}
              name={name}
              score={scores[i]}
              isCurrent={currentPlayer === i}
            />
          ))}
        </section>

        <TimerDisplay secondsLeft={secondsLeft} requiredStart={requiredStart} />

        <WordInput
          playerName={players[currentPlayer]}
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          error={error}
          loading={loading}
          words={words}
          word
        />

        <WordHistory words={words} />

        <RulesFooter />
      </div>
    </div>
  );
}
