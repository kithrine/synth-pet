import { useEffect, useMemo, useState } from 'react';

const MAX_STAT = 100;
const MIN_STAT = 0;

const moodConfig = {
  happy: {
    label: 'Happy',
    face: '^  ^',
    message: 'Neon purrs detected',
    aura: 'from-neonCyan/30 via-neonPink/20 to-neonPurple/30',
  },
  sleepy: {
    label: 'Sleepy',
    face: '-  -',
    message: 'Dreaming in bitcrush',
    aura: 'from-neonPurple/30 via-slate-500/20 to-neonCyan/20',
  },
  hungry: {
    label: 'Hungry',
    face: 'o  o',
    message: 'Snack protocol low',
    aura: 'from-neonPink/35 via-orange-400/20 to-neonPurple/25',
  },
  sad: {
    label: 'Sad',
    face: ';  ;',
    message: 'Needs tiny attention',
    aura: 'from-blue-500/30 via-neonPurple/20 to-neonPink/20',
  },
};

function clampStat(value) {
  return Math.min(MAX_STAT, Math.max(MIN_STAT, value));
}

function StatBar({ label, value, color }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[0.63rem] text-cyan-100">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full border border-white/15 bg-black/50 shadow-inner shadow-black">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function PixelPet({ mood }) {
  const { face } = moodConfig[mood];

  return (
    <div className="pet-float relative mx-auto grid h-56 w-56 place-items-center sm:h-64 sm:w-64">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${moodConfig[mood].aura} blur-2xl`} />
      <div className={`pixel-pet pixel-pet--${mood}`} aria-label={`${moodConfig[mood].label} digital pet`}>
        <div className="pet-ear pet-ear-left" />
        <div className="pet-ear pet-ear-right" />
        <div className="pet-body">
          <div className="pet-screen-glint" />
          <div className="pet-eye pet-eye-left" />
          <div className="pet-eye pet-eye-right" />
          <div className="pet-face">{face}</div>
          <div className="pet-mouth" />
          {mood === 'sleepy' && <div className="sleep-bubble">Z</div>}
        </div>
        <div className="pet-shadow" />
      </div>
    </div>
  );
}

function App() {
  const [stats, setStats] = useState({
    hunger: 74,
    energy: 68,
    happiness: 82,
  });

  const mood = useMemo(() => {
    if (stats.hunger < 32) return 'hungry';
    if (stats.energy < 30) return 'sleepy';
    if (stats.happiness < 35 || (stats.hunger < 45 && stats.energy < 45)) return 'sad';
    return 'happy';
  }, [stats]);

  useEffect(() => {
    const decayTimer = window.setInterval(() => {
      setStats((current) => ({
        // Hunger represents fullness here, so it drifts downward over time.
        hunger: clampStat(current.hunger - 4),
        energy: clampStat(current.energy - 3),
        happiness: clampStat(current.happiness - 2),
      }));
    }, 3500);

    return () => window.clearInterval(decayTimer);
  }, []);

  function updateStats(changes) {
    setStats((current) => ({
      hunger: clampStat(current.hunger + (changes.hunger ?? 0)),
      energy: clampStat(current.energy + (changes.energy ?? 0)),
      happiness: clampStat(current.happiness + (changes.happiness ?? 0)),
    }));
  }

  const actions = [
    {
      label: 'Feed',
      icon: '++',
      glow: 'shadow-neonPink hover:border-neonPink',
      onClick: () => updateStats({ hunger: 22, happiness: 4, energy: -4 }),
    },
    {
      label: 'Play',
      icon: '!!',
      glow: 'shadow-neonCyan hover:border-neonCyan',
      onClick: () => updateStats({ happiness: 18, energy: -12, hunger: -7 }),
    },
    {
      label: 'Sleep',
      icon: 'zz',
      glow: 'shadow-neonPurple hover:border-neonPurple',
      onClick: () => updateStats({ energy: 26, hunger: -6, happiness: 3 }),
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-night px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="scanlines pointer-events-none absolute inset-0" />
      <div className="grid-horizon pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col justify-center gap-6">
        <header className="text-center">
          <p className="mb-3 font-pixel text-[0.62rem] uppercase tracking-[0.28em] text-neonCyan drop-shadow-[0_0_8px_rgba(32,247,255,0.85)]">
            Pocket Synth Unit 03
          </p>
          <h1 className="font-pixel text-3xl leading-tight text-white drop-shadow-[0_0_18px_rgba(255,61,242,0.8)] sm:text-5xl">
            Synth Pet
          </h1>
        </header>

        <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_340px]">
          <div className="retro-panel flex min-h-[28rem] flex-col items-center justify-center p-5 sm:p-8">
            <div className="mb-4 rounded-full border border-neonCyan/50 bg-black/40 px-4 py-2 font-pixel text-[0.62rem] text-neonCyan shadow-neonCyan">
              Mood: {moodConfig[mood].label}
            </div>
            <PixelPet mood={mood} />
            <p className="mt-5 text-center font-pixel text-[0.65rem] leading-6 text-pink-100 drop-shadow-[0_0_8px_rgba(255,61,242,0.75)]">
              {moodConfig[mood].message}
            </p>
          </div>

          <aside className="retro-panel flex flex-col justify-between gap-6 p-5 sm:p-6">
            <div>
              <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-4">
                <h2 className="font-pixel text-sm text-neonPink drop-shadow-[0_0_10px_rgba(255,61,242,0.8)]">
                  Vital Bits
                </h2>
                <span className="status-light" aria-label="online" />
              </div>

              <div className="space-y-5">
                <StatBar label="Fullness" value={stats.hunger} color="bg-gradient-to-r from-neonPink to-fuchsia-300 shadow-neonPink" />
                <StatBar label="Energy" value={stats.energy} color="bg-gradient-to-r from-neonPurple to-violet-300 shadow-neonPurple" />
                <StatBar label="Happy" value={stats.happiness} color="bg-gradient-to-r from-neonCyan to-sky-200 shadow-neonCyan" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className={`action-button ${action.glow}`}
                >
                  <span className="block text-base">{action.icon}</span>
                  <span className="block text-[0.58rem]">{action.label}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default App;
