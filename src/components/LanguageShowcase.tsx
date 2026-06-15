import { useState } from "react";
import { ESP_LESSONS } from "../data";
import { ESPLesson } from "../types";
import { BookMarked, HelpCircle, CheckCircle, AlertCircle, FileCheck, Trophy, Sparkles, MessageCircleCode, Volume2 } from "lucide-react";

export default function LanguageShowcase() {
  const [selectedLesson, setSelectedLesson] = useState<ESPLesson>(ESP_LESSONS[0]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Lesson Drafting State
  const [composerTopic, setComposerTopic] = useState("Agile Impediment Notification");
  const [composerDraft, setComposerDraft] = useState("");

  const handleOptionSelect = (optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null || quizSubmitted) return;
    setQuizSubmitted(true);
    
    const correctIdx = selectedLesson.interactiveQuiz[quizIdx].correctIndex;
    if (selectedOption === correctIdx) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    if (quizIdx < selectedLesson.interactiveQuiz.length - 1) {
      setQuizIdx(quizIdx + 1);
    } else {
      // Completed, reset indices to start over
      setQuizIdx(0);
      setQuizScore(0);
    }
  };

  const changeLesson = (lesson: ESPLesson) => {
    setSelectedLesson(lesson);
    setQuizIdx(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Automated draft writer
  const handleComposeTemplate = () => {
    let draft = "";
    if (composerTopic === "Fluent Meeting Introduction") {
      draft = `Speech Pattern: Professional Meeting Introduction

"Good morning everyone, and thank you for joining today's discussion. 
Before we dive into the main agenda, I would like to take a brief moment 
to outline our primary objectives for this session. 

Our goal today is to align on the project timeline and address any 
outstanding items. Let's turn our attention first to the overview on the screen..."

Key Fluent Focus:
- Friendly transition phrases ('Before we dive in...', 'turn our attention first to')
- Natural vocal pacing guides included in curriculum`;
    } else {
      draft = `Speech Pattern: Polite & Fluent Progress Update

"Hi team, I wanted to share a quick, structured update on my end. 
Over the last two days, I have completed the primary layout optimizations.

Everything is currently running smoothly. However, I have encountered 
a minor delay due to a credentials sync issue, which I plan to resolve 
by this afternoon. I'll keep you posted as we make progress."

Key Fluent Focus:
- Smooth coordination words ('Hi team', 'I wanted to share', 'I plan to resolve')
- Clear structured message to reduce speaking pressure`;
    }
    setComposerDraft(draft);
  };

  return (
    <div className="space-y-8" id="language-showcase-container">
      
      {/* Intro academic block */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0f] to-emerald-950/40 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-48 w-48 opacity-10 bg-radial-gradient"></div>
        <div className="relative z-10 max-w-2xl text-left">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              <BookMarked className="h-4 w-4 text-emerald-400" />
              English for Specific Purposes (ESP) Teacher
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              Over 240 Students Guided
            </span>
          </div>
          <h3 className="text-3xl font-light tracking-tight font-display text-white">
            Communicative <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Fluency for Chinese ESL Learners</span>
          </h3>
          <p className="mt-2 text-zinc-400 text-sm leading-relaxed text-left">
            Bridging conversational fluency with highly effective language instruction. Designing direct, context-driven phonetic and speaking lesson tracks that train Chinese students to express complex ideas with perfect coherence, natural intonation, and lasting confidence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 font-sans">
        
        {/* Left column: Syllabus selects */}
        <div className="lg:col-span-12 lg:grid lg:grid-cols-12 gap-8" id="esp-split-layout">
          
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <MessageCircleCode className="h-5 w-5 text-indigo-400" />
              Conversational Practice Tracks
            </h4>
            <p className="text-zinc-400 text-xs text-left">Select an active ESL practice track to load its vocabulary index, context examples, and interactive language quizzes.</p>

            <div className="space-y-3">
              {ESP_LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => changeLesson(lesson)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                    selectedLesson.id === lesson.id
                      ? "bg-white/10 border-indigo-500/50 shadow-lg"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                  id={`lesson-btn-${lesson.id}`}
                >
                  <div className="flex items-start justify-between gap-1.5 font-sans">
                    <h5 className="font-semibold text-white text-sm">{lesson.topic}</h5>
                  </div>
                  <p className="text-[10px] text-emerald-400 font-mono mt-1 font-bold uppercase tracking-wider">Audience: {lesson.targetProfession}</p>
                  <ul className="mt-3 space-y-2">
                    {lesson.objectives.slice(0, 2).map((obj, oIdx) => (
                      <li key={oIdx} className="text-xs text-zinc-400 flex items-start gap-1.5 leading-relaxed text-left">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Interactive Vocabulary glossary block */}
            <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 mt-4">
              <h5 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3.5 flex items-center justify-between">
                <span>Technical Glossary ({selectedLesson.vocabularyList.length} Core Keys)</span>
                <Volume2 className="h-4 w-4 text-emerald-450 text-emerald-400" />
              </h5>
              
              <div className="space-y-3">
                {selectedLesson.vocabularyList.map((vocab, vIdx) => (
                  <div key={vIdx} className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-baseline justify-between select-none">
                      <span className="font-bold text-emerald-400 text-sm font-mono">{vocab.word}</span>
                      <span className="text-[9px] text-zinc-500 italic uppercase">Noun / Verb</span>
                    </div>
                    <p className="text-xs text-zinc-350 font-medium leading-relaxed text-left">{vocab.definition}</p>
                    <p className="text-[10px] text-zinc-500 italic font-mono block text-left">Context: "{vocab.example}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Interactive ESP quiz and email composer */}
          <div className="lg:col-span-7 flex flex-col space-y-6 mt-6 lg:mt-0" id="esp-interactive-deck">
            
            {/* Section 1: Stateful quiz console */}
            <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl">
              
              <div className="border-b border-white/10 pb-4 mb-4 flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <HelpCircle className="h-4.5 w-4.5 text-indigo-400" />
                    Linguistic Translation Evaluation
                  </h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">Determine the ideal technical communication phrasing in corporate settings.</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#050508] px-3 py-1 bg-white/5 rounded border border-white/10 font-mono text-[11px] font-bold text-white uppercase tracking-wider shrink-0">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  <span>Score: {quizScore} / {selectedLesson.interactiveQuiz.length}</span>
                </div>
              </div>

              {/* Current Question Block */}
              {selectedLesson.interactiveQuiz[quizIdx] ? (
                <div className="space-y-4">
                  <div className="p-4.5 bg-black/60 rounded-xl border border-white/10 leading-relaxed text-xs md:text-sm text-zinc-350 font-medium text-left">
                    <span className="text-[9px] text-indigo-400 font-mono font-bold block mb-1 uppercase">EVALUATION STATEMENT {quizIdx + 1} OF {selectedLesson.interactiveQuiz.length}</span>
                    {selectedLesson.interactiveQuiz[quizIdx].question}
                  </div>

                  {/* State Options list */}
                  <div className="space-y-2">
                    {selectedLesson.interactiveQuiz[quizIdx].options.map((option, idx) => {
                      let btnClass = "border-white/10 hover:bg-white/10 bg-white/5 text-zinc-350";
                      
                      if (selectedOption === idx) {
                        btnClass = "border-indigo-500 bg-indigo-950/20 text-indigo-300";
                      }

                      if (quizSubmitted) {
                        const isCorrect = idx === selectedLesson.interactiveQuiz[quizIdx].correctIndex;
                        if (isCorrect) {
                          btnClass = "border-emerald-500 bg-emerald-950/20 text-emerald-400 font-semibold";
                        } else if (selectedOption === idx) {
                          btnClass = "border-rose-500 bg-rose-950/20 text-rose-400 line-through";
                        } else {
                          btnClass = "border-white/5 opacity-30 text-zinc-550";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizSubmitted}
                          onClick={() => handleOptionSelect(idx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnClass}`}
                          id={`option-btn-${idx}`}
                        >
                          <span className="bg-[#050508] w-5 h-5 rounded-sm border border-white/10 flex items-center justify-center font-mono font-bold shrink-0 text-[10px] text-indigo-400">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom triggers */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div className="text-left">
                      {!quizSubmitted ? (
                        <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Select options to grade</span>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs">
                          {selectedOption === selectedLesson.interactiveQuiz[quizIdx].correctIndex ? (
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" /> Correct Choice
                            </span>
                          ) : (
                            <span className="text-rose-400 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" /> Incorrect Option
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {!quizSubmitted ? (
                        <button
                          disabled={selectedOption === null}
                          onClick={handleQuizSubmit}
                          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/5 disabled:text-zinc-500 text-black font-bold uppercase tracking-wider text-[11px] py-2 px-4 rounded-sm cursor-pointer transition-all"
                          id="submit-quiz-btn"
                        >
                          Grade Phrasing
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuiz}
                          className="bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 text-black font-bold uppercase tracking-wider text-[11px] py-1.5 px-4 rounded-sm cursor-pointer transition-all animate-pulse"
                          id="next-quiz-btn"
                        >
                          {quizIdx < selectedLesson.interactiveQuiz.length - 1 ? "Next Question" : "Reset Quiz Stream"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Explanation container */}
                  {quizSubmitted && (
                    <div className="bg-[#030305] rounded-xl p-4.5 border border-white/10 text-zinc-400 text-xs leading-relaxed text-left">
                      <span className="font-mono text-[9px] text-indigo-400 font-bold block uppercase mb-1 tracking-wider">COMMUNICATION DIRECTIVE EXPLANATION</span>
                      {selectedLesson.interactiveQuiz[quizIdx].explanation}
                    </div>
                  )}

                </div>
              ) : null}

            </div>

            {/* Section 2: Automated layout drafting compositor */}
            <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl">
              <div className="border-b border-white/10 pb-3 mb-4 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
                  ESP Draft Document Compositor
                </h4>
                <p className="text-zinc-400 text-[11px] mt-1">Generate real-time professional templates to model flawless ESP-aligned communication.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-4 text-left">
                <div>
                  <label className="text-[9px] text-zinc-500 block mb-1 font-bold uppercase tracking-wider">SELECT FLUENCY SPEECH TEMPLATE</label>
                  <select
                    value={composerTopic}
                    onChange={(e) => setComposerTopic(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 text-xs rounded-sm px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    id="composer-topic-select"
                  >
                    <option value="Fluent Meeting Introduction">Fluent Meeting Introduction (Natural intro flow)</option>
                    <option value="Polite Progress Update">Polite Progress Update (Structured status reporting)</option>
                  </select>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleComposeTemplate}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-[11px] py-2.5 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    id="generate-draft-btn"
                  >
                    <FileCheck className="h-4 w-4 text-black" />
                    Compile ESP Draft Document
                  </button>
                </div>
              </div>

              {composerDraft && (
                <div className="space-y-1.5 text-left">
                  <h5 className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5 block">COMPILED ESP OUTBOX DOCUMENT</h5>
                  <div className="font-mono text-xs p-4 bg-[#030305] rounded-xl border border-white/10 text-zinc-300 leading-relaxed whitespace-pre-wrap text-left">
                    {composerDraft}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
