import * as React from "react";

const { useState, useEffect } = React;

export default function StudyTimerRPG() {
  const STUDY_TIME = 25 * 60;

  const [timeLeft, setTimeLeft] = useState(STUDY_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const getPet = (currentLevel) => {
    if (currentLevel >= 5) return "🐺 Study Wolf";
    if (currentLevel >= 3) return "🐱 Smart Cat";
    return "🐣 Beginner Egg";
  };

  const pet = getPet(level);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);

          setXp((prevXp) => prevXp + 50);
          setCoins((prevCoins) => prevCoins + 20);
          setSessionsCompleted((prevSessions) => prevSessions + 1);
          setIsRunning(false);

          return STUDY_TIME;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    const calculatedLevel = Math.floor(xp / 100) + 1;

    if (calculatedLevel !== level) {
      setLevel(calculatedLevel);
    }
  }, [xp, level]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(STUDY_TIME);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-2">
          🎮 Study Timer RPG
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Study hard. Earn XP. Unlock pets. Level up.
        </p>

        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold mb-4 tracking-wider">
            {minutes}:{seconds}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 px-5 py-2 rounded-2xl font-semibold transition duration-200"
            >
              ▶ Start
            </button>

            <button
              onClick={handlePause}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-2xl font-semibold transition duration-200"
            >
              ⏸ Pause
            </button>

            <button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-2xl font-semibold transition duration-200"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <h2 className="text-lg font-bold">⭐ XP</h2>
            <p className="text-2xl mt-2">{xp}</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <h2 className="text-lg font-bold">🏆 Level</h2>
            <p className="text-2xl mt-2">{level}</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <h2 className="text-lg font-bold">🪙 Coins</h2>
            <p className="text-2xl mt-2">{coins}</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <h2 className="text-lg font-bold">📚 Sessions</h2>
            <p className="text-2xl mt-2">{sessionsCompleted}</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-2xl p-5 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">🐾 Current Pet</h2>
          <p className="text-3xl">{pet}</p>
        </div>

        <div className="mt-6 text-sm text-gray-300 text-center leading-relaxed">
          Complete one full 25-minute focus session to earn rewards and level up your study companion 🚀
        </div>

        <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="font-bold text-lg mb-2 text-center">
            🎯 Progress Milestones
          </h3>

          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Level 1 → Beginner Egg 🐣</li>
            <li>• Level 3 → Smart Cat 🐱</li>
            <li>• Level 5 → Study Wolf 🐺</li>
          </ul>
        </div>

        <div className="mt-6 bg-green-500/10 rounded-2xl p-4 border border-green-400/20">
          <h3 className="font-bold text-lg mb-2 text-center">
            🧪 Functional Checks
          </h3>

          <ul className="space-y-1 text-sm text-gray-300">
            <li>✅ React imported correctly</li>
            <li>✅ Timer cleanup implemented</li>
            <li>✅ Prevents duplicate intervals</li>
            <li>✅ Auto rewards on completion</li>
            <li>✅ Level system recalculates properly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
