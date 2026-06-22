/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Cpu,
  Copy,
  Check,
  FileText,
  Download,
  Search,
  Share2,
  Grid,
  FileCode,
  Terminal,
  History,
  BarChart3,
  Database,
  AlertCircle,
  Sliders,
  ChevronRight,
  Info,
  Layers,
  Send,
  RefreshCw,
  File,
  Folder,
  FolderOpen,
  Workflow,
  Sparkle,
  Sun,
  Moon,
  Trash2,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ArrowRight,
  Zap,
  TrendingUp,
  DollarSign,
  Activity,
  Award,
  HelpCircle,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  LayoutGrid
} from "lucide-react";
import {
  PlatformType,
  ToneType,
  PersonaType,
  EmotionType,
  BrandVoiceType,
  GenerationOutput,
  CampaignOutput,
  SEOOutput,
  GenerationRecord
} from "./types";
import { repoFiles } from "./repo_files";

export default function App() {
  // --- Form parameters ---
  const [productName, setProductName] = useState("FitTrack Bio-Band");
  const [description, setDescription] = useState(
    "A biological stress-monitoring wearable that measures heart-rate variability, skin conductance, and automatically alerts you of fatigue cycles."
  );
  const [category, setCategory] = useState("Wearable Biotech & Productivity");
  const [benefits, setBenefits] = useState(
    "- Continual stress bio-feedback with 30-day battery life\n- Aligns focus blocks with natural circadian peaks\n- Subtle haptic alerts for posture adjustment"
  );
  const [targetMarket, setTargetMarket] = useState("Tech-creatives, developers, and hyper-busy desk-workers");
  
  const [platform, setPlatform] = useState<PlatformType>("Instagram");
  const [tone, setTone] = useState<ToneType>("Professional");
  const [persona, setPersona] = useState<PersonaType>("Developers");
  const [emotion, setEmotion] = useState<EmotionType>("Trust");
  const [brandVoice, setBrandVoice] = useState<BrandVoiceType>("None");
  const [customVoice, setCustomVoice] = useState("");
  const [ragInput, setRagInput] = useState("");
  const [ragDocs, setRagDocs] = useState<string[]>([
    "Brand Rule: Always use action-oriented verb stems.",
    "Tagline Guideline: Limit to under 10 memorable words."
  ]);
  
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(1024);

  // --- App theme & layout ---
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"generator" | "variations" | "campaign" | "seo" | "analytics" | "github">("generator");

  // --- App data generation states ---
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [lastOutput, setLastOutput] = useState<GenerationOutput | null>(null);
  const [variations, setVariations] = useState<GenerationOutput[]>([]);
  const [campaignOutput, setCampaignOutput] = useState<CampaignOutput | null>(null);
  const [seoOutput, setSeoOutput] = useState<SEOOutput | null>(null);
  const [history, setHistory] = useState<GenerationRecord[]>([]);

  // --- AI Copilot states ---
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotHistory, setCopilotHistory] = useState<{ instruction: string; explanation: string; timestamp: string }[]>([
    { instruction: "System Initialization", explanation: "Linguistic feedback loops ready.", timestamp: "11:10 AM" }
  ]);

  // --- UI feedback states ---
  const [githubSelectedFile, setGithubSelectedFile] = useState("app.py");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "warning" | "error"; text: string } | null>(null);

  // Load history & default generation from mock data on initial render
  useEffect(() => {
    try {
      const cachedTheme = localStorage.getItem("copycraft_theme");
      if (cachedTheme === "light" || cachedTheme === "dark") {
        setTheme(cachedTheme);
      }
      
      const cached = localStorage.getItem("copycraft_history");
      if (cached) {
        setHistory(JSON.parse(cached));
      } else {
        // Hydrate default history for high fidelity
        const initialHistory: GenerationRecord[] = [
          {
            id: "gen_1",
            timestamp: "10:30 AM 6/22/2026",
            productName: "FitTrack Bio-Band",
            platform: "Instagram",
            tone: "Professional",
            persona: "Developers",
            score: 87,
            content: "🔥 Stop scrolling developers. Keep your loops running and your posture straight with the FitTrack Bio-Band biological tracker..."
          },
          {
            id: "gen_2",
            timestamp: "09:45 AM 6/22/2026",
            productName: "FitTrack Bio-Band",
            platform: "LinkedIn",
            tone: "Persuasive",
            persona: "Startup Founders",
            score: 92,
            content: "Burnout is not a prerequisite for successful scaling. Manage biological workloads securely with continuous stress mapping..."
          }
        ];
        setHistory(initialHistory);
        localStorage.setItem("copycraft_history", JSON.stringify(initialHistory));
      }

      // Pre-populate with high fidelity initial output so the page starts fully populated!
      hydrateStandbyOutputs();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const hydrateStandbyOutputs = () => {
    const backupOutput: GenerationOutput = {
      mainCopy: `🔥 Stop scrolling. If you've been searching for a gamechanger, this is it. Meet **FitTrack Bio-Band**!

Designed specifically for developers and busy creators who are ready to level up their lifestyle. Whether you are dealing with burnout cycles or just looking for raw circadian efficiency, study the metrics:

🌿 Continual stress bio-feedback with 30-day battery life
⚡ Automatically aligns focus blocks with natural circadian peaks
🧘 Subtle haptic alerts for seamless posture correction

"This changed everything about my focus blocks." -- Elite tech lead reviewer.

👉 Click our link in bio to secure yours. Limited early spots available!`,
      shortVersion: "Optimize your workflow and eliminate burnout with the FitTrack Bio-Band stress wearable. Circadian tracking and posture support in a 30-day battery cycle.",
      tagline: "Circadian Power. Eliminate Fatigue with FitTrack.",
      cta1: "🔬 Discover the Circadian Science",
      cta2: "⚡ Claim Your Bio-Band Now",
      hashtags: {
        trending: ["#biohacking", "#productivity", "#flowstate"],
        niche: ["#fittrack", "#developerHealth", "#wearableBiotech"],
        brand: ["#copycraftai", "#ownyourflow"]
      },
      scoring: {
        clarity: 89,
        engagement: 91,
        persuasiveness: 84,
        emotionalAppeal: 88,
        readability: 94,
        seoReadiness: 81,
        overallScore: 88
      },
      viralPotential: "High",
      viralReasoning: "Strong emotional hooks matched with solid biological value pillars. Structured bulleting captures rapid visual scans of busy developers.",
      strengths: [
        "Highly structured layout directing focus to CTA segments.",
        "Emotional target of preventing fatigue resonates with busy tech leaders."
      ],
      improvements: [
        "Mention real-world user social proof metrics.",
        "Include pricing comparisons with standard luxury trackers."
      ]
    };
    setLastOutput(backupOutput);

    setSeoOutput({
      seoTitle: "How to Beat Burnout with FitTrack Bio-Band | Biometric Tech",
      metaDescription: "Discover how the new biological stress coach optimizes circadian focus blocks and corrects posture in a premium 30-day battery design.",
      searchIntent: "Transactional/Informational. Users are researching biosensors to stabilize focus limits.",
      focusKeywordsUsed: ["fittrack bio-band", "circadian focus block", "biological stress Coach"],
      blogIntro: "In our high-pressure workspace of endless notifications and Zoom cascades, biological fatigue has evolved from a temporary strain into a constant roadblock. Most professionals compensate with high doses of caffeine, temporarily spiking focus only to invite deeper recovery crashes later. This is why bio-harmonic wearables are sparking a massive workspace revolution. By mapping underlying heart-rate variability and skin conductances, creators can now schedule high-intensity focus blocks aligned directly with real natural energy peaks."
    });

    setCampaignOutput({
      campaignName: "Operation Bio-Flow Launch Pack",
      campaignSlogan: "Circadian Rhythm: Master Your Flow.",
      platforms: {
        instagram: {
          visualPrompt: "An elegant, matte slate grey wristband lying next to an open premium leather notebook and dark coffee under soft warm laptop lights.",
          caption: `Stop exhausting your daily battery before your device even drains. 🔋

Meet the new **FitTrack Bio-Band**. Built to monitor bio-frequency stress indicators with a 30-day cellular charge, it aligns your deep project blocks securely with circadian energy waves.

👉 Order early access via the link in our bio for 30% off!`
        },
        linkedin: {
          text: `Burnout isn't a modern prerequisite for startup growth. It's a system failure.

At high-velocity desks, the bottleneck isn't raw talent -- it's energy management. That is why we engineered the FitTrack Bio-Band. 

By tracking automatic posture alignments and cardiac stressors, it delivers gentle haptics to release tension before muscle fatigue sets in. Keep your focus sharp, completely charge-free for 30 days.`
        },
        facebookAd: {
          text: `Working 60+ computer desk hours a week and feeling the 3:00 PM crash? 🚨

Take your focus back. FitTrack monitors skin conductance and haptic posture markers in real-time, helping you reclaim circadian health.

🔋 30-Day continuous battery reserves
🧘 Intuitive posture alignment reminders
⚡ Science-backed stress monitoring logs

Click below to claim early bird pricing before spots fill up!`
        },
        email: {
          subject: "The scientific answer to your daily midday focus fatigue 🔬",
          greeting: "Hi focus innovator,",
          body: `Let's be candid. You know the exact feeling of hitting that 3:00 PM mental fog. You reach for another double espresso, but the underlying circadian rhythm is simply depleted.

This is where the FitTrack Bio-Band changes the equation. It tracks physiological heart-rate variability and maps real recovery cycles directly to your desk calendar. No marketing hype -- just pure biometric synchronization.`,
          cta: "⚡ Order Your Circadian Coach"
        },
        youtubeShort: {
          script: `[Visual: Presenter steps forward carrying a beautiful matte slate wristband]
[Audio: "Ever feel like your battery is in the red before lunchtime?"]

[Visual: Fast cut of active dashboard showing high performance recovery curves]
[Audio: "Meet FitTrack. It monitors real-time cardiac fatigue, corrects bad posture, and runs on a 30-day battery."]

[Visual: Text overlay '30-DAY BATTERY RESERVE' glowing in cyan]
[Audio: "Zero daily chargers. Pure energy. Check the description link to claim early bird pricing!"]`
        }
      },
      ctas: ["⚡ Claim Early Pricing", "🔬 Study the Circadian Biotech Specs", "🚀 Deploy to Your Desk Today"],
      hashtags: ["#biohacking", "#burnoutprevention", "#flowstate", "#fittrack"]
    });
  };

  const handleToggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("copycraft_theme", next);
  };

  const addHistoryRecord = (content: string, score: number, targetPlatform: PlatformType) => {
    const record: GenerationRecord = {
      id: "gen_" + Date.now(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
      productName,
      platform: targetPlatform,
      tone,
      persona,
      score,
      content
    };
    const updated = [record, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem("copycraft_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("copycraft_history");
    showStatus("success", "Generations cache cleared successfully.");
  };

  const showStatus = (type: "success" | "warning" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 5000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
    showStatus("success", "Copied to clipboard!");
  };

  const downloadTextFile = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showStatus("success", `Downloaded file: ${filename}`);
  };

  // --- API Calls with Simulating Stepped Progress Loaders ---
  const simulateLoadingLogs = async (onComplete: () => Promise<void>) => {
    setLoading(true);
    setLoadingStep(1); // Spec parsing
    await new Promise(r => setTimeout(r, 600));
    setLoadingStep(2); // RAG index
    await new Promise(r => setTimeout(r, 600));
    setLoadingStep(3); // Psychological rules
    await new Promise(r => setTimeout(r, 600));
    setLoadingStep(4); // LLM response
    
    try {
      await onComplete();
    } catch (e) {
      showStatus("error", "Generation pipeline encountered an API block.");
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };

  // ✍️ 1. Main Copy Generator
  const handleGenerateCopy = () => {
    simulateLoadingLogs(async () => {
      const voiceProfile = brandVoice === "None" ? customVoice : brandVoice;
      const ragContext = ragDocs.join("\n");
      
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          description,
          category,
          benefits,
          targetMarket,
          platform,
          tone,
          persona,
          emotion,
          brandVoiceProfile: voiceProfile,
          ragContext,
          temperature,
          topP,
          maxTokens
        })
      });
      const data = await res.json();
      if (data.error) {
        showStatus("error", data.error);
      } else {
        setLastOutput(data);
        addHistoryRecord(data.mainCopy, data.scoring.overallScore, platform);
        if (data.warning) {
          showStatus("warning", data.warning);
        } else {
          showStatus("success", "Synthesized dynamic copywriting elements successfully!");
        }
      }
    });
  };

  // ⚡ 2. Parallel A/B Variants
  const handleGenerateVariations = () => {
    simulateLoadingLogs(async () => {
      setVariations([]);
      const varTones: { tone: ToneType; title: string }[] = [
        { tone, title: `Variation A (${tone} Preset)` },
        { tone: "Persuasive", title: "Variation B (High Urgency CTA)" },
        { tone: "Inspirational", title: "Variation C (Visionary Story)" }
      ];
      
      const promises = varTones.map(async (v) => {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName,
            description,
            category,
            benefits,
            targetMarket,
            platform,
            tone: v.tone,
            persona,
            emotion,
            temperature: Math.min(1.4, temperature + 0.15),
            topP,
            maxTokens
          })
        });
        const outData = await res.json();
        return {
          ...outData,
          variationTitle: v.title,
          toneUsed: v.tone
        };
      });

      const results = await Promise.all(promises);
      setVariations(results);
      if (results[0]?.scoring?.overallScore) {
        addHistoryRecord(results[0].mainCopy, results[0].scoring.overallScore, platform);
      }
      showStatus("success", "Three high-performance variants compiled side-by-side!");
    });
  };

  // 📣 3. One-Click Campaign Studio
  const handleGenerateCampaign = () => {
    simulateLoadingLogs(async () => {
      const voiceProfile = brandVoice === "None" ? customVoice : brandVoice;
      const res = await fetch("/api/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          description,
          benefits,
          targetMarket,
          tone,
          brandVoiceProfile: voiceProfile,
          temperature
        })
      });
      const data = await res.json();
      if (data.error) {
        showStatus("error", data.error);
      } else {
        setCampaignOutput(data);
        if (data.warning) {
          showStatus("warning", data.warning);
        } else {
          showStatus("success", "Multi-channel campaign deployment models successfully calibrated!");
        }
      }
    });
  };

  // 🔍 4. SEO Keyword Planner
  const handleGenerateSEO = () => {
    simulateLoadingLogs(async () => {
      const keywords = `organic focus, ${productName.toLowerCase()}, anti fatigue wearable, 30 day battery stress tracker`;
      const res = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          description,
          keywords
        })
      });
      const data = await res.json();
      if (data.error) {
        showStatus("error", data.error);
      } else {
        setSeoOutput(data);
        showStatus("success", "Search rankings meta attributes structured successfully.");
      }
    });
  };

  // 🤖 5. Copilot Real-Time Refine Actions
  const handleCopilotAction = async (presetInstruction?: string) => {
    if (!lastOutput) {
      showStatus("warning", "Please generate copywriting text in the writer tab first.");
      return;
    }
    
    const instr = presetInstruction || copilotInput;
    if (!instr.trim()) return;

    setCopilotLoading(true);
    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentCopy: lastOutput.mainCopy,
          userInstruction: instr
        })
      });

      const data = await response.json();
      if (data.error) {
        showStatus("error", data.error);
      } else {
        // Smoothly modify current output
        setLastOutput({
          ...lastOutput,
          mainCopy: data.revisedCopy,
          scoring: {
            ...lastOutput.scoring,
            overallScore: Math.min(100, lastOutput.scoring.overallScore + 2),
            engagement: Math.min(100, lastOutput.scoring.engagement + 4)
          }
        });

        const newLog = {
          instruction: instr,
          explanation: data.explanation || "Refined styling factors.",
          timestamp: new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
        };
        setCopilotHistory([newLog, ...copilotHistory].slice(0, 10));
        setCopilotInput("");
        showStatus("success", "AI Copilot successfully refined active copywriting!");
      }
    } catch (e) {
      showStatus("error", "AI Copilot connection stalled.");
    } finally {
      setCopilotLoading(false);
    }
  };

  // 📔 RAG Index Helpers
  const handleAddRagDoc = () => {
    if (!ragInput.trim()) return;
    setRagDocs([...ragDocs, ragInput.trim()]);
    setRagInput("");
    showStatus("success", "Vector brand guideline indexed in knowledge database.");
  };

  const handleClearRag = () => {
    setRagDocs([]);
    showStatus("success", "Knowledge index flushed clean.");
  };

  // --- Real-time Stats Engines ---
  const computedStats = () => {
    const totalRuns = history.length;
    const scores = history.map(h => h.score);
    const meanScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 88;
    
    // Platform distribution counts
    const platCounts: Record<string, number> = {};
    history.forEach(h => { platCounts[h.platform] = (platCounts[h.platform] || 0) + 1; });
    const topPlat = Object.entries(platCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Instagram";

    // Tone distribution counts
    const toneCounts: Record<string, number> = {};
    history.forEach(h => { toneCounts[h.tone] = (toneCounts[h.tone] || 0) + 1; });
    const topTone = Object.entries(toneCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Professional";
    
    return { totalRuns, meanScore, topPlat, topTone, platCounts, toneCounts };
  };

  const stats = computedStats();

  // --- Live Compiled Prompt String for Visualizer ---
  const getCompiledPromptInfo = () => {
    const voiceLine = brandVoice === "None" ? (customVoice ? `- Style Guideline: ${customVoice}` : "") : `- Adopt Character Style Profile: ${brandVoice}`;
    const ragString = ragDocs.map(r => `  • ${r}`).join("\n") || "  • No custom brand guidelines loaded.";
    
    return `// Dynamic Prompt Assembled & Transmitted to gemini-3.5-flash
SYSTEM: You are CopyCraft AI, an elite SaaS copywriting engine.
CONTEXT TARGETS:
- Category Name: ${category}
- Market Target: ${targetMarket}
${voiceLine}

KNOWLEDGE DISCOVERY (RAG):
${ragString}

VARIABLES:
- Target Platform: ${platform}
- Marketing Tone: ${tone}
- Emotion Trigger: ${emotion}
- Settings: Temp=${temperature}, topP=${topP}, maxTokens=${maxTokens}`;
  };

  // Preset prompts for AI assistant
  const copilotPresets = [
    { label: "🍎 Style minimalist Apple", text: "Adopt Apple minimalist style with very short sentences and huge focus on high luxury design details" },
    { label: "⚡ Nike grit & fire", text: "Transform this entirely into a motivating, energetic, punchy Nike-style motivational grid" },
    { label: "💬 Inject witty humor", text: "Add wittiness, clever startup jokes, and casual high-retention humor" },
    { label: "📱 Shorten into tight tweet", text: "Rewrite the copy to fit under 280 characters with ultra-dense hashtags" },
    { label: "🌎 Translate to Spanish", text: "Translate the entire mainCopy to Spanish whilst holding the professional high-CTR styling" }
  ];

  return (
    <div className={`min-h-screen font-sans ${theme === "dark" ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      
      {/* Dynamic Glowing Ambient Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[8%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 filter blur-[110px] animate-glow-1 opacity-60"></div>
        <div className="absolute bottom-[15%] right-[10%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-indigo-600/15 to-pink-600/15 filter blur-[130px] animate-glow-2 opacity-50"></div>
        <div className="absolute top-[50%] left-[60%] w-[25rem] h-[25rem] rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 filter blur-[90px] animate-glow-3 opacity-40"></div>
      </div>

      {/* Grid Mesh Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${theme === "dark" ? "bg-grid-white opacity-40" : "bg-grid-black opacity-35"}`}></div>

      <div className="relative z-10 flex flex-col min-h-screen backdrop-blur-[1px]">
        
        {/* ==========================================
            🚀 HEADER BAR
           ========================================== */}
        <header className={`sticky top-0 z-50 border-b backdrop-blur-md px-4 py-3 sm:px-6 flex items-center justify-between gap-4 ${
          theme === "dark" ? "bg-slate-900/75 border-slate-800/80" : "bg-white/75 border-slate-200"
        }`}>
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-5.5 h-5.5" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight font-display bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  CopyCraft AI
                </h1>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-blue-500/15 text-blue-500 border border-blue-500/30 font-mono tracking-wider">
                  PRO SaaS
                </span>
              </div>
              <p className={`text-[10.5px] font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                Automated copywriting, tone transformer & keyword auditor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time Status Badges */}
            <div className="hidden md:flex items-center gap-2">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border ${
                theme === "dark" ? "bg-slate-850 border-slate-700/80 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active: gemini-3.5-flash
              </span>
              <span className={`text-[11px] font-semibold py-1 px-2.5 rounded-full border ${
                theme === "dark" ? "bg-indigo-950/40 border-indigo-900/30 text-indigo-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}>
                v2.1 Stable
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleTheme}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                theme === "dark" ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700" : "bg-white border-slate-250 text-slate-700 hover:bg-slate-100"
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </motion.button>
          </div>
        </header>

        {/* Global Toast Status Message */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.95 }}
              className={`fixed top-18 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl border shadow-2xl max-w-md ${
                statusMessage.type === "success"
                  ? "bg-emerald-950/95 border-emerald-500/40 text-emerald-300 backdrop-blur-md"
                  : statusMessage.type === "warning"
                  ? "bg-amber-950/95 border-amber-500/40 text-amber-300 backdrop-blur-md"
                  : "bg-rose-955/95 border-rose-500/40 text-rose-300 backdrop-blur-md"
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div className="text-xs font-semibold">{statusMessage.text}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==========================================
            MAIN FULL-STACK LAYOUT
           ========================================== */}
        <div id="saas_dashboard_frame" className="flex-1 flex flex-col md:flex-row owerflow-hidden relative">
          
          {/* ==========================================
              LEFT BAR: Side Navigation & Collapsed Triggers
             ========================================== */}
          <aside className={`transition-all duration-300 z-30 flex flex-col justify-between shrink-0 border-r ${
            sidebarExpanded ? "w-64" : "w-16"
          } ${
            theme === "dark" ? "bg-slate-900/60 border-slate-800/80" : "bg-white/80 border-slate-205"
          }`}>
            <div className="p-3 space-y-4">
              <div className="flex items-center justify-between px-2.5 pb-2 border-b border-dashed border-slate-800/40">
                {sidebarExpanded && (
                  <span className={`text-[10px] font-bold tracking-widest font-mono ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                    WORKSPACE HUB
                  </span>
                )}
                <button 
                  onClick={() => setSidebarExpanded(!sidebarExpanded)} 
                  className={`p-1 rounded hover:bg-slate-8js hover:bg-opacity-80 mx-auto text-slate-400`}
                >
                  {sidebarExpanded ? <ChevronsLeft className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Sidebar Tab Menu Items */}
              <nav className="space-y-1">
                {[
                  { id: "generator", label: "Writer Pipeline", icon: Sparkle, badge: "AI" },
                  { id: "variations", label: "A/B Multi-Variants", icon: Workflow },
                  { id: "campaign", label: "Campaign Studio", icon: Layers, badge: "New" },
                  { id: "seo", label: "SEO meta compiler", icon: Search },
                  { id: "analytics", label: "Linguistic Analytics", icon: BarChart3 },
                  { id: "github", label: "Workspace Files", icon: FileCode }
                ].map((item) => {
                  const ItemIcon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition-all relative cursor-pointer ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-600/15"
                          : theme === "dark"
                          ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <ItemIcon className="w-4.5 h-4.5 shrink-0" />
                        {sidebarExpanded && <span className="text-xs tracking-tight font-medium">{item.label}</span>}
                      </div>

                      {sidebarExpanded && item.badge && (
                        <span className={`px-1.5 py-0.2 text-[8px] font-bold rounded uppercase ${
                          active ? "bg-white text-blue-700" : "bg-blue-500/10 text-blue-400"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick stats miniature preview when expanded */}
            {sidebarExpanded && (
              <div className={`p-4 m-3 rounded-2xl border text-xs space-y-2.5 ${
                theme === "dark" ? "bg-slate-950/70 border-slate-850" : "bg-slate-50 border-slate-150"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 block font-mono text-[9.5px]">API QUOTA STATUS</span>
                  <span className="text-emerald-500 font-bold font-mono text-[9px] hover:underline">98.4%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-emerald-500 h-full w-[94.2%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  You have generated <span className="font-bold text-slate-300">{history.length} posts</span> using standard cloud integrations.
                </p>
              </div>
            )}
          </aside>

          {/* ==========================================
              MIDDLE COLUMN: Input Parameters Panel (1/3 of Workspace)
             ========================================== */}
          <section id="inputs_column" className={`md:w-80 shrink-0 border-r p-5 space-y-5 overflow-y-auto ${
            theme === "dark" ? "bg-slate-950/45 border-slate-800/80" : "bg-slate-100/50 border-slate-205"
          }`}>
            
            {/* specs parameter header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-850/40">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 font-display flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Parameters Engine
              </span>
              <span className={`text-[9.5px] font-mono rounded px-1 ${theme === "dark" ? "bg-slate-900 text-slate-500" : "bg-slate-200 text-slate-500"}`}>
                Dynamic
              </span>
            </div>

            {/* Speeds specs fields inputs */}
            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-400 mb-1">Product / Brand Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600 focus:border-blue-500" : "bg-white border-slate-250 text-slate-800 placeholder-slate-400 focus:border-blue-500"
                  }`}
                  placeholder="e.g. FitTrack Bio-Band"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Product Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600" : "bg-white border-slate-250 text-slate-800"
                  }`}
                  placeholder="e.g. Health Biotech Tracker"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Raw Description / Concept</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs resize-none transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600" : "bg-white border-slate-250 text-slate-800"
                  }`}
                  placeholder="Describe your core unique design..."
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Value Props (One per line)</label>
                <textarea
                  rows={3}
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-[11px] font-mono resize-none transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600" : "bg-white border-slate-250 text-slate-800"
                  }`}
                  placeholder="- 30-day battery cell..."
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Persona Demographics</label>
                <input
                  type="text"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs transition-all focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600" : "bg-white border-slate-250 text-slate-800"
                  }`}
                  placeholder="e.g. startup developers & Busy students"
                />
              </div>
            </div>

            {/* Vibe and Style Selector Box */}
            <div className="pt-4 border-t border-dashed border-slate-800/40 space-y-4 text-xs font-medium">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 font-display block">Vibe Tuning</span>
              
              <div>
                <label className="block text-slate-400 mb-1">Target Network Outlet</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PlatformType)}
                  className={`w-full border rounded-lg p-2 text-xs focus:outline-none ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-250 text-slate-800"
                  }`}
                >
                  <option value="Instagram">Instagram Caption</option>
                  <option value="LinkedIn">LinkedIn Storytelling</option>
                  <option value="Email">Email Marketing campaign</option>
                  <option value="Facebook">Facebook Direct Ad</option>
                  <option value="Twitter">Twitter/X Thread Hook</option>
                  <option value="YouTube">YouTube script storyboard</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Linguistic Tone Profile</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ToneType)}
                  className={`w-full border rounded-lg p-2 text-xs focus:outline-none ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-250 text-slate-00"
                  }`}
                >
                  <option value="Professional">💼 Professional (Authoritative)</option>
                  <option value="Friendly">😊 Friendly (approachable & warm)</option>
                  <option value="Casual">☕ Casual (conversational close friend)</option>
                  <option value="Luxury">✨ Luxury (exclusive status craft)</option>
                  <option value="Humorous">😄 Humorous (witty & witty)</option>
                  <option value="Persuasive">🔥 Persuasive (action-directed story)</option>
                  <option value="Inspirational">🌟 Inspirational (visionary growth)</option>
                  <option value="Storytelling">📖 Storytelling (AIDA Framework)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Core Trigger Emotion</label>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value as EmotionType)}
                  className={`w-full border rounded-lg p-2 text-xs focus:outline-none ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-250 text-slate-800"
                  }`}
                >
                  <option value="Trust">🤝 Trust (proofs & metrics)</option>
                  <option value="Urgency">⏰ Urgency (scarcity & countdowns)</option>
                  <option value="Excitement">⚡ Excitement (vibrance & power)</option>
                  <option value="Luxury">💎 Luxury (exclusive heritage)</option>
                  <option value="Curiosity">👁️ Curiosity (loops & open gates)</option>
                  <option value="FOMO">⏳ FOMO (social validations)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Brand Voice Blueprint</label>
                <select
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value as BrandVoiceType)}
                  className={`w-full border rounded-lg p-2 text-xs focus:outline-none ${
                    theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-250 text-slate-00"
                  }`}
                >
                  <option value="None">Creative AI Standard Mode</option>
                  <option value="Apple"> Apple Mini (minimalist luxury)</option>
                  <option value="Nike">✓ Nike Grit (athletic raw resolve)</option>
                  <option value="Tesla">⚡ Tesla profile (revolutionary engineering)</option>
                  <option value="Startup">⚡ Disruptor Startup (bold & playful)</option>
                </select>
              </div>
            </div>

            {/* Live Parameter Sliders */}
            <div className="pt-4 border-t border-dashed border-slate-800/40 space-y-3.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 font-display block">Advanced Inference Parameters</span>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Temperature</span>
                  <span className="font-mono text-slate-500 font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Top-P</span>
                  <span className="font-mono text-slate-500 font-bold">{topP}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* RAG Section */}
            <div className={`p-3 rounded-2xl border ${
              theme === "dark" ? "bg-slate-900/40 border-slate-850" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800/40">
                <span className="text-[10.5px] font-bold text-emerald-400 flex items-center gap-1.5 font-display">
                  <Database className="w-3.5 h-3.5" /> Brand Guidelines (RAG)
                </span>
                {ragDocs.length > 0 && (
                  <button onClick={handleClearRag} className="text-[9.5px] text-rose-400 hover:underline cursor-pointer">
                    Flush
                  </button>
                )}
              </div>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={ragInput}
                  onChange={(e) => setRagInput(e.target.value)}
                  placeholder="e.g. Always write tone-first..."
                  className={`flex-1 border rounded px-2.5 py-1 text-[11px] focus:outline-none focus:border-emerald-500 ${
                    theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-800"
                  }`}
                />
                <button
                  onClick={handleAddRagDoc}
                  className="px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition-all"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {ragDocs.map((doc, idx) => (
                  <div key={idx} className={`p-1 px-2 text-[9.5px] font-mono border rounded truncate flex items-center justify-between ${
                    theme === "dark" ? "bg-slate-950/80 border-slate-800 text-emerald-400" : "bg-emerald-50 border-emerald-100 text-emerald-800"
                  }`}>
                    <span className="truncate">🔖 {doc}</span>
                  </div>
                ))}
                {ragDocs.length === 0 && (
                  <p className="text-[10px] text-slate-500 italic text-center py-1">No custom constraints indexed.</p>
                )}
              </div>
            </div>

          </section>

          {/* ==========================================
              ACTIVE WORKSPACE CONTAINER (Middle/Right)
             ========================================== */}
          <section id="workspace_viewport" className="flex-1 p-5 lg:p-7 overflow-y-auto flex flex-col space-y-6 relative">
            
            {/* Real-time Stepped Generation Progress Banner */}
            <AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`rounded-2xl border p-4 shadow-xl overflow-hidden backdrop-blur-md ${
                    theme === "dark" ? "bg-slate-900/90 border-blue-500/35 text-slate-100" : "bg-blue-50/90 border-blue-200 text-slate-800"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                        <Cpu className="w-5 h-5 animate-spin" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-widest font-display text-blue-400">
                          CopyCraft Synthesis Engine Active
                        </h4>
                        <p className="text-[11px] text-slate-400">Continuous prompt tuning & Gemini routing</p>
                      </div>
                    </div>
                    {/* Progress percentage slider */}
                    <div className="text-xs font-mono font-bold text-blue-400">
                      Step {loadingStep} of 4: {
                        loadingStep === 1 ? "Parsing target specifications" : 
                        loadingStep === 2 ? "Indexing vector RAG guidelines" : 
                        loadingStep === 3 ? "Assembling emotional trigger directives" : 
                        "Executing deep Gemini Flash response payload"
                      }
                    </div>
                  </div>
                  {/* Stepper bar loaders layout */}
                  <div className="grid grid-cols-4 gap-2 mt-3.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="space-y-1">
                        <div className={`h-1.5 rounded-full transition-all duration-300 ${
                          step <= loadingStep 
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                            : theme === "dark" ? "bg-slate-800" : "bg-slate-200"
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==========================================
                TAB 1: ✍️ MAIN COPYWRITER PIPELINE
               ========================================== */}
            {activeTab === "generator" && (
              <div className="space-y-6">
                
                {/* Modern KPI Widgets Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Performance Potency", value: lastOutput ? `${lastOutput.scoring.overallScore}%` : "--", icon: Award, color: "text-blue-500", desc: "AIDA score matrix" },
                    { label: "Linguistic Clarity", value: lastOutput ? `${lastOutput.scoring.clarity}%` : "--", icon: Activity, color: "text-purple-500", desc: "Grammar & structure" },
                    { label: "Viral Index Fit", value: lastOutput ? lastOutput.viralPotential : "--", icon: TrendingUp, color: "text-rose-500", desc: "Psychological weight" },
                    { label: "Est. API Fee Log", value: lastOutput ? "$0.00018" : "--", icon: DollarSign, color: "text-emerald-500", desc: "Estimated token price" }
                  ].map((widget, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className={`p-4 rounded-2xl border transition-all relative overflow-hidden backdrop-blur-xl ${
                        theme === "dark" ? "bg-slate-900/55 border-slate-850/90 glow-card-dark" : "bg-white/90 border-slate-200 glow-card-light"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                          {widget.label}
                        </span>
                        <widget.icon className={`w-4 h-4 ${widget.color}`} />
                      </div>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold font-display leading-none">
                          {widget.value}
                        </span>
                      </div>
                      <span className="text-[9.5px] text-slate-500 block mt-1 tracking-tight">{widget.desc}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Main Text Content Stage Box */}
                <div className={`p-6 rounded-3xl border relative overflow-hidden ${
                  theme === "dark" ? "bg-slate-900/35 border-slate-800/80" : "bg-white border-slate-205"
                }`}>
                  
                  <div className="flex items-center justify-between border-b border-dashed border-slate-800/40 pb-4 mb-4 gap-3">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-display">
                        <Sparkle className="w-4 h-4 text-blue-500" /> Active Copywriting output
                      </h3>
                      <p className="text-[11px] text-slate-500">Optimized layout mapping emotional targets</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleGenerateCopy}
                        disabled={loading}
                        className="px-4 py-2 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/10 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
                      >
                        <Zap className="w-3.5 h-3.5" /> Synthesize Copy
                      </button>
                    </div>
                  </div>

                  {/* SKELETON LOADER DISPLAY */}
                  {loading ? (
                    <div className="space-y-4 py-6">
                      <div className="h-4 bg-slate-800/60 rounded animate-pulse w-1/3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-800/40 rounded animate-pulse w-full"></div>
                        <div className="h-3 bg-slate-800/40 rounded animate-pulse w-5/6"></div>
                        <div className="h-3 bg-slate-800/40 rounded animate-pulse w-4/5"></div>
                      </div>
                      <div className="h-4 bg-slate-800/30 rounded animate-pulse w-1/4"></div>
                    </div>
                  ) : lastOutput ? (
                    <div className="space-y-6">
                      
                      {/* Interactive block body */}
                      <div className={`p-5 rounded-2xl border transition-all relative group overflow-hidden ${
                        theme === "dark" ? "bg-slate-950/70 border-slate-850/80" : "bg-slate-50 border-slate-200"
                      }`}>
                        
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 z-20">
                          <button
                            onClick={() => handleCopy(lastOutput.mainCopy, "main_copy_btn")}
                            className={`p-1 px-2.5 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 shadow-md transition-colors cursor-pointer ${
                              theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" : "bg-white border-slate-205 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {copiedText === "main_copy_btn" ? (
                              <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</>
                            ) : (
                              <><Copy className="w-3.5 h-3.5" /> Copy</>
                            )}
                          </button>
                        </div>

                        <div className="text-[10px] font-mono text-blue-500 font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                          {platform} COPYWRITING SUITE
                        </div>

                        <p className={`text-xs sm:text-xs leading-relaxed whitespace-pre-wrap font-sans ${theme === "dark" ? "text-slate-20s" : "text-slate-800"}`}>
                          {lastOutput.mainCopy}
                        </p>
                      </div>

                      {/* Tagline & Short Variation Box */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-950/50 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                          <span className="text-[9.5px] font-mono text-purple-400 block font-bold uppercase tracking-widest mb-1">
                            MEMORABLE BRAND SLOGAN
                          </span>
                          <p className={`text-xs italic font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                            "{lastOutput.tagline}"
                          </p>
                        </div>

                        <div className={`p-4 rounded-xl border ${theme === "dark" ? "bg-slate-950/50 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                          <span className="text-[9.5px] font-mono text-cyan-400 block font-bold uppercase tracking-widest mb-1">
                            SCROLL-STOPPING MICRO CAPTION
                          </span>
                          <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                            {lastOutput.shortVersion}
                          </p>
                        </div>
                      </div>

                      {/* CTA Cards */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-wider">
                          DEPLOYABLE CALLS-TO-ACTION (CTA)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "CTA Primary (Direct Action)", val: lastOutput.cta1, key: "cta1" },
                            { label: "CTA Secondary (Urgency Pull)", val: lastOutput.cta2, key: "cta2" }
                          ].map((cta, idx) => (
                            <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                              theme === "dark" ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"
                            }`}>
                              <div className="truncate">
                                <span className="text-[8.5px] text-slate-500 uppercase block font-mono font-bold">{cta.label}</span>
                                <span className={`text-[11px] font-bold truncate block ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                                  {cta.val}
                                </span>
                              </div>
                              <button
                                onClick={() => handleCopy(cta.val, cta.key)}
                                className={`p-1.5 rounded-lg border cursor-pointer hover:bg-slate-800/80 text-slate-400 hover:text-white ${
                                  theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                                }`}
                              >
                                {copiedText === cta.key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hashtags Segment */}
                      <div className={`p-4 rounded-xl border space-y-2.5 ${
                        theme === "dark" ? "bg-slate-950/60 border-slate-850" : "bg-slate-50 border-slate-200"
                      }`}>
                        <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Linguistic Hashtag Packs</span>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-500 block text-[9px] mb-1">TRENDING</span>
                            <div className="flex flex-wrap gap-1.5">
                              {lastOutput.hashtags.trending.map((h, i) => <span key={i} className="text-blue-400 select-all hover:underline">{h}</span>)}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] mb-1 font-bold">NICHE TARGETS</span>
                            <div className="flex flex-wrap gap-1.5">
                              {lastOutput.hashtags.niche.map((h, i) => <span key={i} className="text-purple-400 select-all hover:underline">{h}</span>)}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] mb-1">BRAND SIGNATURE</span>
                            <div className="flex flex-wrap gap-1.5">
                              {lastOutput.hashtags.brand.map((h, i) => <span key={i} className="text-emerald-400 select-all hover:underline">{h}</span>)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strengths & Weaknesses Bullet blocks */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl border ${
                          theme === "dark" ? "bg-emerald-950/15 border-emerald-900/30" : "bg-emerald-50/60 border-emerald-100"
                        }`}>
                          <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2 font-display">✓ STRENGTHS REPORT</h5>
                          {lastOutput.strengths.map((s, idx) => (
                            <div key={idx} className={`text-xs mb-1 flex items-start gap-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                              <span className="text-emerald-500 font-bold mt-0.5">✦</span>
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>

                        <div className={`p-4 rounded-xl border ${
                          theme === "dark" ? "bg-rose-950/10 border-rose-900/20" : "bg-rose-50/60 border-rose-100"
                        }`}>
                          <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 font-display">⚠️ REFINEMENT RECOMMENDATIONS</h5>
                          {lastOutput.improvements.map((i, idx) => (
                            <div key={idx} className={`text-xs mb-1 flex items-start gap-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                              <span className="text-rose-500 font-bold mt-0.5">✦</span>
                              <span>{i}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Exporters and downloads center footer inside tab */}
                      <div className="pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500">CopyCraft Export Hub</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadTextFile(lastOutput.mainCopy, `${productName.toLowerCase().replace(/\s+/g, '_')}_copy.txt`)}
                            className={`px-3 py-2 border rounded-xl icon-only text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <Download className="w-3.5 h-3.5 text-blue-400" /> Download Text
                          </button>
                          
                          <button
                            onClick={() => downloadTextFile(`### ${productName} Launch copy\n\n${lastOutput.mainCopy}`, `${productName.toLowerCase().replace(/\s+/g, '_')}_copysub.md`)}
                            className={`px-3 py-2 border rounded-xl icon-only text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600"
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5 text-purple-400" /> Export MD Schema
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="p-4 bg-slate-900 rounded-full text-slate-600">
                        <Sparkles className="w-10 h-10 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-400 text-sm uppercase">No Content Synthesized Yet</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                          Choose your parameters in the left controller column, then push generate to boot the gemini compiler.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* ==========================================
                    LIVE PROMPT CONTEXT VISUALIZER (INCLUDED)
                   ========================================== */}
                <div className={`p-5 rounded-2xl border font-mono text-[10.5px] ${
                  theme === "dark" ? "bg-slate-900/50 border-slate-800/80 text-blue-400" : "bg-slate-100 border-slate-200 text-slate-800"
                }`}>
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800/40">
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider">LIVE PROMPT CONTEXT VECTOR</span>
                    <span className="text-[9.5px] font-bold text-blue-500 uppercase">Compiled</span>
                  </div>
                  <pre className="whitespace-pre-wrap overflow-x-auto max-h-40 leading-relaxed text-left font-mono">
                    {getCompiledPromptInfo()}
                  </pre>
                </div>

              </div>
            )}

            {/* ==========================================
                TAB 2: ⚡ A/B VARIATION HUB
               ========================================== */}
            {activeTab === "variations" && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 font-display">
                      <Workflow className="w-5 h-5 text-purple-500 animate-pulse" /> A/B/C Multi-Variant Matrix
                    </h3>
                    <p className="text-[11px] text-slate-500">Compare three independent psychological tone sets side-by-side</p>
                  </div>

                  <button
                    onClick={handleGenerateVariations}
                    className="px-4 py-2 bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    Generate Variations Matrix
                  </button>
                </div>

                {variations.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {variations.map((v, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                          theme === "dark" ? "bg-slate-900/45 border-slate-800/80" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start border-b border-slate-900 pb-2.5">
                            <div>
                              <span className="text-xs font-bold text-purple-400 block tracking-tight">#{idx + 1}: {v.variationTitle}</span>
                              <span className="text-[10px] text-slate-500 uppercase font-mono">Tone: {v.toneUsed || tone}</span>
                            </div>
                            <div className="px-2 py-0.5 bg-purple-950/40 text-purple-400 border border-purple-900/40 rounded-full font-mono font-bold text-[9px]">
                              Score: {v.scoring?.overallScore}/100
                            </div>
                          </div>

                          <p className={`text-xs leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap font-sans ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                            {v.mainCopy}
                          </p>
                        </div>

                        <div className={`pt-3.5 border-t border-slate-850 space-y-3 text-[11px]`}>
                          <div>
                            <span className="text-[8.5px] uppercase font-mono text-slate-500 block font-bold">TAGLINE</span>
                            <span className="italic block mt-0.5 text-slate-300">"{v.tagline}"</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCopy(v.mainCopy, `var_${idx}`)}
                              className="flex-1 py-1 px-3 border border-slate-800 hover:border-slate-705 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 bg-slate-950/60"
                            >
                              {copiedText === `var_${idx}` ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                            </button>
                            <button
                              onClick={() => downloadTextFile(v.mainCopy, `variation_${idx + 1}.txt`)}
                              className="p-1 px-2 border border-slate-850 rounded-lg text-slate-500 hover:text-white"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className={`p-20 rounded-3xl border border-dashed text-center space-y-4 ${
                    theme === "dark" ? "bg-slate-900/35 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className="p-4 bg-slate-900 rounded-full text-purple-500 inline-block">
                      <Workflow className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm">No Psychological Alternative Variants Loaded</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                        Execute parallel inference tests dynamically to synthesize multiple marketing directions for A/B conversion tests immediately.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ==========================================
                TAB 3: 📣 CAMPAIGN ROLLOUT COGNITIVE STUDIO
               ========================================== */}
            {activeTab === "campaign" && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 font-display">
                      <Layers className="w-5 h-5 text-rose-500 animate-pulse" /> Multi-Platform Campaign Rollout Center
                    </h3>
                    <p className="text-[11px] text-slate-500">Synchronize content, visual prompters, and direct mailings in an organic cohort</p>
                  </div>

                  <button
                    onClick={handleGenerateCampaign}
                    className="px-4 py-2 bg-gradient-to-tr from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Deploy Full Campaign
                  </button>
                </div>

                {campaignOutput ? (
                  <div className="space-y-6">
                    
                    {/* Campaign Info header block */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl border ${
                      theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200"
                    }`}>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase block font-mono font-bold">CAMPAIGN SYNONYM</span>
                        <span className="text-sm font-bold text-slate-300 font-display">{campaignOutput.campaignName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase block font-mono font-bold font-semibold">OVERARCHING CAMPAIGN SLOGAN</span>
                        <span className="text-sm font-bold italic text-rose-400 font-display">"{campaignOutput.campaignSlogan}"</span>
                      </div>
                    </div>

                    {/* bento grid of platform components */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* instagram block */}
                      <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                        theme === "dark" ? "bg-slate-950/70 border-slate-850/80" : "bg-white border-slate-200"
                      }`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-pink-400">📸 Instagram Caption & Image Blueprint</span>
                            <button onClick={() => handleCopy(campaignOutput.platforms.instagram.caption, "camp_ig")} className="text-slate-500 hover:text-white">
                              {copiedText === "camp_ig" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <div className={`p-3 rounded-lg text-[10.5px] italic leading-normal border ${
                            theme === "dark" ? "bg-slate-900/60 border-slate-850/50 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-600"
                          }`}>
                            <span className="font-mono text-slate-500 font-bold block pb-1 text-[9px] uppercase">MIDJOURNEY/CANVA VISUAL BLUEPRINT</span>
                            "{campaignOutput.platforms.instagram.visualPrompt}"
                          </div>
                          <p className={`text-xs leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>
                            {campaignOutput.platforms.instagram.caption}
                          </p>
                        </div>
                      </div>

                      {/* LinkedIn block */}
                      <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                        theme === "dark" ? "bg-slate-950/70 border-slate-850/80" : "bg-white border-slate-200"
                      }`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-blue-400">💼 LinkedIn Corporate Thought Leadership</span>
                            <button onClick={() => handleCopy(campaignOutput.platforms.linkedin.text, "camp_li")} className="text-slate-500 hover:text-white">
                              {copiedText === "camp_li" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <p className={`text-xs leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>
                            {campaignOutput.platforms.linkedin.text}
                          </p>
                        </div>
                      </div>

                      {/* Integrated email block */}
                      <div className={`p-5 rounded-2xl border md:col-span-2 space-y-3 ${
                        theme === "dark" ? "bg-slate-950/70 border-slate-850/80" : "bg-white border-slate-200"
                      }`}>
                        <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-1.5 font-display">
                            📬 Cold Email Lead Sequence (High Open-Rate)
                          </span>
                          <button
                            onClick={() => handleCopy(`Subject: ${campaignOutput.platforms.email.subject}\n\n${campaignOutput.platforms.email.greeting}\n\n${campaignOutput.platforms.email.body}`, "camp_em")}
                            className="text-slate-500 hover:text-white"
                          >
                            {copiedText === "camp_em" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="space-y-3 text-xs pl-2 border-l-2 border-amber-500/40">
                          <div>
                            <span className="text-[10px] text-slate-500 font-mono block">SUBJECT HEADER</span>
                            <span className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{campaignOutput.platforms.email.subject}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 font-mono block">Greeting</span>
                            <span className="text-slate-400">{campaignOutput.platforms.email.greeting}</span>
                          </div>
                          <p className={`text-xs leading-relaxed whitespace-pre-wrap ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                            {campaignOutput.platforms.email.body}
                          </p>
                          <div>
                            <span className="text-[8.5px] uppercase font-mono text-slate-500 block">ACTION BUTTON CTA</span>
                            <span className="p-1 px-2 text-[10px] font-bold bg-amber-500/10 text-amber-500 rounded border border-amber-500/20 font-mono">
                              {campaignOutput.platforms.email.cta}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Exporter triggers */}
                    <div className="pt-3 border-t border-slate-850/40 flex justify-between">
                      <span className="text-xs text-slate-500">Exporter Pack v2.1</span>
                      <button
                        onClick={() => downloadTextFile(JSON.stringify(campaignOutput, null, 2), `${productName.toLowerCase().replace(/\s+/g, '_')}_campaign_pack.json`)}
                        className={`px-4 py-2 border rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <Download className="w-3.5 h-3.5 inline mr-1" /> Download JSON Package
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className={`p-20 rounded-3xl border border-dashed text-center space-y-4 ${
                    theme === "dark" ? "bg-slate-900/35 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className="p-4 bg-slate-900 rounded-full text-rose-500 inline-block">
                      <Layers className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm">No Active Deployments Rendered</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Compile synchronized corporate launch suites spanning visual platforms, direct mailings, and short video scripts simultaneously straight from here.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ==========================================
                TAB 4: 🔍 SEO KEYWORD PLANNER
               ========================================== */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 font-display">
                      <Search className="w-5 h-5 text-emerald-400" /> Search Engine SEO Optimizer
                    </h3>
                    <p className="text-[11px] text-slate-500">Formulate high-engagement search titles, meta descriptions, and blog hooks</p>
                  </div>

                  <button
                    onClick={handleGenerateSEO}
                    className="px-4 py-2 bg-gradient-to-tr from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    Build SEO Elements
                  </button>
                </div>

                {seoOutput ? (
                  <div className="space-y-6">
                    
                    {/* Google SERP Simulator layout (High-fidelity design) */}
                    <div className={`p-5 rounded-2xl border space-y-3 ${
                      theme === "dark" ? "bg-slate-950/70 border-slate-850/80" : "bg-white border-slate-200"
                    }`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                        <span className="text-[10px] font-mono text-slate-500">GOOGLE SEARCH RESULTS SIMULATOR</span>
                        <div className="flex gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/30"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/30"></span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1 text-left font-sans pl-1">
                        <div className={`text-[11px] font-mono truncate flex items-center gap-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          🔍 https://www.google.com › organic-hub › {productName.toLowerCase().replace(/\s+/g, '-')}
                        </div>
                        <h4 className="text-[15px] font-bold text-blue-500 hover:underline cursor-pointer select-all font-display">
                          {seoOutput.seoTitle}
                        </h4>
                        <p className={`text-xs leading-relaxed max-w-xl select-all ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                          <span className="font-mono text-[10px] text-slate-500 mr-1 font-bold">10 mins ago —</span>
                          {seoOutput.metaDescription}
                        </p>
                      </div>
                    </div>

                    {/* SEO Parameters summary cards */}
                    <div className={`p-4 rounded-xl border space-y-3.5 ${
                      theme === "dark" ? "bg-slate-900/30 border-slate-850" : "bg-slate-100 border-slate-200"
                    }`}>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block font-bold leading-normal">
                        AUDITED LINGUISTIC RATINGS
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-550 block font-mono text-[9px] mb-1 font-bold">PRIMARY INTENT SPECTRUM</span>
                          <span className={`font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>
                            {seoOutput.searchIntent}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-550 block font-mono text-[9px] mb-1 font-bold">INDEXED KEYWORDS UTILIZED</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {seoOutput.focusKeywordsUsed.map((kw, i) => (
                              <span key={i} className="p-1 px-2.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] rounded-md border border-emerald-500/20">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blog Column intro header copy */}
                    <div className={`p-5 rounded-2xl border space-y-3 relative group ${
                      theme === "dark" ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-200"
                    }`}>
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className="text-xs font-bold text-purple-400 font-display">📝 Corporate Blog/Article Editorial Slogan Suffix</span>
                        <button onClick={() => handleCopy(seoOutput.blogIntro, "seo_blog")} className="text-slate-500 hover:text-white">
                          {copiedText === "seo_blog" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className={`text-xs leading-relaxed font-sans ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        {seoOutput.blogIntro}
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className={`p-20 rounded-3xl border border-dashed text-center space-y-4 ${
                    theme === "dark" ? "bg-slate-900/35 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className="p-4 bg-slate-900 rounded-full text-emerald-500 inline-block">
                      <Search className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm">No SEO Mapping Available</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Index search intent, focus keywords density, and draft metadata cards immediately dynamically formatted and ready to deploy.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ==========================================
                TAB 5: 📊 LINGUISTIC ANALYTICS DASHBOARD
               ========================================== */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 font-display">
                      <BarChart3 className="w-5 h-5 text-indigo-500 animate-pulse" /> Linguistic Cache & Analytics Dashboard
                    </h3>
                    <p className="text-[11px] text-slate-500">Monitor overall styling trends, platform distributions, and conversion scoring logs</p>
                  </div>

                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs px-3 py-1.5 border border-rose-900 bg-rose-950/30 text-rose-400 hover:bg-rose-950/50 rounded-xl cursor-pointer font-bold transition-all"
                    >
                      Flush Cache Logs
                    </button>
                  )}
                </div>

                {history.length > 0 ? (
                  <div className="space-y-6">
                    
                    {/* Modern Analytics Grid cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`p-4 rounded-xl border text-center ${theme === "dark" ? "bg-slate-900/50 border-slate-850" : "bg-white border-slate-200"}`}>
                        <span className="text-[8.5px] uppercase font-mono text-slate-500 block font-bold mb-1">TOTAL EXECUTIONS</span>
                        <span className="text-2xl font-extrabold text-blue-500 font-display">{stats.totalRuns}</span>
                      </div>
                      <div className={`p-4 rounded-xl border text-center ${theme === "dark" ? "bg-slate-900/50 border-slate-850" : "bg-white border-slate-200"}`}>
                        <span className="text-[8.5px] uppercase font-mono text-slate-500 block font-bold mb-1">MEAN CONVERSION SCORE</span>
                        <span className="text-2xl font-extrabold text-purple-500 font-display">{stats.meanScore}/100</span>
                      </div>
                      <div className={`p-4 rounded-xl border text-center ${theme === "dark" ? "bg-slate-900/50 border-slate-850" : "bg-white border-slate-200"}`}>
                        <span className="text-[8.5px] uppercase font-mono text-slate-500 block font-bold mb-1">PRIMARY PLATFORM</span>
                        <span className="text-sm font-extrabold text-emerald-400 font-display block truncate mt-1">{stats.topPlat}</span>
                      </div>
                      <div className={`p-4 rounded-xl border text-center ${theme === "dark" ? "bg-slate-900/50 border-slate-850" : "bg-white border-slate-200"}`}>
                        <span className="text-[8.5px] uppercase font-mono text-slate-500 block font-bold mb-1">PREVALENT TONE SET</span>
                        <span className="text-sm font-extrabold text-amber-500 font-display block truncate mt-1">{stats.topTone}</span>
                      </div>
                    </div>

                    {/* Beautiful custom interactive dashboard graph */}
                    <div className={`p-5 rounded-3xl border space-y-4 ${
                      theme === "dark" ? "bg-slate-900/35 border-slate-800/80" : "bg-white border-slate-200"
                    }`}>
                      <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                        <span className="text-xs font-bold font-mono text-slate-400 leading-normal uppercase">
                          Execution Distribution across Marketing Channels
                        </span>
                        <span className="text-[9.5px] font-mono text-indigo-400 uppercase">Live telemetry</span>
                      </div>

                      <div className="flex h-36 items-end justify-between gap-3 pt-4 px-2">
                        {["Instagram", "LinkedIn", "Email", "Facebook", "Twitter", "YouTube"].map((platName) => {
                          const count = stats.platCounts[platName] || 0;
                          const maxCount = Math.max(...Object.values(stats.platCounts), 1);
                          const pct = (count / maxCount) * 100;
                          return (
                            <div key={platName} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                              <span className="text-[9.5px] font-bold text-slate-400 font-mono">{count}</span>
                              <div
                                style={{ height: `${Math.max(15, pct)}%` }}
                                className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 rounded-lg transition-all cursor-pointer relative group shadow-md"
                              >
                                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950 border border-slate-800 p-1 px-2 rounded font-mono text-[9px] text-white whitespace-nowrap z-30 shadow-lg">
                                  {platName}: {count} posts
                                </div>
                              </div>
                              <span className="text-[9.5px] font-mono text-slate-500 truncate w-full text-center">
                                {platName.slice(0, 5)}.
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Historical Logs List */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold tracking-wider text-slate-400 uppercase font-mono">
                        Persistent History Queue Index
                      </span>
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                        {history.map((record) => (
                          <div key={record.id} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
                            theme === "dark" ? "bg-slate-950 border-slate-850/80 hover:border-slate-800" : "bg-white border-slate-200"
                          }`}>
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className={`text-[11.5px] font-bold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                                  {record.productName}
                                </span>
                                <span className="px-1.5 py-0.2 border rounded bg-slate-900 border-slate-800 text-[8.5px] font-mono text-slate-400">
                                  {record.platform}
                                </span>
                              </div>
                              <span className="text-[9.5px] block font-mono text-slate-500 mt-0.5">
                                Timestamp: {record.timestamp} | Vibe Tone: {record.tone}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto justify-between">
                              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold font-mono text-[9.5px] rounded">
                                Rating: {record.score}%
                              </span>
                              <button
                                onClick={() => handleCopy(record.content, record.id)}
                                className={`p-1 px-3 border text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                                  theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-600"
                                }`}
                              >
                                {copiedText === record.id ? "Copied" : "Copy Copy"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className={`p-20 rounded-3xl border border-dashed text-center space-y-4 ${
                    theme === "dark" ? "bg-slate-900/35 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className="p-4 bg-slate-900 rounded-full text-slate-500 inline-block animate-pulse">
                      <History className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-450 text-sm">Log Registry Empty</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-normal">
                        Your successful copywriting compilations automatically populate historic telemetry data profiles here in real-time.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ==========================================
                TAB 6: 📦 GITHUB DIRECTORY FILE PREVIEWER
               ========================================== */}
            {activeTab === "github" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between h-full">
                
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 font-display">
                      <Terminal className="text-blue-500" /> Exportable GitHub Repository Workspace
                    </h3>
                    <p className="text-[11px] text-slate-500">Preview the underlying, production-ready CopyCraft-AI package representation</p>
                  </div>

                  <button
                    onClick={() => {
                      const completeBundle = Object.entries(repoFiles)
                        .map(([path, content]) => `// ===================================\n// FILE PATH: ${path}\n// ===================================\n\n${content}`)
                        .join("\n\n");
                      downloadTextFile(completeBundle, "copycraft_full_repository_bundle.txt");
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow shadow-blue-600/10"
                  >
                    <Download className="w-4 h-4" /> Code Bundle
                  </button>
                </div>

                {/* File system visual explorer frame */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[380px] pt-1 text-left">
                  
                  {/* Directory listing left panel */}
                  <div className={`lg:col-span-1 rounded-xl p-3.5 overflow-y-auto space-y-3 font-mono text-[11px] border ${
                    theme === "dark" ? "bg-slate-950 border-slate-850 text-slate-300" : "bg-slate-50/70 border-slate-205 text-slate-700"
                  }`}>
                    <div className="flex items-center gap-2 font-bold border-b border-slate-800 pb-1.5 text-slate-200">
                      <Folder className="w-4 h-4 text-amber-500" />
                      <span>CopyCraft-AI/</span>
                    </div>

                    <div className="space-y-1 pl-2">
                      {[
                        "app.py",
                        "generator.py",
                        "prompt_builder.py",
                        "scoring_engine.py",
                        "seo_generator.py",
                        "campaign_generator.py",
                        "requirements.txt",
                        "README.md"
                      ].map((fn) => (
                        <button
                          key={fn}
                          onClick={() => setGithubSelectedFile(fn)}
                          className={`w-full flex items-center gap-2 p-1.5 px-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                            githubSelectedFile === fn 
                              ? "bg-slate-900 border border-slate-800 font-bold text-blue-400" 
                              : "text-slate-400 hover:bg-slate-900/40"
                          }`}
                        >
                          <File className="w-3.5 h-3.5" />
                          <span>{fn}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right editor terminal panel */}
                  <div className={`lg:col-span-2 rounded-xl border flex flex-col justify-between overflow-hidden relative ${
                    theme === "dark" ? "bg-slate-950 border-slate-850" : "bg-slate-100 border-slate-205"
                  }`}>
                    
                    <div className={`px-4 py-2 flex items-center justify-between gap-3 text-xs font-mono border-b ${
                      theme === "dark" ? "bg-slate-900/60 border-slate-850 text-slate-400" : "bg-slate-200/50 border-slate-205 text-slate-600"
                    }`}>
                      <span className="font-bold flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-blue-500" /> {githubSelectedFile}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(repoFiles[githubSelectedFile] || "", "copied_gh_file")}
                          className={`p-1 px-2.5 rounded text-[10px] font-bold border flex items-center gap-1 transition-colors cursor-pointer ${
                            theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          {copiedText === "copied_gh_file" ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <pre className="flex-1 p-4 overflow-auto font-mono text-[11px] leading-relaxed text-slate-350 bg-slate-950 text-left max-h-[280px]">
                      <code>{repoFiles[githubSelectedFile] || "// Selected file preview is currently offline."}</code>
                    </pre>
                  </div>

                </div>

              </div>
            )}

          </section>

          {/* ==========================================
              RIGHT COLUMN: collapsible AI Copilot Panel (Linear style)
             ========================================== */}
          <section className={`transition-all duration-300 shrink-0 border-l relative overflow-hidden flex flex-col justify-between ${
            copilotOpen ? "w-80" : "w-10"
          } ${
            theme === "dark" ? "bg-slate-900/50 border-slate-800/80" : "bg-white border-slate-205"
          }`}>
            
            {/* Collapse / Expand Switch Button */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-20">
              <button
                onClick={() => setCopilotOpen(!copilotOpen)}
                className={`p-1 rounded-full border shadow-lg cursor-pointer ${
                  theme === "dark" ? "bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {copilotOpen ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
            </div>

            {copilotOpen ? (
              <div className="p-4 space-y-4 flex-1 flex flex-col justify-between overflow-y-auto">
                
                <div className="space-y-4">
                  {/* Copilot Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 font-display uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 animate-bounce" /> AI Copilot Assistant
                    </span>
                    <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 rounded px-1">
                      Online
                    </span>
                  </div>

                  <p className="text-[10.5px] text-slate-400 leading-normal">
                    Enter any styling instruction to dynamically refine, shorten, or translate the active generated copy immediately.
                  </p>

                  {/* Preset prompt capsules */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">PRESET QUICK STYLES</span>
                    <div className="flex flex-col gap-1 text-[10px]">
                      {copilotPresets.map((preset, i) => (
                        <button
                          key={i}
                          onClick={() => handleCopilotAction(preset.text)}
                          disabled={copilotLoading}
                          className={`p-1.5 px-2.5 rounded-lg text-left truncate border transition-all cursor-pointer ${
                            theme === "dark" 
                              ? "bg-slate-950/70 border-slate-850 hover:border-slate-800 text-slate-300 hover:bg-slate-900" 
                              : "bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-750"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Prompt Box */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">CUSTOM CORRECTION QUERY</span>
                    <div className="relative">
                      <textarea
                        rows={2.5}
                        value={copilotInput}
                        onChange={(e) => setCopilotInput(e.target.value)}
                        placeholder="e.g. Translate to French and add 3 emojis..."
                        className={`w-full text-[11px] rounded-xl p-2.5 pr-8 border resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          theme === "dark" ? "bg-slate-950 border-slate-850 text-slate-200 placeholder-slate-600" : "bg-white border-slate-205 text-slate-800 placeholder-slate-400"
                        }`}
                      />
                      <button
                        onClick={() => handleCopilotAction()}
                        disabled={copilotLoading || !copilotInput.trim()}
                        className="absolute bottom-2.5 right-2 text-indigo-500 hover:text-indigo-400 disabled:opacity-30 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Copilot Logging history */}
                <div className="mt-4 pt-3 border-t border-dashed border-slate-800/40 text-[10px] space-y-2 max-h-48 overflow-y-auto">
                  <span className="text-[8.5px] uppercase font-mono text-slate-500 block font-bold">COGNITIVE ADJUSTMENTS LOG</span>
                  <div className="space-y-2">
                    {copilotHistory.map((log, idx) => (
                      <div key={idx} className={`p-2 rounded border font-mono text-[9px] leading-relaxed ${
                        theme === "dark" ? "bg-slate-950/80 border-slate-850" : "bg-slate-50 border-slate-150"
                      }`}>
                        <div className="flex justify-between font-bold text-indigo-400">
                          <span className="truncate">"{log.instruction.slice(0, 25)}..."</span>
                          <span className="text-slate-600 text-[8px]">{log.timestamp}</span>
                        </div>
                        <p className={`text-[9.5px] mt-0.5 ${theme === "dark" ? "text-slate-450" : "text-slate-500"}`}>{log.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-10 space-y-4">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
                <span className="text-[9px] font-mono text-slate-500 -rotate-90 origin-center whitespace-nowrap tracking-widest mt-4">
                  COPILOT DRAWER
                </span>
              </div>
            )}

          </section>

        </div>

        {/* ==========================================
            🔮 FOOTER COMPONENT
           ========================================== */}
        <footer className={`border-t py-4 px-6 text-center text-[10.5px] font-mono ${
          theme === "dark" ? "bg-slate-950 border-slate-900 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-500"
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 CopyCraft AI – Premium SaaS Platform. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#inputs_column" className="hover:underline">Parameters Configuration</a>
              <span>•</span>
              <a href="#workspace_viewport" className="hover:underline">Active Pipeline Outlet</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
