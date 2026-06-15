import { useState, useMemo } from "react";
import { RESEARCH_PAPERS, MSIT_SUBJECTS, calculateCumulativeGPA } from "../data";
import { MSITSubject, MSITProject } from "../types";
import { 
  GraduationCap, 
  BookOpen, 
  Brain, 
  Layers, 
  Cpu, 
  Compass, 
  Settings,
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Database,
  Tv,
  Layout,
  Gauge,
  ArrowRight
} from "lucide-react";

export default function AcademicShowcase() {
  const [academicSubTab, setAcademicSubTab] = useState<'curriculum' | 'research'>('curriculum');
  const gpaInfo = calculateCumulativeGPA();
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("MIT 011B"); // Capstone II default matches masterwork
  const [activePaperIdx, setActivePaperIdx] = useState<number>(0);
  
  // Thesis Simulator Variables
  const [retentionWeight, setRetentionWeight] = useState(60); // 10-100
  const [containerCapacity, setContainerCapacity] = useState(128); // MB
  const [offlineSyncDelay, setOfflineSyncDelay] = useState(5); // seconds

  const predictedImpact = useMemo(() => {
    // Basic calculation showing engagement score
    const systemSpeed = Math.floor(Math.max(10, 100 - (containerCapacity / 4) - (offlineSyncDelay * 3)));
    const comprehensionGain = Math.floor(retentionWeight * 0.7 + (100 - offlineSyncDelay * 2) * 0.35);
    const databaseLeads = Math.floor(100 - offlineSyncDelay * 10);
    
    return {
      speed: systemSpeed,
      comprehension: Math.min(100, Math.max(10, comprehensionGain)),
      safety: Math.min(100, Math.max(12, databaseLeads))
    };
  }, [retentionWeight, containerCapacity, offlineSyncDelay]);

  // Find the currently selected subject from our list
  const activeSubject = useMemo(() => {
    const found = MSIT_SUBJECTS.find(subj => subj.code === selectedSubjectCode);
    return found || MSIT_SUBJECTS[MSIT_SUBJECTS.length - 1]; // Fallback to Capstone II
  }, [selectedSubjectCode]);

  // Filter subjects by year and semester for the table renders
  const firstYearSem1 = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "First Year" && s.semester === "First Semester"), []);
  const firstYearSem2 = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "First Year" && s.semester === "Second Semester"), []);
  const firstYearSummer = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "First Year" && s.semester === "Summer"), []);

  const secondYearResidency = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "Second Year" && s.semester === "Residency"), []);
  const secondYearSem1 = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "Second Year" && s.semester === "First Semester"), []);
  const secondYearSem2 = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "Second Year" && s.semester === "Second Semester"), []);
  const secondYearSummer = useMemo(() => MSIT_SUBJECTS.filter(s => s.year === "Second Year" && s.semester === "Summer"), []);

  return (
    <div className="space-y-6 animate-fade-in" id="academic-showcase-container">
      
      {/* Intro academic block */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 p-6 rounded-2xl border border-white/10 bg-[#07070a] flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 text-indigo-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10 mb-3.5">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              Course: MIT (Master's in Information Technology)
            </span>
            <h3 className="text-3xl font-light tracking-tight font-display text-white">Graduate <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Academic Framework</span></h3>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed text-left">
              Pursuing research that integrates advanced cloud infrastructure with multi-agent interactive learning systems at the University of the Immaculate Conception (UIC) Davao, while serving as a faculty member at Holy Cross of Davao College. 
              Bridging computing networks with practical language acquisition theory to support modern global developers.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">CUMULATIVE GPA</span>
              <span className="text-sm font-mono font-bold text-white">{gpaInfo.scoreString} / 4.00</span>
              <span className="text-[8px] text-indigo-400 block font-mono">({gpaInfo.takenCount} graded subjects)</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">INSTITUTION</span>
              <span className="text-sm font-bold text-white truncate">UIC Davao</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">COURSE</span>
              <span className="text-sm font-mono font-bold text-emerald-400">MIT</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">THESIS STATE</span>
              <span className="text-xs font-mono font-bold text-white">Oral Defense Prep</span>
            </div>
          </div>
        </div>

        {/* Focus areas bento block */}
        <div className="p-6 rounded-2xl border border-white/10 bg-[#07070a] flex flex-col justify-between">
          <div>
            <h4 className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-4">Focus Specializations</h4>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded bg-white/5 border border-white/10 text-indigo-400 shrink-0"><Brain className="h-4 w-4" /></span>
                <div>
                  <h5 className="font-bold text-white">Data Science & AI</h5>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Machine learning synapses, predictive NLP & data mining matrices.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-2 rounded bg-white/5 border border-white/10 text-emerald-400 shrink-0"><Cpu className="h-4 w-4" /></span>
                <div>
                  <h5 className="font-bold text-white">Systems Design</h5>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Distributed databases, CJS bundle caches & cross-platform mobile sync.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="p-2 rounded bg-white/5 border border-white/10 text-cyan-400 shrink-0"><Database className="h-4 w-4" /></span>
                <div>
                  <h5 className="font-bold text-white">Advanced Networks</h5>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Containerized socket routing, physical IoT grids & firewalls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs: Curriculum vs Research */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-1">
        <button
          onClick={() => setAcademicSubTab('curriculum')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
            academicSubTab === 'curriculum'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
          id="subtab-curriculum"
        >
          <Layout className="h-4 w-4" />
          MIT Curriculum & Projects
        </button>
        <button
          onClick={() => setAcademicSubTab('research')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
            academicSubTab === 'research'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
          id="subtab-research"
        >
          <BookOpen className="h-4 w-4" />
          Publications & Thesis Simulator
        </button>
      </div>

      {/* RENDER TAB 1: CURRICULUM SYLLABUS AND ASSOCIATED WORKS */}
      {academicSubTab === 'curriculum' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="msit-curriculum-grid">
          
          {/* Left Area: Subjects Semester Table Cards (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* FIRST YEAR WRAPPER */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="bg-gradient-to-r from-[#802040] to-[#b32d56] px-5 py-3 text-left">
                <span className="text-[11px] font-mono font-bold text-white tracking-[0.25em] flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  FIRST YEAR SYLLABUS
                </span>
              </div>

              <div className="p-4 space-y-5">
                {/* 1st Semester */}
                <div>
                  <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-left">First Semester</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {firstYearSem1.map((subj) => (
                      <button
                        key={subj.code}
                        onClick={() => setSelectedSubjectCode(subj.code)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                          selectedSubjectCode === subj.code
                            ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                            : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-rose-400 block">{subj.code}</span>
                          {subj.rating && subj.rating !== "—" ? (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                              {subj.rating}
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                              T.B.F.
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                        <span className="text-[9px] text-zinc-500 block mt-1">First Semester</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2nd Semester */}
                <div className="pt-3 border-t border-white/5">
                  <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-left">Second Semester</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {firstYearSem2.map((subj) => (
                      <button
                        key={subj.code}
                        onClick={() => setSelectedSubjectCode(subj.code)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                          selectedSubjectCode === subj.code
                            ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                            : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-rose-400 block">{subj.code}</span>
                          {subj.rating && subj.rating !== "—" ? (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                              Grade: {subj.rating}
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                              T.B.F.
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                        <span className="text-[9px] text-zinc-500 block mt-1">Second Semester</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summer */}
                <div className="pt-3 border-t border-white/5">
                  <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-left">Summer Term</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {firstYearSummer.map((subj) => (
                      <button
                        key={subj.code}
                        onClick={() => setSelectedSubjectCode(subj.code)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                          selectedSubjectCode === subj.code
                            ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                            : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-rose-400 block">{subj.code}</span>
                          {subj.rating && subj.rating !== "—" ? (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                              {subj.rating}
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                              T.B.F.
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                        <span className="text-[9px] text-zinc-500 block mt-1">Summer Term</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECOND YEAR WRAPPER */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="bg-gradient-to-r from-[#991b1b] to-[#dc2626] px-5 py-3 text-left">
                <span className="text-[11px] font-mono font-bold text-white tracking-[0.25em] flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  SECOND YEAR SYLLABUS
                </span>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left Residency (4 cols) */}
                <div className="md:col-span-4 space-y-3.5">
                  <h5 className="text-[10px] font-bold text-amber-500 uppercase tracking-wider text-left pb-1 border-b border-white/5">Residency</h5>
                  <div className="space-y-2.5">
                    {secondYearResidency.map((subj) => (
                      <button
                        key={subj.code}
                        onClick={() => setSelectedSubjectCode(subj.code)}
                        className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden block ${
                          selectedSubjectCode === subj.code
                            ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                            : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-amber-500 block">{subj.code}</span>
                          {subj.rating && subj.rating !== "—" ? (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                              {subj.rating}
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                              T.B.F.
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                        <span className="text-[9px] text-zinc-500 block mt-1">Immersion</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Columns: Sem 1, Sem 2, Summer (8 cols) */}
                <div className="md:col-span-8 space-y-4">
                  
                  {/* First Semester */}
                  <div>
                    <h5 className="text-[10px] font-bold text-rose-450 text-rose-400 uppercase tracking-wider mb-2 text-left">First Semester</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {secondYearSem1.map((subj) => (
                        <button
                          key={subj.code}
                          onClick={() => setSelectedSubjectCode(subj.code)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                            selectedSubjectCode === subj.code
                              ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                              : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[9px] font-mono font-bold tracking-wider text-rose-400 block">{subj.code}</span>
                            {subj.rating && subj.rating !== "—" ? (
                              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                {subj.rating}
                              </span>
                            ) : (
                              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                                T.B.F.
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                          <span className="text-[9px] text-zinc-500 block mt-1">First Semester</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Second Semester & Summer Combined Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/5">
                    <div>
                      <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-left">Second Semester</h5>
                      {secondYearSem2.map((subj) => (
                        <button
                          key={subj.code}
                          onClick={() => setSelectedSubjectCode(subj.code)}
                          className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                            selectedSubjectCode === subj.code
                              ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                              : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[9px] font-mono font-bold tracking-wider text-rose-450 text-rose-400 block">{subj.code}</span>
                            {subj.rating && subj.rating !== "—" ? (
                              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                {subj.rating}
                              </span>
                            ) : (
                              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                                T.B.F.
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                          <span className="text-[9px] text-zinc-500 block mt-1">Capstone I</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-left">Summer Term</h5>
                      {secondYearSummer.map((subj) => (
                        <button
                          key={subj.code}
                          onClick={() => setSelectedSubjectCode(subj.code)}
                          className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
                            selectedSubjectCode === subj.code
                              ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/20'
                              : 'bg-black/45 border-white/5 hover:border-white/25 hover:bg-black/20'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-[9px] font-mono font-bold tracking-wider text-rose-450 text-rose-400 block">{subj.code}</span>
                            {subj.rating && subj.rating !== "—" ? (
                              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                {subj.rating}
                              </span>
                            ) : (
                              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500 font-medium">
                                T.B.F.
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-semibold text-white mt-1 leading-snug truncate">{subj.title}</p>
                          <span className="text-[9px] text-zinc-500 block mt-1">Capstone II</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Right Area: Selected Subject Detail and Works Gallery (5 columns) */}
          <div className="lg:col-span-5 space-y-6" id="subject-gallery-panel">
            
            <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl space-y-5 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <Database className="h-32 w-32 text-indigo-400" />
              </div>

              {/* Detail Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded font-mono font-bold">
                    {activeSubject.code}
                  </span>
                  {activeSubject.rating && activeSubject.rating !== "—" ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                      Grade Score: {activeSubject.rating}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-500 font-medium">
                      Grade Score: To Be Followed
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mt-2 leading-tight">{activeSubject.title}</h4>
                <p className="text-zinc-[350] text-[11px] text-zinc-400 mt-2 leading-relaxed">{activeSubject.description}</p>
                
                <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono text-zinc-500">
                  <span>Year: {activeSubject.year}</span>
                  <span>•</span>
                  <span>Semester: {activeSubject.semester}</span>
                </div>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Tv className="h-3.5 w-3.5" />
                    Completed Project Works
                  </h5>
                  <span className="text-[9px] text-emerald-400 font-mono font-bold">Verified Artifacts ({activeSubject.projects.length})</span>
                </div>

                {activeSubject.projects.map((proj, idx) => (
                  <div key={idx} className="space-y-3.5 bg-black/45 p-4 rounded-xl border border-white/5">
                    
                    {/* Picture/Image of the Project */}
                    {proj.visualThumbnailUrl && (
                      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 bg-neutral-950 shadow-inner group">
                        <img
                          src={proj.visualThumbnailUrl}
                          alt={`${proj.title} graphical representation`}
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full transform hover:scale-[1.02] transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-3">
                          <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-widest block mb-0.5">MIT WORK ARTIFACT VIEW</span>
                          <p className="text-[10px] font-semibold text-white truncate">{proj.title}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h6 className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                        {proj.title}
                      </h6>
                      <p className="text-[11.5px] text-zinc-400 mt-1 leading-relaxed">{proj.description}</p>
                    </div>

                    {/* Tech stacks */}
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono text-zinc-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Outcomes */}
                    {proj.findings && (
                      <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-lg text-[10.5px] leading-relaxed text-indigo-300">
                        <span className="font-mono text-[9px] text-indigo-400 font-bold block uppercase mb-0.5">LEARNED & DEMONSTRATED</span>
                        {proj.findings}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* RENDER TAB 2: ORIGINAL RESEARCH CONTRIBUTIONS & OUTCOMES SIMULATOR */}
      {academicSubTab === 'research' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 font-sans" id="academic-research-content">
          
          {/* Left: Publications indexes */}
          <div className="lg:col-span-7 space-y-4" id="publications-panel">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              Research Contributions & Papers
            </h4>
            <p className="text-zinc-400 text-xs text-left">Click a title below to display the clinical abstract, keywords, and practical findings.</p>

            <div className="space-y-4">
              {RESEARCH_PAPERS.map((paper, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all duration-200 text-left ${
                    activePaperIdx === idx
                      ? "bg-white/10 border-indigo-500 shadow-lg cursor-pointer animate-fade-in"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer"
                  }`}
                  onClick={() => setActivePaperIdx(idx)}
                  id={`paper-card-${idx}`}
                >
                  <div className="flex items-center justify-between text-[9px] text-indigo-400 font-mono mb-2">
                    <span className="font-bold uppercase tracking-wider">{paper.journal}</span>
                    <span className="text-zinc-500">{paper.date}</span>
                  </div>
                  <h5 className={`font-semibold text-sm transition-colors ${activePaperIdx === idx ? "text-white" : "text-zinc-300"}`}>
                    {paper.title}
                  </h5>

                  {activePaperIdx === idx && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">ABSTRACT</span>
                        <p className="text-xs text-zinc-300 leading-relaxed text-justify">{paper.abstract}</p>
                      </div>

                      <div>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5 overflow-x-auto">LCN INDEX KEYWORDS</span>
                        <div className="flex flex-wrap gap-1.5">
                          {paper.keywords.map((kw, kIdx) => (
                            <span key={kIdx} className="bg-[#050508] text-zinc-400 px-2.5 py-0.5 rounded text-[9px] font-mono border border-white/5">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-indigo-950/15 rounded-xl p-4 border border-indigo-400/20">
                        <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">PRIMARY FINDINGS SUMMARY</span>
                        <p className="text-xs text-indigo-200/90 leading-relaxed">{paper.findings}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Thesis Simulator */}
          <div className="lg:col-span-5" id="thesis-simulator-gadget">
            <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl space-y-5 text-left">
              <div className="border-b border-white/10 pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Compass className="h-4.5 w-4.5 text-indigo-400" />
                  Thesis Outcome Simulator
                </h4>
                <p className="text-zinc-400 text-[11px] mt-1">Simulate outcome metrics by tuning variable parameters of your proposed MIT thesis algorithm.</p>
              </div>

              {/* Range 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Vocabulary Immersion Weight</span>
                  <span className="text-indigo-400 font-bold font-mono">{retentionWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={retentionWeight}
                  onChange={(e) => setRetentionWeight(Number(e.target.value))}
                  className="w-full h-1 bg-black/60 rounded-sm appearance-none cursor-pointer accent-indigo-500"
                  id="retention-weight-range"
                />
                <span className="text-[9px] text-zinc-500 block">Corresponds to density of ESP terms inside Roblox game worlds.</span>
              </div>

              {/* Range 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Engine Cache Size Pool</span>
                  <span className="text-indigo-400 font-bold font-mono">{containerCapacity} MB</span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="512"
                  step="32"
                  value={containerCapacity}
                  onChange={(e) => setContainerCapacity(Number(e.target.value))}
                  className="w-full h-1 bg-black/60 rounded-sm appearance-none cursor-pointer accent-indigo-500"
                  id="container-capacity-range"
                />
                <span className="text-[9px] text-zinc-500 block">Local client disk caching parameters for campus node server.</span>
              </div>

              {/* Range 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Offline Re-sync Window</span>
                  <span className="text-indigo-400 font-bold font-mono">{offlineSyncDelay}s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={offlineSyncDelay}
                  onChange={(e) => setOfflineSyncDelay(Number(e.target.value))}
                  className="w-full h-1 bg-black/60 rounded-sm appearance-none cursor-pointer accent-indigo-500"
                  id="sync-delay-range"
                />
                <span className="text-[9px] text-zinc-500 block">Delay limits of transactional synchronization queue.</span>
              </div>

              {/* Output Visuals */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h5 className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Theoretical Outcomes Model</h5>
                
                <div className="space-y-3">
                  {/* Out 1 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Student Vocabulary Retention:</span>
                      <span className="font-bold font-mono text-indigo-400">{predictedImpact.comprehension}% Gain</span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-sm overflow-hidden">
                      <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${predictedImpact.comprehension}%` }}></div>
                    </div>
                  </div>

                  {/* Out 2 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Offline Transaction Stability:</span>
                      <span className="font-bold font-mono text-white">{predictedImpact.safety}% Reliable</span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-sm overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${predictedImpact.safety}%` }}></div>
                    </div>
                  </div>

                  {/* Out 3 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                       <span className="text-zinc-400">Campus Gateway Thread Speed:</span>
                      <span className="font-bold font-mono text-cyan-400">{predictedImpact.speed} ms latency</span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-sm overflow-hidden">
                      <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(10, 110 - predictedImpact.speed))}%` }}></div>
                    </div>
                  </div>
                </div>

                <p className="text-[9px] text-zinc-500 leading-relaxed italic text-center pt-2">
                  *Tuning shows the balance: Higher vocabulary weight boosts retention but calls for robust caching nodes to secure frame latency under lab environments.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
