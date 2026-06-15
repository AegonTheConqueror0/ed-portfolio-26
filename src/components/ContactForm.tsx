import { FormEvent, useState } from "react";
import { Mail, Send, CheckCircle2, User, MessageCircle, FileSpreadsheet } from "lucide-react";

interface ContactInquiry {
  id: string;
  senderName: string;
  senderEmail: string;
  category: string;
  body: string;
  timestamp: string;
  assignedStatus: 'Incoming Validation' | 'Response Formulated' | 'Awaiting Clearance';
}

export default function ContactForm() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [category, setCategory] = useState("Roblox Collaboration");
  const [body, setBody] = useState("");
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [localInbox, setLocalInbox] = useState<ContactInquiry[]>([
    {
      id: "9ef2",
      senderName: "HCDC Administration",
      senderEmail: "dean.engineering@hcdc.edu.ph",
      category: "Faculty Lecture Request",
      body: "Good day Prof. Rojas, we would love to schedule a custom masterclass session on advanced Roblox server-client state mechanics and replication systems for our graduating Computer Science students next semester.",
      timestamp: "Today at 08:30 UTC",
      assignedStatus: "Response Formulated"
    }
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !body.trim()) return;

    const newInquiry: ContactInquiry = {
      id: Math.random().toString(16).substring(2, 6),
      senderName,
      senderEmail,
      category,
      body,
      timestamp: "Just Now",
      assignedStatus: "Incoming Validation"
    };

    setLocalInbox(prev => [newInquiry, ...prev]);
    setIsSubmitted(true);
    
    // Reset specific fields
    setSenderName("");
    setSenderEmail("");
    setBody("");

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4500);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="contact-container text-left">
      
      {/* Structural layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Side: Proposal Composer Form */}
        <div className="lg:col-span-6 bg-[#07070a] rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl text-left">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#a1a1aa]">
              <Mail className="h-3.5 w-3.5 text-indigo-400" />
              Secure Outbox Node
            </span>
            <h3 className="text-2xl font-light tracking-tight font-display text-white mt-1">
              Propose a <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Collaboration</span>
            </h3>
            <p className="text-zinc-450 text-zinc-400 text-xs mt-1.5 leading-relaxed text-left">
              Whether you are looking to build a Roblox game model, secure custom full-stack solutions, schedule academic lecturing hours, or hire an ESP language syllabus professional—let's discuss terms!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] text-zinc-500 block mb-1 font-bold uppercase tracking-wider">YOUR NAME</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-3.5 w-3.5 text-zinc-650 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Edgardo Rojas"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 rounded-sm pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500"
                    id="contact-name-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 block mb-1 font-bold uppercase tracking-wider">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-zinc-650 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@domain.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 rounded-sm pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500"
                    id="contact-email-input"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[9px] text-zinc-500 block mb-1 font-bold uppercase tracking-wider">COLLABORATION CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#050508] border border-white/10 rounded-sm px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                id="contact-category-select"
              >
                <option value="Roblox Collaboration">Roblox Game Systems Architecture</option>
                <option value="Full Stack Web Project">Full Stack Platform Engineering</option>
                <option value="Faculty Lecture Booking">Faculty Board & Lecture Inquiries</option>
                <option value="ESP Language Course Coaching">English for Specific Purposes Syllabus Coaching</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] text-zinc-500 block mb-1 font-bold uppercase tracking-wider">MESSAGE PROPOSAL DRAFT</label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-3.5 h-3.5 w-3.5 text-zinc-650 text-zinc-500" />
                <textarea
                  required
                  rows={4}
                  placeholder="Outline the budget, constraints, target audience, and scope of your proposed instruction or engineering framework here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-[#050508] border border-white/10 rounded-sm pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
                  id="contact-body-textarea"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-black font-bold uppercase tracking-wider text-[11px] py-2.5 rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg"
              id="send-proposal-btn"
            >
              <Send className="h-3.5 w-3.5 text-black" />
              Transmit Collaboration Token
            </button>

            {isSubmitted && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-450 text-emerald-400 text-xs flex items-center gap-2" id="success-toast">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                <span className="leading-relaxed">Proposal compiled successfully! Traced record appended instantly to the Local Queue database on the right side.</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Reactive Inbound Queue view */}
        <div className="lg:col-span-6 space-y-4 text-left" id="inbox-tracker">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-indigo-400" />
              Reactive Inbound Queue ({localInbox.length})
            </h4>
            <span className="text-[10px] bg-white/5 text-zinc-400 font-mono border border-white/10 px-2.5 py-0.5 rounded uppercase tracking-wider font-bold">
              Local Session Database
            </span>
          </div>
          <p className="text-zinc-500 text-xs text-left leading-relaxed">Verify your submitted token. Inbound proposals compile in memory instantly below with temporary system metadata status.</p>

          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {localInbox.map((item) => {
              const statusColor = item.assignedStatus === 'Incoming Validation' 
                ? 'bg-amber-950/20 text-amber-400 border-amber-500/20' 
                : item.assignedStatus === 'Response Formulated'
                ? 'bg-emerald-905 bg-emerald-950/20 text-emerald-400 border-emerald-500/20'
                : 'bg-sky-950/20 text-sky-400 border-sky-505 border-sky-500/20';

              const categoryBadge = (item?.category || "").includes("Roblox") 
                ? "bg-rose-950/20 text-rose-400 border-rose-500/20"
                : (item?.category || "").includes("Full Stack")
                ? "bg-[#050508] bg-white/5 text-[#fafafa] text-white border-white/10"
                : (item?.category || "").includes("Faculty")
                ? "bg-[#050508] bg-white/5 text-[#fafafa] text-white border-white/10"
                : "bg-indigo-950/20 text-indigo-400 border-indigo-500/20";

              return (
                <div key={item.id} className="p-5 bg-black/40 border border-white/10 rounded-2xl space-y-3.5 shadow-md hover:border-white/15 transition-all text-left">
                  <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2.5">
                    <div>
                      <h5 className="font-semibold text-white text-xs">{item.senderName}</h5>
                      <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">{item.senderEmail}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${statusColor}`}>
                        {item.assignedStatus}
                      </span>
                      <span className="text-[9px] text-zinc-550 text-zinc-500 font-mono block font-bold">{item.timestamp}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-left">
                    <span className={`text-[9px] rounded px-2.5 py-0.5 font-bold uppercase tracking-wider border ${categoryBadge}`}>
                      {item.category}
                    </span>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed bg-[#050508] p-3.5 rounded-lg border border-white/5 text-justify whitespace-pre-wrap">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
