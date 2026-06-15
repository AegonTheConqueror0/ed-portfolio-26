import { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Globe, 
  GraduationCap, 
  Presentation, 
  BookMarked, 
  Mail, 
  Github, 
  Users, 
  Award, 
  Briefcase, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  MapPin,
  Flame,
  CheckCircle,
  MessageSquareCode,
  Fingerprint,
  Loader2,
  Lock,
  Cpu
} from "lucide-react";

import { calculateCumulativeGPA } from "./data";

import RobloxShowcase from "./components/RobloxShowcase";
import FullStackShowcase from "./components/FullStackShowcase";
import AcademicShowcase from "./components/AcademicShowcase";
import FacultyShowcase from "./components/FacultyShowcase";
import LanguageShowcase from "./components/LanguageShowcase";
import ContactForm from "./components/ContactForm";
import CertificationsShowcase from "./components/CertificationsShowcase";

type ActiveTab = "overview" | "roblox" | "fullstack" | "academic" | "faculty" | "esp" | "contact" | "certifications";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  
  // Real-time page initialization/refresh loading parameters
  const [appInitializing, setAppInitializing] = useState(true);
  const [initProgress, setInitProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("Aligning system hardware handshakes...");

  const gpaInfo = calculateCumulativeGPA();

  useEffect(() => {
    // Elegant descriptive diagnostic list covering Edgardo's diverse IT and educational streams
    const loadingStatements = [
      "Establishing system diagnostics socket handshakes...",
      "Resolving virtual Holy Cross of Davao College department coordinates...",
      "Precompile check: Initializing Roblox Luau AST sandbox parses...",
      "Connecting database collections (PostgreSQL core nodes, Firebase clusters)...",
      "Syncing English for Specific Purposes language corpora metadata...",
      "Caching classroom ESP performance prediction wheels...",
      "Building unified systems portfolio dashboard... Ready."
    ];

    const progressTimer = setInterval(() => {
      setInitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setAppInitializing(false);
          }, 350);
          return 100;
        }

        // Beautiful randomized smooth increments
        const charge = Math.floor(Math.random() * 8) + 4;
        const net = Math.min(prev + charge, 100);

        // Map progress range to the loading statement index
        const index = Math.min(
          Math.floor((net / 100) * loadingStatements.length),
          loadingStatements.length - 1
        );
        const statement = loadingStatements[index];
        if (statement !== undefined) {
          setLoadingStep(statement);
        }

        return net;
      });
    }, 90);

    return () => clearInterval(progressTimer);
  }, []);

  // Resolve the avatar asset using Vite-friendly relative import
  const AVATAR_PATH = new URL("./assets/images/profile.jpg", import.meta.url).href;

  if (appInitializing) {
    return (
      <div className="min-h-screen bg-[#050508] text-[#e0e0e6] font-sans flex flex-col items-center justify-center relative overflow-hidden p-6" id="app-startup-loader">
        {/* Ambient atmospheric background glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-950/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        
        <div className="max-w-md w-full space-y-8 text-center z-10">
          
          {/* Circular diagnostic graphic */}
          <div className="relative mx-auto h-24 w-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-800 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-indigo-500/20 animate-pulse" />
            <div className="absolute inset-3.5 rounded-full border border-emerald-500/30" />
            <div className="absolute inset-5 bg-gradient-to-tr from-indigo-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Cpu className="h-5 w-5 text-zinc-100" />
            </div>
            {/* Spinning focal indicator */}
            <div className="absolute top-1 right-1 h-3 w-3 bg-emerald-400 rounded-full border border-black animate-ping" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono tracking-[0.25em] text-emerald-400 uppercase">
              RESTORING WORKSPACE CONTEXT
            </span>
            <h2 className="text-2xl font-light tracking-tight font-display text-white">
              Edgardo <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Rojas</span>
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono">
              Academic & Systems Engineering Portfolio v2.6
            </p>
          </div>

          {/* Progress bar container */}
          <div className="space-y-3">
            <div className="relative h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 p-px">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-white to-emerald-400 rounded-full transition-all duration-150 ease-out" 
                style={{ width: `${initProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="truncate max-w-[280px] text-left text-zinc-400 font-light">{loadingStep}</span>
              <span className="font-bold text-indigo-400 shrink-0">{initProgress}%</span>
            </div>
          </div>

        </div>

        {/* Safe footer marker */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] font-mono text-zinc-650 text-zinc-600">
          Handshake authorized via Holy Cross of Davao College
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-[#e0e0e6] font-sans selection:bg-indigo-950 selection:text-white relative overflow-x-hidden" id="portfolio-root">

      
      {/* Background Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-950/15 rounded-full blur-[120px] pointer-events-none flex-shrink-0"></div>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Modern Compact Masthead */}
        <header className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl" id="masthead-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            
            {/* Left: Avatar & Personal Info */}
            <div className="flex items-center gap-4.5">
              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 rounded-md bg-gradient-to-tr from-indigo-500 via-emerald-500 to-amber-500 opacity-60 blur-sm group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={AVATAR_PATH}
                  alt="Edgardo Rojas Profile"
                  referrerPolicy="no-referrer"
                  className="relative h-20 w-20 rounded-md border border-white/10 object-cover bg-neutral-900"
                  onError={(e) => {
                    // Fallback visual in case path resolution has environment mismatch
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "relative h-20 w-20 rounded-md border border-white/15 bg-gradient-to-br from-indigo-600 to-emerald-600 flex items-center justify-center font-display font-bold text-lg text-white";
                      fallback.innerText = "ER";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded px-2.5 py-0.5 bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-400">
                  Active Instructor & Systems Engineer
                </span>
                <h1 className="text-3xl font-light tracking-tight font-display text-white">
                  Edgardo <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Rojas</span>
                </h1>
                <p className="text-xs text-zinc-400 flex flex-wrap items-center gap-1.5 md:gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                    Holy Cross of Davao College
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-emerald-400 font-medium">MIT Graduate Student (UIC)</span>
                </p>
              </div>
            </div>

            {/* Right: Quick Channels & Call to Action */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <a
                  href="mailto:edgardo.rojas@hcdc.edu.ph"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors border-b border-dashed border-white/10 pb-0.5"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  edgardo.rojas@hcdc.edu.ph
                </a>
              </div>
              <button
                onClick={() => setActiveTab("contact")}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-emerald-500 text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-emerald-400 cursor-pointer transition-all shadow-md shadow-emerald-950/20"
                id="header-collab-btn"
              >
                Assemble Proposal
                <ChevronRight className="h-3.5 w-3.5 text-black" />
              </button>
            </div>

          </div>

          {/* Quick High-Level Cumulative Metrics Row */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Roblox Play count</span>
              <span className="text-lg font-bold text-rose-450 font-mono mt-0.5 block flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-rose-500 fill-current" />
                870K+ Total
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Web DB Integrations</span>
              <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">PostgreSQL Core</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5 col-span-2 md:col-span-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Academics GPA</span>
              <span className="text-lg font-bold text-indigo-400 font-mono mt-0.5 block font-sans">{gpaInfo.scoreString} / 4.00</span>
              <span className="text-[8px] text-[#818cf8] font-mono block leading-tight">({gpaInfo.takenCount} Taken of {gpaInfo.totalCount})</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Active Lectures</span>
              <div className="text-xs font-mono mt-0.5 space-y-0.5">
                <div className="font-bold text-amber-400">4 IT Faculty Courses</div>
                <div className="text-emerald-400 text-[10px]">Over 240 ESL Students</div>
              </div>
            </div>
          </div>
        </header>

        {/* Stateful Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar" id="primary-navigation-tabs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all ${
              activeTab === "overview" 
                ? "bg-white/10 border border-white/20 text-white font-bold" 
                : "text-zinc-400 hover:text-white"
            }`}
            id="tab-overview"
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("roblox")}
            className={`px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "roblox" 
                ? "bg-red-500/10 border border-red-500/30 text-rose-400 font-bold" 
                : "text-zinc-400 hover:text-rose-450"
            }`}
            id="tab-roblox"
          >
            <Gamepad2 className="h-3.5 w-3.5" />
            Roblox Systems
          </button>
          <button
            onClick={() => setActiveTab("fullstack")}
            className={`px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "fullstack" 
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold" 
                : "text-zinc-400 hover:text-emerald-450"
            }`}
            id="tab-fullstack"
          >
            <Globe className="h-3.5 w-3.5" />
            Full Stack Web
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "academic" 
                ? "bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold" 
                : "text-zinc-400 hover:text-indigo-450"
            }`}
            id="tab-academic"
          >
            <GraduationCap className="h-4 w-4" />
            Academic MIT
          </button>
          <button
            onClick={() => setActiveTab("faculty")}
            className={`px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "faculty" 
                ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold" 
                : "text-zinc-400 hover:text-amber-450"
            }`}
            id="tab-faculty"
          >
            <Presentation className="h-3.5 w-3.5" />
            IT Faculty
          </button>
          <button
            onClick={() => setActiveTab("esp")}
            className={`px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "esp" 
                ? "bg-teal-550/10 border border-teal-500/30 text-teal-400 font-bold" 
                : "text-zinc-400 hover:text-teal-450"
            }`}
            id="tab-esp"
          >
            <BookMarked className="h-3.5 w-3.5" />
            ESP Teaching
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "certifications" 
                ? "bg-indigo-550/10 border border-indigo-500/30 text-indigo-400 font-bold" 
                : "text-zinc-400 hover:text-indigo-455 hover:text-indigo-400"
            }`}
            id="tab-certifications"
          >
            <Award className="h-3.5 w-3.5" />
            Certifications
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all ml-auto border border-dashed ${
              activeTab === "contact" 
                ? "bg-[#0c1223] text-emerald-400 border-emerald-500/50 font-bold" 
                : "text-zinc-400 hover:text-white border-white/10"
            }`}
            id="tab-contact"
          >
            Propose Collab
          </button>
        </nav>

        {/* Dynamic Display Canvas wrapper with fading animate blocks */}
        <main className="min-h-[460px]" id="dynamic-content-viewport">
          
          {/* TAB 1: OVERVIEW BENTO HOME */}
          {activeTab === "overview" && (
            <div className="space-y-6" id="overview-tab-content">
              
              {/* Profile Bio summary text box */}
              <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 space-y-4">
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                  Bridging Virtual Worlds & Information Systems
                </span>
                <h2 className="text-xl font-light text-white flex items-center gap-2 font-display">
                  <Award className="h-5 w-5 text-indigo-400" />
                  Multifaceted Career Sync Overview
                </h2>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-justify">
                  Welcome to my portfolio! As an academic educator and systems engineer, I live at the intersection of complex systems development and specialized instructional pathways. Whether modeling client-server game state replication in <strong>Roblox (Luau)</strong>, structuring dynamic data engines using <strong>Google Firebase</strong>, analyzing micro-caching container performance in my <strong>MIT research</strong>, delivering technical lectures to undergraduate classes, or training Chinese students to speak English fluently and effectively in <strong>English for Specific Purposes (ESP)</strong> tracks—my goal is to empower users through pristine logic and systematic delivery.
                </p>
              </div>

              {/* Verified Credentials Portal Grid */}
              <div className="space-y-3.5" id="verified-credentials-highlights">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-indigo-400" />
                  Verified Credentials At A Glance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div 
                    onClick={() => setActiveTab("certifications")} 
                    className="p-4 bg-gradient-to-br from-rose-950/10 to-black/40 border border-white/10 hover:border-rose-500/30 transition-all rounded-xl cursor-pointer text-left group"
                  >
                    <span className="text-[8px] font-bold text-rose-450 uppercase tracking-widest block mb-1">ROBLOX REPLICATION</span>
                    <p className="text-xs font-semibold text-white truncate group-hover:text-rose-400 transition-colors">Luau Systems Architect</p>
                    <span className="text-[10px] text-zinc-500 block mt-1">Verified Credential</span>
                  </div>
                  <div 
                    onClick={() => setActiveTab("certifications")} 
                    className="p-4 bg-gradient-to-br from-emerald-950/10 to-black/40 border border-white/10 hover:border-emerald-500/30 transition-all rounded-xl cursor-pointer text-left group"
                  >
                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">DBMS ORM</span>
                    <p className="text-xs font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">PostgreSQL Core Specialist</p>
                    <span className="text-[10px] text-zinc-500 block mt-1">Verified Credential</span>
                  </div>
                  <div 
                    onClick={() => setActiveTab("certifications")} 
                    className="p-4 bg-gradient-to-br from-indigo-950/10 to-black/40 border border-white/10 hover:border-indigo-500/30 transition-all rounded-xl cursor-pointer text-left group"
                  >
                    <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">ACCELERATOR</span>
                    <p className="text-xs font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">ESP Teacher Accreditation</p>
                    <span className="text-[10px] text-zinc-500 block mt-1">Verified Credential</span>
                  </div>
                  <div 
                    onClick={() => setActiveTab("certifications")} 
                    className="p-4 bg-gradient-to-br from-[#0c0c16] to-[#050508] border border-white/10 hover:border-indigo-400/30 transition-all rounded-xl cursor-pointer text-left flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block">ACADEMICS</span>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">GPA {gpaInfo.scoreString}</span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate mt-1 group-hover:text-amber-300 transition-colors">MIT Graduate Student (UIC)</p>
                    <span className="text-indigo-400 font-mono text-[9px] flex items-center justify-between mt-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect records →</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                {/* Cardano 1: Roblox game */}
                <div 
                  onClick={() => setActiveTab("roblox")}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all cursor-pointer"
                  id="bento-roblox"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-white/5 border border-white/10 text-indigo-400 rounded-full flex items-center justify-center mb-4">
                        <Gamepad2 className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9px] text-rose-450 font-bold uppercase tracking-wider">2 ACTIVE GAMES</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Roblox Systems Coding</h4>
                    <p className="text-zinc-400 text-xs line-clamp-3">
                      Authoring custom roleplay duty state-machines, optimized character rigs, first-person survival camera limits, and robust data store replication.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>2.2M+ Plays Combined</span>
                    <span className="text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Inspect Modules →</span>
                  </div>
                </div>

                {/* Cardano 2: Full Stack */}
                <div 
                  onClick={() => setActiveTab("fullstack")}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all cursor-pointer"
                  id="bento-fullstack"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-white/5 border border-white/10 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                        <Globe className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">NODE & FIREBASE</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Full Stack Engineering</h4>
                    <p className="text-zinc-400 text-xs line-clamp-3">
                      Writing responsive corporate layouts in Vite, backend routes over Express, and robust real-time database structures using Google Firebase.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Firebase DB Engine</span>
                    <span className="text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">View Database →</span>
                  </div>
                </div>

                {/* Cardano 3: Graduate MIT studies */}
                <div 
                  onClick={() => setActiveTab("academic")}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all cursor-pointer"
                  id="bento-academic"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-white/5 border border-white/10 text-indigo-400 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-wider">{gpaInfo.scoreString} GPA • Univ. of Immaculate Conception</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">Master's Research Focus</h4>
                    <p className="text-zinc-400 text-xs line-clamp-3">
                      Drafting student linguistic performance predictors, offline system resync buffers, and Docker container paradigms inside UIC Davao lab arrays.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Thesis Oral Prep State</span>
                    <span className="text-indigo-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Explore Papers →</span>
                  </div>
                </div>

                {/* Cardano 4: CS IT faculty */}
                <div 
                  onClick={() => setActiveTab("faculty")}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between group hover:border-amber-500/50 transition-all cursor-pointer"
                  id="bento-faculty"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-white/5 border border-white/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
                        <Presentation className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">LECTURER STATUS</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">College IT Department Instruction</h4>
                    <p className="text-zinc-400 text-xs line-clamp-3">
                      Conducting structured lecture syllabus delivery on emerging technologies, maritime informatics, IT tools in business, and foundational HCI.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Active Course Load (4 Subjects)</span>
                    <span className="text-amber-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Steer Slides →</span>
                  </div>
                </div>

                {/* Cardano 5: ESP English teacher */}
                <div 
                  onClick={() => setActiveTab("esp")}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all cursor-pointer"
                  id="bento-esp"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-white/5 border border-white/10 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                        <BookMarked className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9px] text-emerald-450 font-bold uppercase tracking-wider">LINGUISTIC COACHING</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">English for Specific Purposes</h4>
                    <p className="text-zinc-400 text-xs line-clamp-3">
                      Teaching Chinese students to speak English fluently and effectively while modeling active speaking, natural pronunciation, and vocabulary enrichment.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Over 240 Students Active</span>
                    <span className="text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Practice Practice →</span>
                  </div>
                </div>

                {/* Cardano 6: Collab Card */}
                <div 
                  onClick={() => setActiveTab("contact")}
                  className="bg-white/5 border border-white/10 border-dashed p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 transition-all cursor-pointer"
                  id="bento-contact"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 bg-white/5 border border-white/10 text-indigo-400 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-wider">TRANSMIT BLOCK</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">Start a Collaboration</h4>
                    <p className="text-zinc-400 text-xs line-clamp-3">
                      Submit precise project details, budget vectors, and educational syllabus targets to append directly to the local session proposal inbox.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Direct Admin Sync</span>
                    <span className="text-indigo-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">Assemble Now →</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: ROBLOX MODULES */}
          {activeTab === "roblox" && <RobloxShowcase />}

          {/* TAB 3: FULLSTACK COMPONENT */}
          {activeTab === "fullstack" && <FullStackShowcase />}

          {/* TAB 4: ACADEMIC */}
          {activeTab === "academic" && <AcademicShowcase />}

          {/* TAB 5: FACULTY */}
          {activeTab === "faculty" && <FacultyShowcase />}

          {/* TAB 6: ESP CURRICULUM */}
          {activeTab === "esp" && <LanguageShowcase />}

          {/* TAB 7: CERTIFICATIONS PORTAL */}
          {activeTab === "certifications" && <CertificationsShowcase />}

          {/* TAB 8: COLLAB PROPOSALS CONTACT */}
          {activeTab === "contact" && <ContactForm />}

        </main>

        {/* Footer info blocks */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-zinc-500">
          <div>
            <p className="font-medium text-zinc-300">Edgardo Rojas — Educator & Systems Engineer</p>
            <p className="text-[10px] text-zinc-500 block mt-0.5">Styled in high-end Immersive Dark Theme. Real connection enabled.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              All Systems Operational
            </span>
            <span className="text-zinc-700">|</span>
            <span>A.Y. 2026/2027</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
