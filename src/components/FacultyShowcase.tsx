import { useState } from "react";
import { COURSES_TAUGHT } from "../data";
import { CourseTaught } from "../types";
import { Award, Users, Archive, ListChecks, FileText, ChevronLeft, ChevronRight, Presentation, BookOpen } from "lucide-react";

interface LectureSlide {
  slideNum: number;
  title: string;
  subTitle: string;
  bulletPoints: string[];
  codeTemplate?: string;
  technicalTip: string;
}

const COURSE_SLIDES: Record<string, LectureSlide[]> = {
  c1: [
    {
      slideNum: 1,
      title: "Emerging Technologies vs. Security Hardening",
      subTitle: "EMST: Living in the IT Era",
      bulletPoints: [
        "In this age of rapid digitalization, emerging technologies introduce both high capabilities and security risks.",
        "Phishing and social engineering exploits remain the highest statistical entry vectors for cyber attacks.",
        "Protective hygiene: Implementing multi-factor credentials, isolating web tokens, and hardening server endpoints."
      ],
      codeTemplate: `// Recommended multi-factor auth config snippet
{
  "authProvider": "firebase",
  "mfaPolicy": "REQUIRED",
  "allowedOrigins": ["hcdc.edu.ph"],
  "sessionDurationMinutes": 60,
  "rateLimitPerIP": "100/minute"
}`,
      technicalTip: "Always assume client-side storage is inspectable; never save plaintext personal keys or server configurations in browser modules."
    },
    {
      slideNum: 2,
      title: "Active Cyber Threat Mitigation Pathways",
      subTitle: "EMST: Living in the IT Era",
      bulletPoints: [
        "Symmetric vs Asymmetric Encryptions: Securing persistent information files.",
        "Firewall filtering: Closing unused listener ports directly in deployment parameters.",
        "Incident reporting: How immediate communication limits scope damage during active security breaches."
      ],
      codeTemplate: `// Simple state indicator showing active defense logs
interface SecurityState {
  firewallActive: boolean;
  blockedAttempts: number;
  threatLevel: "Low" | "Elevated" | "Critical";
}
const currentStatus: SecurityState = {
  firewallActive: true,
  blockedAttempts: 412,
  threatLevel: "Low"
};`,
      technicalTip: "Most successful cyber hacks are social, not purely digital; secure your workflows by training users on information custody."
    }
  ],
  c2: [
    {
      slideNum: 1,
      title: "Seagoing Network Infrastructures & Satellites",
      subTitle: "ICT: Maritime Informatics",
      bulletPoints: [
        "Shipboard computing operates under high latency, localized server architectures, and satellite connections.",
        "Integrated Bridge Systems (IBS): Monitoring navigation paths via NMEA coordinate message networks.",
        "Synchronizing local ship data feeds seamlessly with onshore registries is crucial once bandwidth clears."
      ],
      codeTemplate: `// Reading standard marine coordinate strings (NMEA sentence pattern)
// Format: $GPGGA,UTCTime,Latitude,N/S,Longitude,E/W...
function parseNMESentence(nmea: string): { lat: string; lon: string } {
  const parts = nmea.split(",");
  return {
    lat: \`\${parts[2]} \${parts[3]}\`,
    lon: \`\${parts[4]} \${parts[5]}\`
  };
}`,
      technicalTip: "When modeling database pipelines over maritime channels, design storage with robust queueing to withstand off-grid latency."
    }
  ],
  c3: [
    {
      slideNum: 1,
      title: "Analytical Business Modeling & Ledgers",
      subTitle: "BEC103: IT Application Tools in Business",
      bulletPoints: [
        "Financial modeling demands rigorous precision; reference structures must tolerate deep structural updates.",
        "Moving beyond basic spreadsheets: structuring transactional records in three-dimensional tables.",
        "Using pivot dimensions to audit, aggregate, and report ledger information trends."
      ],
      codeTemplate: `// Dynamic business ledger auto-reconciliation helper
interface Transaction { id: string; debit: number; credit: number; }
function reconcileLedger(records: Transaction[]): number {
  return records.reduce((balance, rec) => balance + (rec.debit - rec.credit), 0);
}`,
      technicalTip: "Always apply static absolute references ($) to business indexes in lookup matrices to prevent target drift."
    }
  ],
  c4: [
    {
      slideNum: 1,
      title: "Foundational UX Laws & Cognitive Loading",
      subTitle: "HCI101: Introduction to Human Computer Interaction",
      bulletPoints: [
        "Hick's Law: The time it takes to make a decision increases logarithmically with the count of choices.",
        "Fitts's Law: Touch targets must offer generous dimensions and balanced padding to reduce physical errors.",
        "Heuristic Evaluation: Reviewing design layouts systematically against continuous systemic visibility rules."
      ],
      codeTemplate: `// Accessible High-Contrast Focus Trigger Component
export function AccessibleButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold min-h-[44px] min-w-[120px] transition-colors focus:ring-4 focus:ring-indigo-300"
      aria-label={label}
    >
      {label}
    </button>
  );
}`,
      technicalTip: "A beautiful UI that users find confusing is ultimately useless; prioritize transparent flow feedback over flashy visual overlays."
    }
  ]
};

export default function FacultyShowcase() {
  const [selectedCourse, setSelectedCourse] = useState<CourseTaught>(COURSES_TAUGHT[0]);
  const [slideIndex, setSlideIndex] = useState(0);

  const activeSlides = COURSE_SLIDES[selectedCourse.id] || [];
  const currentSlide = activeSlides[slideIndex] || null;

  const handleNextSlide = () => {
    if (slideIndex < activeSlides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const selectNewCourse = (course: CourseTaught) => {
    setSelectedCourse(course);
    setSlideIndex(0);
  };

  return (
    <div className="space-y-8" id="faculty-showcase-container">
      {/* Intro layout */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0f] to-emerald-950/40 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-48 w-48 opacity-10 bg-radial-gradient"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            <Presentation className="h-4 w-4 text-emerald-400" />
            Part-Time Faculty & Academic Advisor
          </span>
          <h3 className="text-3xl font-light tracking-tight font-display text-white">
            Mentoring <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">the Next Generation of Engineers</span>
          </h3>
          <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
            Delivering lectures on Object-Oriented Programming (OOP) paradigms, cloud database architectures, 
            and interactive networks at the High School and College departments in Davao City.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 font-sans">
        {/* Left pane: Active Course Load */}
        <div className="lg:col-span-5 space-y-4" id="faculty-course-list">
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            Academic Course Load
          </h4>
          <p className="text-zinc-400 text-xs text-left">Select an active university subject to view its course description, syllabus modules, and load its corresponding slides inside the simulator on the right side.</p>

          <div className="space-y-3">
            {COURSES_TAUGHT.map((course) => (
              <button
                key={course.id}
                onClick={() => selectNewCourse(course)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                  selectedCourse.id === course.id
                    ? "bg-white/10 border-indigo-505 border-indigo-500/50 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
                id={`course-btn-${course.id}`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-wider block mb-0.5">{course.code}</span>
                    <h5 className="font-semibold text-white text-sm">{course.title}</h5>
                  </div>
                  <span className="shrink-0 rounded px-2.5 py-0.5 bg-white/5 border border-white/10 text-[9px] font-bold text-rose-455 text-rose-400 uppercase tracking-widest">
                    {course.level}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">{course.description}</p>
                
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{course.semester}</span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Users className="h-3.5 w-3.5 text-indigo-400" />
                    {course.activeStudents} Enrolled
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right pane: PowerPoint Emulator */}
        <div className="lg:col-span-7 flex flex-col space-y-6" id="slides-emulator">
          
          <div className="rounded-2xl border border-white/10 bg-[#07070a] shadow-2xl overflow-hidden flex flex-col justify-between h-[480px]">
            
            {/* Projector header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 text-xs">
              <span className="text-white font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono text-[10px]">
                <Presentation className="h-4 w-4 text-emerald-400 animate-pulse" />
                LECTURE PROJECTOR FEED - SLIDE {slideIndex + 1}/{activeSlides.length}
              </span>
              <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">
                {selectedCourse.code} Lectures
              </div>
            </div>

            {/* Slide Area */}
            {currentSlide ? (
              <div className="flex-1 p-6 md:p-8 space-y-4 overflow-y-auto">
                <div>
                  <h4 className="text-[9px] font-mono font-bold uppercase text-indigo-400 tracking-widest">
                    {currentSlide.subTitle}
                  </h4>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mt-0.5">
                    {currentSlide.title}
                  </h3>
                </div>

                {/* Bullets */}
                <div className="space-y-2">
                  {currentSlide.bulletPoints.map((pt, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-zinc-300">
                      <span className="font-mono text-indigo-400 font-bold mt-0.5">{idx + 1}.</span>
                      <p className="leading-relaxed text-zinc-300">{pt}</p>
                    </div>
                  ))}
                </div>

                {/* Code visual sample inside slides! */}
                {currentSlide.codeTemplate && (
                  <div className="rounded-xl bg-[#030305] border border-white/10 p-4 font-mono text-[10px] text-zinc-300 overflow-x-auto leading-relaxed">
                    <pre className="whitespace-pre">{currentSlide.codeTemplate}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-550 text-zinc-500 italic p-6">
                <span>No digital slides currently allocated in database for this specialized course outline. Refer to Course Syllabus below.</span>
              </div>
            )}

            {/* Slide Footer notes and controls */}
            <div className="border-t border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              
              {/* Note tip */}
              <div className="text-[11px] text-zinc-400 text-left w-full sm:max-w-md">
                <span className="font-mono font-bold text-indigo-400 uppercase tracking-widest block text-[9px] mb-0.5">
                  FACULTY BOARD TIP
                </span>
                <span className="italic leading-normal block">
                  {currentSlide?.technicalTip || "Select course catalog to view timeline assets."}
                </span>
              </div>

              {/* Controls triggers */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={handlePrevSlide}
                  disabled={slideIndex === 0}
                  className="p-2 bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 rounded-sm disabled:opacity-20 cursor-pointer transition-all"
                  id="prev-slide-btn"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-mono text-zinc-400 text-xs px-2 font-bold select-none text-[11px]">
                  {slideIndex + 1} / {activeSlides.length}
                </span>
                <button
                  onClick={handleNextSlide}
                  disabled={slideIndex === activeSlides.length - 1}
                  className="p-2 bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 rounded-sm disabled:opacity-20 cursor-pointer transition-all"
                  id="next-slide-btn"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Syllabus timeline overview */}
          <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 mt-4">
            <h5 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Syllabus Outline Timeline (18-Week Distribution)</span>
              <span className="text-emerald-400 font-mono tracking-widest font-bold">HOLY CROSS OF DAVAO COLLEGE</span>
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCourse.syllabus.map((syl, sIdx) => {
                const weekRange = sIdx === 0 ? "Weeks 1-4" : sIdx === 1 ? "Weeks 5-9" : sIdx === 2 ? "Weeks 10-14" : "Weeks 15-18";
                return (
                  <div key={sIdx} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
                    <span className="bg-white/5 text-rose-400 font-mono font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded border border-white/10 self-start shrink-0">
                      {weekRange}
                    </span>
                    <p className="text-xs text-zinc-350 leading-relaxed font-semibold">{syl}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
