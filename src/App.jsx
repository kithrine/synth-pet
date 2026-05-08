import { useEffect, useMemo, useState } from 'react';

const MAX_STAT = 100;
const MIN_STAT = 0;

const moodConfig = {
  happy: {
    label: 'Happy',
    message: 'Neon purrs detected',
    aura: 'from-neonCyan/30 via-neonPink/20 to-neonPurple/30',
  },
  sleepy: {
    label: 'Sleepy',
    message: 'Dreaming in bitcrush',
    aura: 'from-neonPurple/30 via-slate-500/20 to-neonCyan/20',
  },
  hungry: {
    label: 'Hungry',
    message: 'Snack protocol low',
    aura: 'from-neonPink/35 via-orange-400/20 to-neonPurple/25',
  },
  sad: {
    label: 'Sad',
    message: 'Needs tiny attention',
    aura: 'from-blue-500/30 via-neonPurple/20 to-neonPink/20',
  },
};

const PETS = [
  {
    id: 'citrine-fox',
    name: 'Citrine Fox',
    evolvedName: 'Neon Vulpix',
    className: 'pet-fox',
    pixels: [
      '...KKK....KKK...',
      '..KOOOK..KOOOK..',
      '..KOOOKKKKOOOK..',
      '.KOOOWWWWWOOOK..',
      '.KOOOWWWWWOOOK..',
      'KOOOWWWWWWWOOKK.',
      'KOOOWWWWWWWOKOOK',
      'KOOOWWWWWWWOOKWK',
      '.KOOOWWWWWOOKWWK',
      '.KOOOOWWWOOOKWK.',
      '..KOOOOOOOOOOKK.',
      '..KOOOWWWOOOK...',
      '...KOOOWOOOK....',
      '...KOOKKKOOK....',
      '..KKK.....KKK...',
      '................',
    ],
    evolvedPixels: [
      '..KKK....KKK....',
      '.KOCOK..KOCOK...',
      'KOOOCKKKKCOOOK..',
      'KOOOWWWWWOOOCK..',
      'KOOOWCWCWOOOCKK.',
      'KOOOWWWWWWWOKOOK',
      'KOOOWWWWWWWOOKWK',
      'KOOOWWWWWWWOCKWK',
      '.KOOOWWWWWOOKCWK',
      '.KCOOOWWWOOOKWK.',
      '..KOOOOOOOOOKKK.',
      '..KOOOCWCOOOK...',
      '.KCKOOOWOOOKC...',
      'KCCKOOKKKOOK....',
      '.KKK.....KKK....',
      '................',
    ],
  },
  {
    id: 'moon-panda',
    name: 'Moon Panda',
    evolvedName: 'Orbit Panda',
    className: 'pet-panda',
    pixels: [
      '...KK......KK...',
      '..KBBK....KBBK..',
      '.KBBBBKKKKBBBBK.',
      '.KBBWWWWWWWWBBK.',
      'KBBWWWWWWWWWWBBK',
      'KBWWWWWWWWWWWWBK',
      'KBWWWWWWWWWWWWBK',
      'KBBWWWWWWWWWWBBK',
      '.KBBWWWWWWWWBBK.',
      '.KBBBWWWWWWBBBK.',
      '..KBBWWWWWWBBK..',
      '..KBBWWWWWWBBK..',
      '...KBBWWWWBBK...',
      '...KBBKKKKBBK...',
      '..KKK......KKK..',
      '................',
    ],
    evolvedPixels: [
      '..CKK......KKC..',
      '.CKBBK....KBBKC.',
      'KBBBBKKKKKKBBBBK',
      'KBBWWCWWCWWWBBK.',
      'KBBWWWWWWWWWWBBK',
      'KBWWWWWWWWWWWWBK',
      'KBWWCWWWWWWCWWBK',
      'KBBWWWWWWWWWWBBK',
      '.KBBWWWWWWWWBBK.',
      '.KBBBCWWWWCBBBK.',
      '..KBBWWWWWWBBK..',
      '.CKBBWWWWWWBBKC.',
      '..CKBBWWWWBBKC..',
      '...KBBKKKKBBK...',
      '..KKK......KKK..',
      '................',
    ],
  },
  {
    id: 'bubble-bunny',
    name: 'Bubble Bunny',
    evolvedName: 'Laser Bunny',
    className: 'pet-bunny',
    pixels: [
      '..KKK......KKK..',
      '.KWWPK....KPWWK.',
      '.KWWPK....KPWWK.',
      '..KWWK....KWWK..',
      '..KWWKKKKKKWWK..',
      '.KWWWWWWWWWWWWK.',
      'KWWWWWWWWWWWWWWK',
      'KWWWWWWWWWWWWWWK',
      'KWWWWWWWWWWWWWWK',
      '.KWWWWWWWWWWWWK.',
      '..KWWWWWWWWWWK..',
      '..KWWWWWWWWWWK..',
      '...KWWWWWWWWK...',
      '...KWWPKKPWWK...',
      '..KKK......KKK..',
      '................',
    ],
    evolvedPixels: [
      '.CKKK......KKKC.',
      'KWWPK....KPWWPK.',
      'KWWPK....KPWWPK.',
      '.KWWKC..CKWWK...',
      '.CKWWKKKKWWKC...',
      'KWWWWCWWCWWWWK..',
      'KWWWWWWWWWWWWWWK',
      'KWWCWWWWWWWWCWWK',
      'KWWWWWWWWWWWWWWK',
      '.KWWWWCWWCWWWWK.',
      '.CKWWWWWWWWWWKC.',
      '..KWWWWWWWWWWK..',
      '..CKWWWWWWWWKC..',
      '..KWWPKKKPWWK...',
      '.KKK......KKK...',
      '................',
    ],
  },
  {
    id: 'berry-bear',
    name: 'Berry Bear',
    evolvedName: 'Chrome Bear',
    className: 'pet-bear',
    pixels: [
      '..KKK......KKK..',
      '.KPPPK....KPPPK.',
      '.KPPPKKKKKKPPPK.',
      'KPPPPYYYYYYPPPPK',
      'KPPYYYYYYYYYYPPK',
      'KPYYYYYYYYYYYYPK',
      'KPYYYYYYYYYYYYPK',
      'KPYYYYYYYYYYYYPK',
      'KPPYYYYYYYYYYPPK',
      '.KPPYYYYYYYYPPK.',
      '..KPPYYYYYYPPK..',
      '..KPPYYYYYYPPK..',
      '...KPPYYYYPPK...',
      '...KPPKKKKPPK...',
      '..KKK......KKK..',
      '................',
    ],
    evolvedPixels: [
      '.CKKK......KKKC.',
      'KPPPK....KPPPK..',
      'KPPPKKKKKKPPPK..',
      'KPPPCYYYYYCPPPK.',
      'KPPYYYYYYYYYYPPK',
      'KPYYYCYYYYCYYYPK',
      'KPYYYYYYYYYYYYPK',
      'KPYYYCYYYYCYYYPK',
      'KPPYYYYYYYYYYPPK',
      '.KPPYCYYYYCYPPK.',
      '.CKPPYYYYYYPPKC.',
      '..KPPYYYYYYPPK..',
      '..CKPPYYYYPPKC..',
      '..KPPKKKKKKPPK..',
      '.KKK......KKK...',
      '................',
    ],
  },
];

const EGG_PIXELS = [
  '................',
  '......KKKK......',
  '....KKPPPPKK....',
  '...KPPPPPPPPK...',
  '..KPPPPBBPPPPK..',
  '.KPPPPBBBBPPPPK.',
  '.KPPBPPPPBBPPPK.',
  'KPPBBCCCCBBPPPPK',
  'KPPCCCCCCCCPPPPK',
  'KPPCCCCYYCCPPPPK',
  '.KPPCCYYYYCCPPK.',
  '.KPPCCCCCCCCPPK.',
  '..KPPPCCCCPPPK..',
  '...KPPPPPPPPK...',
  '....KKPPPPKK....',
  '......KKKK......',
];

const reactionConfig = {
  pet: {
    label: 'LIKE',
    symbol: 'heart',
    className: 'reaction-heart',
    message: 'Soft pixel pets!',
  },
  feed: {
    label: 'YUM!',
    symbol: 'lollipop',
    className: 'reaction-snack',
    message: 'Snack upload complete!',
  },
  play: {
    label: 'WOW',
    symbol: 'spark',
    className: 'reaction-spark',
    message: 'Arcade zoomies!',
  },
  sleep: {
    label: 'ZZZ',
    symbol: 'zzz',
    className: 'reaction-sleep',
    message: 'Power nap engaged',
  },
  evolve: {
    label: 'EVOLVE',
    symbol: 'spark',
    className: 'reaction-spark',
    message: 'New neon form unlocked!',
  },
};

const ICON_PIXELS = {
  heart: [
    '.KK..KK.',
    'KPPKKPPK',
    'KPPPPPPK',
    'KPPPPPPK',
    '.KPPPPK.',
    '..KPPK..',
    '...KK...',
    '........',
  ],
  lollipop: [
    '..KKKK..',
    '.KPPYYK.',
    'KPPYYPPK',
    'KPYYPPYK',
    'KYYPPYYK',
    '.KYYYYK.',
    '..KKKK..',
    '...K....',
    '...K....',
    '...K....',
    '...K....',
    '...K....',
  ],
  ball: [
    '..KKKK..',
    '.KGGGGK.',
    'KGGWWGGK',
    'KGWGGWGK',
    'KGWGGWGK',
    'KGGWWGGK',
    '.KGGGGK.',
    '..KKKK..',
  ],
  moon: [
    'C...KKK.',
    '..KYYYYK',
    '.KYYYYK.',
    '.KYYYK.C',
    '.KYYYK..',
    '..KYYYYK',
    'C..KYYK.',
    '....KK..',
  ],
  spark: [
    '...K....',
    '..KYK...',
    '.KYYYK..',
    'KYYYYYK.',
    '.KYYYK..',
    '..KYK...',
    '...K....',
    '........',
  ],
  zzz: [
    'KKKK.KK.',
    '...K..K.',
    '..K..K..',
    '.K..KKK.',
    'KKKK....',
    '........',
    '...KK...',
    '....K...',
  ],
};

function clampStat(value) {
  return Math.min(MAX_STAT, Math.max(MIN_STAT, value));
}

function getRandomPetId() {
  return PETS[Math.floor(Math.random() * PETS.length)].id;
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

function SpriteGrid({ rows, className = '' }) {
  const pixels = rows.flatMap((row, rowIndex) =>
    [...row].map((value, columnIndex) => ({
      value,
      id: `${rowIndex}-${columnIndex}`,
      row: rowIndex + 1,
      column: columnIndex + 1,
    })),
  );

  return (
    <div className={`pet-sprite ${className}`}>
      {pixels.map((pixel) =>
        pixel.value === '.' ? null : (
          <span
            key={pixel.id}
            className={`sprite-pixel pixel-${pixel.value}`}
            style={{ gridColumn: pixel.column, gridRow: pixel.row }}
          />
        ),
      )}
    </div>
  );
}

function PixelIcon({ rows, className = '' }) {
  const columnCount = rows[0]?.length ?? 8;
  const pixels = rows.flatMap((row, rowIndex) =>
    [...row].map((value, columnIndex) => ({
      value,
      id: `${rowIndex}-${columnIndex}`,
      row: rowIndex + 1,
      column: columnIndex + 1,
    })),
  );

  return (
    <span
      className={`mini-sprite ${className}`}
      style={{ '--icon-cols': columnCount, '--icon-rows': rows.length }}
    >
      {pixels.map((pixel) =>
        pixel.value === '.' ? null : (
          <span
            key={pixel.id}
            className={`mini-pixel pixel-${pixel.value}`}
            style={{ gridColumn: pixel.column, gridRow: pixel.row }}
          />
        ),
      )}
    </span>
  );
}

function PixelEgg({ onHatch }) {
  return (
    <div className="pet-float relative mx-auto grid h-56 w-56 place-items-center sm:h-64 sm:w-64">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neonPink/30 via-neonPurple/25 to-neonCyan/30 blur-2xl" />
      <button type="button" className="pixel-egg" onClick={onHatch} aria-label="Click to hatch the egg">
        <SpriteGrid rows={EGG_PIXELS} className="egg-sprite" />
        <div className="pet-shadow" />
      </button>
    </div>
  );
}

function PetFace({ mood }) {
  return (
    <div className={`pet-face-layer pet-face-layer--${mood}`}>
      <span className="face-pixel face-eye face-eye-left" />
      <span className="face-pixel face-eye face-eye-right" />
      <span className="face-pixel face-blush face-blush-left" />
      <span className="face-pixel face-blush face-blush-right" />
      <span className="face-pixel face-nose" />
      <span className="face-mouth" />
    </div>
  );
}

function PixelReaction({ reaction }) {
  if (!reaction) return null;

  const config = reactionConfig[reaction.kind];

  return (
    <div key={reaction.id} className={`pixel-reaction ${config.className}`} aria-live="polite">
      <div className="reaction-bubble">
        <span className="reaction-label">{config.label}</span>
        <span className="reaction-icon-cluster">
          <span className={`reaction-icon reaction-icon--${config.symbol}`}>
            <PixelIcon rows={ICON_PIXELS[config.symbol]} />
          </span>
          {reaction.kind === 'play' && (
            <span className={`reaction-icon reaction-icon--${config.symbol}`}>
              <PixelIcon rows={ICON_PIXELS[config.symbol]} />
            </span>
          )}
          {reaction.kind === 'play' && (
            <span className="reaction-icon reaction-icon--spark">
              <PixelIcon rows={ICON_PIXELS.spark} />
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function PixelPet({ pet, mood, reaction, onPet, interactive = false, evolved = false, evolving = false }) {
  const spriteRows = evolved ? pet.evolvedPixels : pet.pixels;
  const shellClass = [
    'pixel-pet',
    pet.className,
    evolved ? 'pixel-pet--evolved' : '',
    evolving ? 'pixel-pet--evolving' : '',
    `pixel-pet--${mood}`,
    reaction ? `pixel-pet--react-${reaction.kind}` : '',
  ].join(' ');

  const petSprite = (
    <>
      <div className="pet-art relative h-full w-full">
        <SpriteGrid rows={spriteRows} />
        <PetFace mood={mood} />
        {(mood === 'sleepy' || reaction?.kind === 'sleep') && <div className="sleep-bubble">Z</div>}
        <PixelReaction reaction={reaction} />
      </div>
      <div className="pet-shadow" />
    </>
  );

  return (
    <div className="pet-float relative mx-auto grid h-56 w-56 place-items-center sm:h-64 sm:w-64">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${moodConfig[mood].aura} blur-2xl`} />
      {interactive ? (
        <button type="button" className={`${shellClass} pixel-pet-button`} onClick={onPet} aria-label={`Pet ${pet.name}`}>
          {petSprite}
        </button>
      ) : (
        <div className={shellClass} aria-label={`${pet.name}, ${moodConfig[mood].label}`}>
          {petSprite}
        </div>
      )}
    </div>
  );
}

function EvolutionSequence({ pet }) {
  return (
    <div className="evolution-stage" aria-live="assertive">
      <div className="evolution-flash" />
      <div className="evolution-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="evolution-title">EVOLUTION</p>
      <p className="evolution-subtitle">{pet.evolvedName} incoming</p>
      <PixelPet pet={pet} mood="happy" evolved evolving />
      <p className="evolution-copy">Neon genome rewriting...</p>
    </div>
  );
}

function App() {
  const [lifeStage, setLifeStage] = useState('egg');
  const [activePetId, setActivePetId] = useState(null);
  const [petName, setPetName] = useState('');
  const [nameDraft, setNameDraft] = useState('');
  const [reaction, setReaction] = useState(null);
  const [feedCount, setFeedCount] = useState(0);
  const [hasEvolved, setHasEvolved] = useState(false);
  const [stats, setStats] = useState({
    hunger: 74,
    energy: 68,
    happiness: 82,
  });

  const activePet = useMemo(
    () => PETS.find((pet) => pet.id === activePetId) ?? PETS[0],
    [activePetId],
  );

  const mood = useMemo(() => {
    if (stats.hunger < 32) return 'hungry';
    if (stats.energy < 30) return 'sleepy';
    if (stats.happiness < 35 || (stats.hunger < 45 && stats.energy < 45)) return 'sad';
    return 'happy';
  }, [stats]);

  useEffect(() => {
    const decayTimer = window.setInterval(() => {
      if (lifeStage !== 'pet') return;

      setStats((current) => ({
        // Hunger represents fullness here, so it drifts downward over time.
        hunger: clampStat(current.hunger - 4),
        energy: clampStat(current.energy - 3),
        happiness: clampStat(current.happiness - 2),
      }));
    }, 3500);

    return () => window.clearInterval(decayTimer);
  }, [lifeStage]);

  useEffect(() => {
    if (feedCount < 5 || hasEvolved || lifeStage !== 'pet') return undefined;

    setLifeStage('evolving');
    setReaction(null);

    const evolutionTimer = window.setTimeout(() => {
      setHasEvolved(true);
      setLifeStage('pet');
      setReaction({ kind: 'evolve', id: Date.now() });
    }, 3400);

    return () => window.clearTimeout(evolutionTimer);
  }, [feedCount, hasEvolved]);

  useEffect(() => {
    if (!reaction) return undefined;

    const reactionTimer = window.setTimeout(() => {
      setReaction(null);
    }, 2200);

    return () => window.clearTimeout(reactionTimer);
  }, [reaction]);

  function hatchEgg() {
    setActivePetId(getRandomPetId());
    setLifeStage('naming');
  }

  function submitPetName(event) {
    event.preventDefault();
    const cleanName = nameDraft.trim();

    if (!cleanName) return;

    setPetName(cleanName);
    setReaction({ kind: 'pet', id: Date.now() });
    setLifeStage('pet');
  }

  function triggerInteraction(kind, changes) {
    if (lifeStage !== 'pet') return;

    setStats((current) => ({
      hunger: clampStat(current.hunger + (changes.hunger ?? 0)),
      energy: clampStat(current.energy + (changes.energy ?? 0)),
      happiness: clampStat(current.happiness + (changes.happiness ?? 0)),
    }));
    setReaction({ kind, id: Date.now() });

    if (kind === 'feed' && !hasEvolved) {
      setFeedCount((current) => current + 1);
    }
  }

  function petThePet() {
    triggerInteraction('pet', { happiness: 8, energy: 1 });
  }

  const actions = [
    {
      label: 'Feed',
      iconRows: ICON_PIXELS.lollipop,
      iconClassName: 'action-pixel-icon--lollipop',
      glow: 'shadow-neonPink hover:border-neonPink',
      onClick: () => triggerInteraction('feed', { hunger: 22, happiness: 4, energy: -4 }),
    },
    {
      label: 'Play',
      iconRows: ICON_PIXELS.ball,
      glow: 'shadow-neonCyan hover:border-neonCyan',
      onClick: () => triggerInteraction('play', { happiness: 18, energy: -12, hunger: -7 }),
    },
    {
      label: 'Sleep',
      iconRows: ICON_PIXELS.moon,
      glow: 'shadow-neonPurple hover:border-neonPurple',
      onClick: () => triggerInteraction('sleep', { energy: 26, hunger: -6, happiness: 3 }),
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-night px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="starfield pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
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
            {lifeStage === 'egg' && (
              <>
                <div className="mb-4 rounded-full border border-neonCyan/50 bg-black/40 px-4 py-2 font-pixel text-[0.62rem] text-neonCyan shadow-neonCyan">
                  Incubating
                </div>
                <PixelEgg onHatch={hatchEgg} />
                <p className="mt-5 text-center font-pixel text-[0.65rem] leading-6 text-pink-100 drop-shadow-[0_0_8px_rgba(255,61,242,0.75)]">
                  Click on the egg to hatch it
                </p>
              </>
            )}

            {lifeStage === 'naming' && (
              <>
                <div className="mb-4 rounded-full border border-neonPink/50 bg-black/40 px-4 py-2 font-pixel text-[0.62rem] text-neonPink shadow-neonPink">
                  You hatched a {activePet.name}!
                </div>
                <PixelPet pet={activePet} mood="happy" />
                <form className="name-form mt-5 w-full max-w-sm" onSubmit={submitPetName}>
                  <label className="block text-center font-pixel text-[0.62rem] leading-6 text-cyan-100" htmlFor="pet-name">
                    Name your pet
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="pet-name"
                      className="name-input"
                      value={nameDraft}
                      onChange={(event) => setNameDraft(event.target.value)}
                      maxLength={16}
                      autoComplete="off"
                      autoFocus
                    />
                    <button type="submit" className="name-submit">
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}

            {lifeStage === 'pet' && (
              <>
                <div className="mb-4 text-center">
                  <p className="font-pixel text-xl leading-8 text-white drop-shadow-[0_0_14px_rgba(255,61,242,0.9)]">
                    {petName}
                  </p>
                  <p className="mt-2 rounded-full border border-neonCyan/50 bg-black/40 px-4 py-2 font-pixel text-[0.62rem] text-neonCyan shadow-neonCyan">
                    {hasEvolved ? activePet.evolvedName : activePet.name} / {moodConfig[mood].label}
                  </p>
                </div>
                <PixelPet pet={activePet} mood={mood} reaction={reaction} onPet={petThePet} interactive evolved={hasEvolved} />
                <p className="mt-5 text-center font-pixel text-[0.65rem] leading-6 text-pink-100 drop-shadow-[0_0_8px_rgba(255,61,242,0.75)]">
                  {reaction ? reactionConfig[reaction.kind].message : moodConfig[mood].message}
                </p>
              </>
            )}

            {lifeStage === 'evolving' && <EvolutionSequence pet={activePet} />}
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

              <div className="evolution-meter mt-6">
                <div className="flex items-center justify-between text-[0.55rem] text-purple-100">
                  <span>Evolution</span>
                  <span>{hasEvolved ? 'Complete' : `${Math.min(feedCount, 5)}/5 feeds`}</span>
                </div>
                <div className="evolution-track">
                  <div
                    className="evolution-fill"
                    style={{ width: `${hasEvolved ? 100 : Math.min(feedCount, 5) * 20}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  disabled={lifeStage !== 'pet'}
                  className={`action-button ${action.glow}`}
                >
                  <span className="action-icon-stage">
                    <PixelIcon rows={action.iconRows} className={`action-pixel-icon ${action.iconClassName ?? ''}`} />
                  </span>
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
