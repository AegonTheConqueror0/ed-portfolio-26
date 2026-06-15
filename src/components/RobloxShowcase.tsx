import { useState, useEffect, useRef } from "react";
import { ROBLOX_GAMES } from "../data";
import { RobloxGame } from "../types";
import { Gamepad2, Code2, Terminal, Play, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RobloxShowcase() {
  const [selectedGame, setSelectedGame] = useState<RobloxGame>(ROBLOX_GAMES[0]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Game simulation state total
  const [combatPoints, setCombatPoints] = useState(0);
  const [activeBugs, setActiveBugs] = useState<{ id: number; name: string; hp: number; maxHp: number }[]>([
    { id: 1, name: "InfiniteLoopBug", hp: 100, maxHp: 100 },
    { id: 2, name: "MemoryLeakService", hp: 150, maxHp: 150 },
    { id: 3, name: "ThreadDesyncWarning", hp: 80, maxHp: 80 },
  ]);
  const [selectedAction, setSelectedAction] = useState<string>("Spawn Pulis Duty Uniform");

  const runLuauScript = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs([]);

    const logLines = [
      `[ROBLOX ENGINE] Booting thread for game: "${selectedGame.title}"...`,
      `[STUDIO LOG] Loading framework and system state...`,
      `[LUAU COMPILE] Optimizing script bytecode (Level 2 compiler)...`,
      `[NETWORK] Replicating client-server remote events across network layers...`,
      ...selectedGame.id === "game1" 
        ? [
            `[DUTY ENGINE] Spawning player team: "Pulis_Officer"`,
            `[STUDIO LOG] Replicating custom uniform rig models inside ServerStorage...`,
            `[DUTY ENGINE] Equipped official custom duty gear successfully. Status: Patrol.`
          ]
        : [
            `[MANSION CORE] Instantiating mansion rooms and placing props...`,
            `[SPAWNER] Randomizing key spawn point location: "Library_Desk_02"`,
            `[STUDIO LOG] Replicating first-person camera limits & flashlights on player load.`,
            `[SURVIVAL ENGINE] Core game loop started: Relentless Creature spawned.`
          ],
      `[ROBLOX ENGINE] Luau Thread completed successfully inside 23ms. Memory usage: 0.12MB`
    ];

    let currentLine = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (currentLine < logLines.length) {
        const line = logLines[currentLine];
        if (line !== undefined) {
          setTerminalLogs(prev => [...prev, line]);
        }
        currentLine++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsRunning(false);
      }
    }, 450);
  };

  const handleApplyLuaSpell = () => {
    if (activeBugs.length === 0) return;
    
    // Attack the first bug is standard
    setActiveBugs(prev => {
      const copy = [...prev];
      const target = copy[0];
      if (!target) return prev;
      const damage = selectedAction === "Spawn Pulis Duty Uniform" ? 40 : selectedAction === "Report to Police Station" ? 60 : 100;
      
      target.hp = Math.max(0, target.hp - damage);
      
      // Print console output simulation
      setTerminalLogs(logs => [
        ...logs,
        `[COMBAT ENGINE] Instantiated Spell Combat: "${selectedAction}" targeting "${target.name}". Handled damage: -${damage}`
      ]);
      
      if (target.hp <= 0) {
        setTerminalLogs(logs => [
          ...logs,
          `[SUCCESS] Defeated "${target.name}". Heap structures garbage collected.`
        ]);
        setCombatPoints(pts => pts + 100);
        return copy.slice(1); // Remove it
      }
      return copy;
    });
  };

  const resetCombatZone = () => {
    setActiveBugs([
      { id: Date.now(), name: "InfiniteLoopBug", hp: 100, maxHp: 100 },
      { id: Date.now() + 1, name: "MemoryLeakService", hp: 150, maxHp: 150 },
      { id: Date.now() + 2, name: "ThreadDesyncWarning", hp: 80, maxHp: 80 },
    ]);
    setCombatPoints(0);
    setTerminalLogs(logs => [...logs, `[ENGINE] Reseeded combat target array.`]);
  };

  return (
    <div className="space-y-8" id="roblox-showcase-container">
      {/* Introduction Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0f] to-emerald-950/40 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-48 w-48 opacity-10 bg-radial-gradient"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            <Gamepad2 className="h-3 w-3 text-emerald-400 animate-pulse" />
            Metaverse Architecture
          </span>
          <h3 className="text-3xl font-light tracking-tight font-display text-white">
            Roblox Game <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Systems Engineering</span>
          </h3>
          <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
            Leading Luau OOP implementations with optimized network replication, custom roleplay duty state-machines, 
            first-person survival camera limits, and robust database storage. Managing active worlds with millions of collective sessions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-mono font-bold uppercase tracking-wider">
            <div className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-zinc-300">🛡️ DataStore v2</div>
            <div className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-zinc-300">⚡ Luau OOP Architecture</div>
            <div className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-zinc-300">📦 Spawner Systems</div>
            <div className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-zinc-300">📁 custom rigging</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Game catalog and interactive Studio tools */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Side: Game Catalog Index */}
        <div className="space-y-4 lg:col-span-5" id="roblox-games-list">
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-indigo-400" />
            Production Game Catalog
          </h4>
          <p className="text-zinc-400 text-xs text-left">Click a project below to load its Luau studio properties, source modules, and compile logs on the interactive IDE right side.</p>
          
          <div className="space-y-3">
            {ROBLOX_GAMES.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                  selectedGame.id === game.id
                    ? "bg-white/10 border-indigo-500/50 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
                id={`game-btn-${game.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-white text-sm">{game.title}</h5>
                  <span className="shrink-0 rounded px-2.5 py-0.5 bg-white/5 border border-white/10 text-[9px] font-bold text-rose-400 uppercase tracking-widest">
                    {game.plays} Plays
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">{game.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {game.techStacked.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="bg-[#050508] text-zinc-400 px-2 py-0.5 rounded text-[10px] font-mono border border-white/5">
                      {tag}
                    </span>
                  ))}
                  {game.techStacked.length > 3 && (
                    <span className="text-zinc-500 px-1 py-0.5 text-[9px]">+{game.techStacked.length - 3}</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active Gameplay Environment Visualizer */}
          <div className="rounded-2xl border border-white/10 bg-[#07070a] p-5 shadow-2xl mt-4" id="gameplay-visualizer">
            <h5 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3.5 flex items-center justify-between">
              <span>Active Environment Showcase</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE REPLICATION FEED
              </span>
            </h5>
            {selectedGame.visualThumbnailUrl && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-inner group">
                <img
                  src={selectedGame.visualThumbnailUrl}
                  alt={`${selectedGame.title} simulation`}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full transform hover:scale-[1.03] transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-widest mb-1 block">ROBLOX ENGINE SIMULATOR</span>
                  <p className="text-xs font-semibold text-white leading-normal font-sans">{selectedGame.title}</p>
                </div>
              </div>
            )}
            <div className="mt-3.5 bg-black/40 p-4 rounded-xl border border-white/5 text-[11px] leading-relaxed text-zinc-400 text-left">
              <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase mb-1.5 tracking-wider">GAMEPLAY INSTRUCTIONS FOR REPLICATING</span>
              <p className="leading-relaxed font-sans">{selectedGame.gamePlayInstructions}</p>
            </div>

            {selectedGame.url && (
              <a
                href={selectedGame.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 border border-white/10 font-sans shadow-lg shadow-indigo-650/20 group cursor-pointer text-center"
                id={`play-roblox-btn-${selectedGame.id}`}
              >
                <span>Play Game on Roblox</span>
                <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white/95" />
              </a>
            )}
          </div>
        </div>

        {/* Right Side: IDE & Terminal Output Suite */}
        <div className="lg:col-span-7 flex flex-col space-y-6" id="roblox-interactive-studio">
          
          {/* Section: Luau Source IDE */}
          <div className="rounded-2xl border border-white/10 bg-[#07070a] shadow-2xl overflow-hidden">
            
            {/* IDE Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/40"></span>
                </div>
                <span className="text-zinc-350 font-mono flex items-center gap-1.5 ml-2">
                  <Code2 className="h-3.5 w-3.5 text-indigo-400" />
                  {selectedGame.id === "game1" ? "DutyManager.lua" : "MansionSurvival.lua"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded bg-white/5 border border-white/10 text-[9px] text-emerald-400 px-20 px-2 py-0.5 font-bold uppercase tracking-widest">
                  strict check
                </span>
              </div>
            </div>

            {/* IDE Workspace (Read only) */}
            <div className="p-4 bg-black/60 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed border-b border-white/10 max-h-52 overflow-y-auto">
              <pre className="whitespace-pre">
                {selectedGame.luaSnippet.split("\n").map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell pr-4 text-zinc-600 text-right select-none w-5">{idx + 1}</span>
                    <span className="table-cell text-zinc-300">{line}</span>
                  </div>
                ))}
              </pre>
            </div>

            {/* Micro IDE Controls */}
            <div className="p-3 bg-white/5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10">
              <div className="text-zinc-400 flex items-center gap-1">
                <p>Execute simulation sandbox vectors securely.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={runLuauScript}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-[11px] py-1.5 px-3.5 rounded-sm transition-all cursor-pointer disabled:bg-white/5 disabled:text-zinc-500"
                  id="run-luau-btn"
                >
                  {isRunning ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border border-black border-t-transparent"></div>
                      Compiling...
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 fill-current text-black" />
                      Run Luau Script
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulation Terminal Feed */}
            <div className="bg-[#030305] p-4 font-mono text-[11px] h-40 overflow-y-auto space-y-1 text-zinc-300">
              <div className="flex items-center gap-1.5 text-zinc-500 border-b border-white/5 pb-2 mb-2 text-[9px] font-bold uppercase tracking-wider">
                <Terminal className="h-3 w-3 text-indigo-400" />
                <span>STUDIO DIAGNOSTIC CONSOLE OUTPUT</span>
              </div>

              {terminalLogs.length === 0 ? (
                <div className="text-zinc-600 italic">Console idle. Hit "Run Luau Script" above to initiate Luau compilation state threads.</div>
              ) : (
                terminalLogs.map((log, index) => {
                  if (!log || typeof log !== "string") return null;
                  let textClass = "text-emerald-400";
                  let Icon = CheckCircle2;
                  if (log.includes("[TWEEN]") || log.includes("[STUDIO LOG]")) {
                    textClass = "text-zinc-300";
                    Icon = ChevronRight;
                  } else if (log.includes("[SECURITY]")) {
                    textClass = "text-indigo-400";
                    Icon = ShieldCheck;
                  } else if (log.includes("[ROBLOX ENGINE]") || log.includes("[LUAU COMPILE]")) {
                    textClass = "text-sky-400";
                    Icon = Terminal;
                  } else if (log.includes("[COMBAT ENGINE]")) {
                    textClass = "text-pink-400";
                    Icon = Play;
                  }
                  
                  return (
                    <div key={index} className="flex items-start gap-1.5 py-0.5 border-b border-white/5">
                      <Icon className={`h-3 w-3 shrink-0 mt-0.5 ${textClass}`} />
                      <span className={textClass}>{log}</span>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Interactive Roblox Combat Zone Mockup */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
              <div>
                <h5 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                  Luau OOP Runtime Challenge (Defense Arena)
                </h5>
                <p className="text-zinc-400 text-[11px]">Combat syntax memory leaks and loops using robust OOP parameters.</p>
              </div>
              <div className="text-left md:text-right">
                <span className="text-[9px] uppercase font-mono text-zinc-500 font-bold tracking-wider">SCORE RECORDED</span>
                <p className="font-mono text-emerald-400 font-bold text-sm tracking-wider">{combatPoints} PTS</p>
              </div>
            </div>

            {/* Bugs Arena */}
            {activeBugs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {activeBugs.map((bug) => (
                  <div key={bug.id} className="bg-black/40 rounded-xl p-3.5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="h-3 w-3 text-indigo-400 shrink-0" />
                        <span className="font-mono text-[10px] text-white font-bold truncate">{bug.name}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-1.5 transition-all duration-300"
                          style={{ width: `${(bug.hp / bug.maxHp) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between font-mono text-[9px] text-zinc-500 font-bold">
                      <span>HP: {bug.hp}/{bug.maxHp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center text-xs text-emerald-400 mb-4 font-mono">
                🚀 All syntactic bugs eradicated! Compile sequence completes perfectly without leaks. Excellent Luau structure.
              </div>
            )}

            {/* Attack Options & Controller */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Select Luau Module Action</label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="bg-[#050508] border border-white/10 rounded-sm text-xs p-2 focus:outline-none text-zinc-200 cursor-pointer min-w-[200px]"
                >
                  <option value="Spawn Pulis Duty Uniform">local Uniform = DutyManager:SpawnDutyGear()</option>
                  <option value="Report to Police Station">player:MoveTo(workspace.MunicipalStation)</option>
                  <option value="Check Town Datastores">BayanLifeDS:GetAsync(player.UserId)</option>
                </select>
              </div>

              <div className="flex gap-2 self-end sm:self-center">
                <button
                  onClick={handleApplyLuaSpell}
                  disabled={activeBugs.length === 0}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/5 disabled:text-zinc-600 text-black text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm cursor-pointer transition-all"
                  id="cast-spell-btn"
                >
                  Instantiate Method
                </button>
                <button
                  onClick={resetCombatZone}
                  className="flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-zinc-300 text-xs font-semibold p-2.5 rounded-sm cursor-pointer"
                  title="Reset Arena"
                  id="reset-combat-btn"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
