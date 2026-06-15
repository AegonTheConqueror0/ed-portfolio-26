import { useState, useEffect } from "react";
import { CERTIFICATIONS } from "../data";
import { Certification } from "../types";
import { 
  Award, 
  ShieldCheck, 
  Calendar, 
  FileCheck, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Loader2, 
  Shield, 
  Fingerprint
} from "lucide-react";

export default function CertificationsShowcase() {
  const [activeCert, setActiveCert] = useState<Certification>(CERTIFICATIONS[0]);
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);

  // Reset verification states on cert change
  useEffect(() => {
    setVerificationState('idle');
    setVerificationLogs([]);
  }, [activeCert]);

  const runVerification = () => {
    if (verificationState !== 'idle') return;
    setVerificationState('verifying');
    setVerificationLogs([]);

    const steps = [
      `[AUTH] Initializing credential public key handshake...`,
      `[HASH] Reading hash block for ID: ${activeCert.credentialId}...`,
      `[SHA256] Verifying signatures against ${activeCert.issuer} public record registry...`,
      `[REGISTRY] Resolving metadata: ${activeCert.title}`,
      `[LEDGER] Confirming academic candidate status matches Rojas, E.`,
      `[SUCCESS] Credential validation complete. Digital seal assigned.`
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setVerificationLogs(prev => [...prev, steps[current]]);
        current++;
      } else {
        clearInterval(interval);
        setVerificationState('success');
      }
    }, 350);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left font-sans" id="certifications-main-view">
      
      {/* Intro banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/25 via-[#07070a] to-emerald-950/25 p-6 md:p-8 text-left">
        <div className="relative z-10 max-w-2xl">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#18181b]/60 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            <Award className="h-3.5 w-3.5" />
            Verified Pedagogical & Technical Competency
          </span>
          <h3 className="text-2xl font-light tracking-tight font-display text-white">
            Professional <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Standard Credentials</span>
          </h3>
          <p className="mt-2 text-zinc-400 text-xs md:text-sm leading-relaxed">
            Consolidating certified capabilities across spatial programming constructs, database systems optimization, and collegiate lecturing architectures. Verify real-time credential integrity below.
          </p>
        </div>
      </div>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Certifications selection board (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-1.5">
            <Layers className="h-4 w-4 text-indigo-400" />
            Creds Registry
          </h4>

          {CERTIFICATIONS.map((cert) => {
            const isActive = activeCert.id === cert.id;
            let themeBorder = "border-white/10 hover:border-white/20 bg-white/5";
            let typeBadge = "bg-white/5 text-zinc-400";

            if (cert.certType === "Technical") {
              typeBadge = "bg-rose-950/20 text-rose-400 border-rose-500/20";
            } else if (cert.certType === "Educational") {
              typeBadge = "bg-emerald-950/20 text-emerald-400 border-emerald-500/20";
            } else if (cert.certType === "Academic") {
              typeBadge = "bg-indigo-950/20 text-indigo-400 border-indigo-500/20";
            }

            if (isActive) {
              themeBorder = "bg-white/10 border-indigo-500/70 shadow-lg ring-1 ring-indigo-500/20";
            }

            return (
              <button
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className={`w-full text-left p-4.5 rounded-xl border transition-all duration-200 cursor-pointer block ${themeBorder}`}
                id={`cert-select-btn-${cert.id}`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <h5 className="font-semibold text-white text-xs md:text-sm leading-snug">{cert.title}</h5>
                </div>
                <div className="flex items-center gap-2 mt-2.5">
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${typeBadge}`}>
                    {cert.certType}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono italic">{cert.issuer}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed cert showcase & Verification simulator (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6" id="cert-details-canvas">
          
          {/* Section A: Selected Cert Panel */}
          <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Fingerprint className="h-32 w-32 text-indigo-400" />
            </div>

            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] text-zinc-500 font-mono font-bold block mb-1 uppercase tracking-wider">ISSUED BY {activeCert.issuer}</span>
              <h4 className="text-lg font-bold text-white font-sans">{activeCert.title}</h4>
              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{activeCert.description}</p>
            </div>

            {/* Cert details parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3.5 bg-[#030305] rounded-xl border border-white/5 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider text-zinc-500 mb-1">Credential ID Identifier</span>
                <span className="font-mono text-zinc-300 font-semibold select-all">{activeCert.credentialId}</span>
              </div>
              <div className="p-3.5 bg-[#030305] rounded-xl border border-white/5 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider text-zinc-500 mb-1">Issue / Validation Timeline</span>
                <span className="font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  {activeCert.issueDate}
                </span>
              </div>
            </div>

            {/* Audited competencies tags */}
            <div className="space-y-2">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Audited Skill Competencies Matrix</span>
              <div className="flex flex-wrap gap-1.5">
                {activeCert.skillsVerified.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="text-[10px] bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-1 rounded font-mono font-bold"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section B: Dynamic Verification Console */}
          <div className="rounded-2xl border border-white/10 bg-[#07070a] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
                  Credential Validation Engine
                </h4>
                <p className="text-zinc-500 text-[11px] mt-0.5">Audit signature blocks to confirm professional integrity live.</p>
              </div>

              {verificationState === 'idle' && (
                <button
                  onClick={runVerification}
                  className="bg-indigo-500 hover:bg-indigo-400 text-black font-bold uppercase tracking-wider text-[10px] py-1.5 px-3 rounded-sm cursor-pointer transition-all shrink-0 font-sans"
                  id="run-verification-btn"
                >
                  Verify Signature
                </button>
              )}
            </div>

            {/* State: Verifying or Finished */}
            {verificationState !== 'idle' && (
              <div className="space-y-3.5">
                
                {/* Visual simulator logs */}
                <div className="font-mono text-[10px] p-4 bg-[#030305] rounded-xl border border-white/10 text-zinc-300 space-y-1.5 max-h-[160px] overflow-y-auto">
                  {verificationLogs.map((log, lIdx) => {
                    const isSuccess = log && typeof log === "string" && log.includes("[SUCCESS]");
                    const color = isSuccess ? "text-emerald-400 font-bold" : "text-zinc-400";
                    return (
                      <div key={lIdx} className={`flex items-start gap-1.5 leading-relaxed ${color}`}>
                        <span className="text-emerald-400">⚡</span>
                        <span>{log}</span>
                      </div>
                    );
                  })}
                  {verificationState === 'verifying' && (
                    <div className="flex items-center gap-2 text-indigo-400 text-[10px] pt-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Validating credentials blocks on Davao HCDC network segments...</span>
                    </div>
                  )}
                </div>

                {/* Final Authenticity Seals */}
                {verificationState === 'success' && (
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 bg-emerald-500/10 rounded-sm border border-emerald-500/30 shrink-0">
                        <Shield className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h5 className="font-bold text-emerald-400 text-xs">MATCH FOUND & SIGNATURE VALIDATED</h5>
                        <p className="text-zinc-400 text-[10px] leading-relaxed mt-0.5">
                          Verification hash: <span className="font-mono select-all text-zinc-300">0xae793e...{activeCert.credentialId.slice(-4)}</span> is matching secure ledger files.
                        </p>
                      </div>
                    </div>
                    <div className="border border-emerald-500/40 text-[9px] text-emerald-400 font-mono font-bold tracking-[0.25em] px-3 py-1 rounded bg-black/60 uppercase self-start md:self-auto text-center">
                      AUTHORIZED
                    </div>
                  </div>
                )}
              </div>
            )}

            {verificationState === 'idle' && (
              <div className="flex items-start gap-2 text-[11px] text-zinc-500 italic bg-black/20 p-3.5 rounded-xl border border-white/5">
                <FileCheck className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                <span>Click the button above to execute a cryptographic signature validation check simulating an EDB record handshake.</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
