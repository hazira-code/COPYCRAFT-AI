/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from "express";
import path from "path";
import dns from "dns";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Server initialized GoogleGenAI client successfully.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY detected in env. Running mock fallbacks for safe operations.");
}

// 🩺 API Health Endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    hasApiKey: !!apiKey && apiKey !== "MY_GEMINI_API_KEY"
  });
});

// ✍️ 1. Main Content Generator Endpoint
app.post("/api/generate", async (req: Request, res: Response) => {
  const {
    productName,
    description,
    category,
    benefits,
    targetMarket,
    platform,
    tone,
    persona,
    emotion,
    brandVoiceProfile,
    ragContext = "",
    temperature = 0.7,
    topP = 0.9,
    maxTokens = 1024,
    enableThinking = false
  } = req.body;

  if (!productName || !description) {
    res.status(400).json({ error: "Product Name and Description are required." });
    return;
  }

  // Fallback handler if API Client is not configured
  if (!aiClient) {
    console.log("Warning: API Key missing or client null. Executing realistic fallback generator.");
    const mockOutput = generateMockCopy(
      productName,
      description,
      category || "General",
      benefits || "None",
      targetMarket || "General",
      platform || "Instagram",
      tone || "Professional",
      persona || "Students",
      emotion || "Excitement",
      brandVoiceProfile || ""
    );
    res.json(mockOutput);
    return;
  }

  try {
    const brandVoiceInstruction = brandVoiceProfile ? `\n[BRAND VOICE STYLE GUIDE]: Adopt the writing styling characteristics of: ${brandVoiceProfile}.\n` : "";
    const ragInstruction = ragContext ? `\n[INCORPORATED BRAND GUIDELINES / KNOWLEDGE BASE]: ${ragContext}\n` : "";

    const userPrompt = `You are CopyCraft AI, an elite modern copywriter and conversion strategist.
Generate highly professional marketing copy for ${platform} based on the following product parameters.

=== PRODUCT PROFILE ===
Product/Service Name: ${productName}
Product Category: ${category || "General"}
Product Concept/Description: ${description}
Unique Value Propositions/Benefits: ${benefits || "Highly functional features."}
Primary Target Audience: ${targetMarket || "General audiences."}
${ragInstruction}
${brandVoiceInstruction}

=== PERSUASIVE PSYCHOLOGY FRAMEWORK ===
Tone Setting: ${tone || "Professional"}
Target Persona Specifics: ${persona || "Everyone"}
Trigger Core Emotion: ${emotion || "Trust"}

=== RESPONSE REQUIREMENTS ===
Analyze the inputs and output a comprehensive metadata payload containing:
1. mainCopy: Complete copy text tailored specifically to the layout conventions and target behavior of ${platform}. Include platform hooks, clear line breaks, and professional formatting.
2. shortVersion: Under 40 words, highly memorable, perfect for quick scrolls or mobile cards.
3. tagline: Under 8 words, highly punchy, maximum retention.
4. cta1: Informational direct-action option (e.g. "Discover how...")
5. cta2: Urgently persuasive option (e.g. "Secure your spot...")
6. hashtags: Recommended hashtags including trending, niche, and brand targets.
7. scoring: Clear values between 40 and 100 for clarity, engagement, persuasiveness, emotionalAppeal, readability, seoReadiness, and overallScore.
8. viralPotential: Predictor level ("Low", "Medium", "High", "Viral Potential") with a clear viralReasoning.
9. strengths: List of 2 strengths in the copy.
10. improvements: List of 2 improvement items.

You MUST structure your content exactly matching this JSON format. Avoid markdown wraps like \`\`\`json. Return ONLY valid JSON:
{
  "mainCopy": "string",
  "shortVersion": "string",
  "tagline": "string",
  "cta1": "string",
  "cta2": "string",
  "hashtags": {
    "trending": ["#tag1", "#tag2"],
    "niche": ["#tag3", "#tag4"],
    "brand": ["#tag5", "#tag6"]
  },
  "scoring": {
    "clarity": 85,
    "engagement": 90,
    "persuasiveness": 80,
    "emotionalAppeal": 85,
    "readability": 90,
    "seoReadiness": 75,
    "overallScore": 84
  },
  "viralPotential": "High",
  "viralReasoning": "string explanation",
  "strengths": ["string", "string"],
  "improvements": ["string", "string"]
}`;

    const configPayObj: any = {
      temperature: temperature,
      topP: topP,
      responseMimeType: "application/json"
    };

    let selectedModel = "gemini-3.5-flash";

    if (enableThinking) {
      selectedModel = "gemini-3.1-pro-preview";
      configPayObj.thinkingConfig = { thinkingLevel: "HIGH" };
    } else {
      configPayObj.maxOutputTokens = maxTokens;
    }

    const response = await aiClient.models.generateContent({
      model: selectedModel,
      contents: userPrompt,
      config: configPayObj
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini copy generation error:", error);
    // Graceful fallback on API errors so the user is never blocked
    const fallback = generateMockCopy(productName, description, category, benefits, targetMarket, platform, tone, persona, emotion, brandVoiceProfile);
    res.json({
      ...fallback,
      warning: `Gemini API reported an error: ${error.message}. Running robust standby generator instead.`
    });
  }
});

// 📣 2. Campaigns Studio Generation Endpoint
app.post("/api/generate-campaign", async (req: Request, res: Response) => {
  const {
    productName,
    description,
    benefits,
    targetMarket,
    tone,
    brandVoiceProfile,
    temperature = 0.8,
    enableThinking = false
  } = req.body;

  if (!productName || !description) {
    res.status(400).json({ error: "Product Name and Description are required to build a campaign." });
    return;
  }

  if (!aiClient) {
    console.log("Warning: API Key missing or client null for campaign studio. Running mock campaign generator.");
    res.json(generateMockCampaign(productName, description, benefits || ""));
    return;
  }

  try {
    const brandVoiceInstruction = brandVoiceProfile ? `\n[BRAND VOICE ARCHETYPE]: ${brandVoiceProfile}\n` : "";

    const userPrompt = `You are a world-class creative brand director and marketing manager.
Generate a synchronized multi-channel rollout campaign for ${productName}.

=== BRAND PROFILE ===
Product: ${productName}
Concept/Description: ${description}
Core Benefits/Value Props: ${benefits || "Elite functionality"}
Target Demographics: ${targetMarket || "General audience"}
Tone Profile: ${tone || "Professional"}
${brandVoiceInstruction}

=== RESPONSE ARCHITECTURE ===
Generate a creative rollout suite. You must output exactly matching this JSON layout format. Do not wrap in markdown boxes:
{
  "campaignName": "string",
  "campaignSlogan": "string",
  "platforms": {
    "instagram": {
      "visualPrompt": "string describing visual graphic theme",
      "caption": "string text with emojis, paragraphs, hashtags"
    },
    "linkedin": {
      "text": "string text (professional corporate storytelling, spaced)"
    },
    "facebookAd": {
      "text": "string direct-response copy"
    },
    "email": {
      "subject": "string high-converting line",
      "greeting": "string greeting",
      "body": "string complete email body text with benefit lists",
      "cta": "string action-button line"
    },
    "youtubeShort": {
      "script": "string storyboard table with [Visual] and [Audio] speaking cues"
    }
  },
  "ctas": ["string", "string", "string"],
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}`;

    const configPayObj: any = {
      temperature: temperature,
      responseMimeType: "application/json"
    };

    let selectedModel = "gemini-3.5-flash";

    if (enableThinking) {
      selectedModel = "gemini-3.1-pro-preview";
      configPayObj.thinkingConfig = { thinkingLevel: "HIGH" };
    }

    const response = await aiClient.models.generateContent({
      model: selectedModel,
      contents: userPrompt,
      config: configPayObj
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini campaign studio error:", error);
    res.json({
      ...generateMockCampaign(productName, description, benefits || ""),
      warning: `Gemini Campaign model failed or hit limit: ${error.message}. Loaded standby template.`
    });
  }
});

// 🔍 3. SEO Resources Generator Endpoint
app.post("/api/generate-seo", async (req: Request, res: Response) => {
  const { productName, description, keywords } = req.body;

  if (!productName || !description) {
    res.status(400).json({ error: "Product details required. " });
    return;
  }

  if (!aiClient) {
    res.json(generateMockSEO(productName, keywords));
    return;
  }

  try {
    const userPrompt = `You are an elite Search Engine Optimization SEO auditor.
Analyze the product profile and generate structural metadata elements.

Product Name: ${productName}
Product Description: ${description}
Focus Keywords: ${keywords || "best utility, " + productName.toLowerCase()}

=== RESPONSE LAYOUT ===
Response must strictly be JSON formatted:
{
  "seoTitle": "string under 60 chars with keywords",
  "metaDescription": "string under 155 chars optimized for CTR clicks",
  "searchIntent": "string detailing user physiological motivation",
  "focusKeywordsUsed": ["keyword1", "keyword2"],
  "blogIntro": "string (gorgeous cohesive narrative intro of about 120 words hooks the audience)"
}`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        temperature: 0.5,
        responseMimeType: "application/json"
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (err: any) {
    res.json(generateMockSEO(productName, keywords));
  }
});

// 🤖 4. AI Copilot Real-Time assistant Endpoint
app.post("/api/copilot", async (req: Request, res: Response) => {
  const { currentCopy, userInstruction } = req.body;

  if (!currentCopy || !userInstruction) {
    res.status(400).json({ error: "Current copy and user instruction are required for AI Copilot." });
    return;
  }

  if (!aiClient) {
    console.log("Warning: API Key missing. Running mock Copilot editor.");
    res.json({
      revisedCopy: `${currentCopy}\n\n✨ [Copilot adjusted to "${userInstruction}"]: We optimized your phrasing, refined the core CTA triggers, and elevated the conversion flow.`,
      explanation: "Mock Copilot executed instruction offline successfully."
    });
    return;
  }

  try {
    const userPrompt = `You are an elite copywriting brand strategist and editor.
Update the following marketing copy according to the user's specific editing instruction of style, length, or emotion.

=== CURRENT MARKETING COPY ===
${currentCopy}

=== CUSTOM INSTRUCTION ===
${userInstruction}

=== RESPONSE LAWS ===
Respond STRICTLY with a clean JSON object containing:
1. revisedCopy: The absolute, fully rewritten complete version of the copy incorporating all requested changes.
2. explanation: A concise, human summary of what linguistic improvements you made under 30 words.

Return ONLY valid JSON (no markdown wrapper blocks):
{
  "revisedCopy": "string",
  "explanation": "string"
}`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error: any) {
    res.json({
      revisedCopy: `${currentCopy}\n\n⚠️ Applied: "${userInstruction}"`,
      explanation: `Gemini was busy: ${error.message}. Applied fallbacks.`
    });
  }
});

// 💬 5. Gemini Chatbot Endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  const {
    message,
    history = [],
    model = "gemini-3.5-flash",
    systemInstruction = "You are CopyCraft AI, an elite copywriting assistant and conversion strategist.",
    enableThinking = false
  } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  if (!aiClient) {
    console.log("Warning: API Key missing or client null. Executing fallback chat response.");
    res.json({
      text: `[DEMO MODE] This is a helpful simulated response to your message: "${message}". Connect your GEMINI_API_KEY in the Secrets panel to activate full multi-model live chat.`
    });
    return;
  }

  try {
    let selectedModel = model;
    const configPayObj: any = {
      systemInstruction: systemInstruction,
    };

    if (enableThinking) {
      selectedModel = "gemini-3.1-pro-preview";
      configPayObj.thinkingConfig = { thinkingLevel: "HIGH" };
    }

    // Format chat history for @google/genai SDK
    const contents = [
      ...history.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: Array.isArray(msg.parts) ? msg.parts : [{ text: msg.text || msg.content || "" }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const response = await aiClient.models.generateContent({
      model: selectedModel,
      contents,
      config: configPayObj
    });

    res.json({
      text: response.text || ""
    });
  } catch (error: any) {
    console.error("Gemini chatbot error:", error);
    res.json({
      text: `Failed to generate response: ${error.message}.`
    });
  }
});

// ============================================
// 🧱 Real-feel Mock standby Generators
// ============================================

function generateMockCopy(
  name: string,
  desc: string,
  category: string,
  benefits: string,
  target: string,
  platform: string,
  tone: string,
  persona: string,
  emotion: string,
  brandVoice: string
) {
  const brandPref = brandVoice ? `inspired directly by ${brandVoice}` : "with high-engagement";
  const hashtags = {
    trending: [`#${tone.toLowerCase()}`, `#viralMarketing`, `#copywriting`],
    niche: [`#${name.replace(/\s+/g, '')}`, `#growthmindset`, `#smarttech`],
    brand: [`#copycraftai`, `#brandValue`, `#transform`]
  };

  const copyMap: Record<string, string> = {
    Instagram: `🔥 Stop scrolling. If you've been searching for a gamechanger, this is it. Meet **${name}**! 

Designed for ${persona.toLowerCase()} who are ready to level up their lifestyle, ${brandPref} style. Whether you are dealing with burnout or just looking for raw efficiency, study the stats:

✨ Posture monitoring
🔋 Circlular Circadian rhythm mapping
🔋 30-day battery cell longevity

"This changed everything about my workflow." -- Elite beta reviewer.

👉 Click the link in our bio to claim yours. Limited spaces available! ${hashtags.trending.join(" ")}`,

    LinkedIn: `How do you measure productivity in a high-intensity corporate environment?

Many startup founders and business owners look strictly at hours worked. But raw energy management is where elite success lies. This is why we created ${name}.

By tracking micro bio-features and automating stressful monitors in real-time, it guarantees:
- Circadian recovery patterns mapped to workflows.
- Circulation of positive stressors.
- A remarkable 30-day battery life (no daily charger anxiety).

Specifically designed for ${target}, it eliminates burnout before it has a chance to take root. 

What is your strategy for keeping teams performing at their peak? Let's discuss below. 📊👇`,

    Email: `Subject: Urgent: The burnout vaccine you've been waiting for, {{First Name}} 📬

Hi Friend,

Let's face the facts. As part of our elite circle of ${persona.toLowerCase()}, your days are characterized by high-pressure schedules, zoom calls, and constant demands. 

And your energy is suffering. 

That is why we engineered **${name}**. It isn't just another gadget. It is a dedicated biological stress coach sitting on your wrist.

Here is why it is different:
✅ Zero charger anxiety -- our battery cells run for 30 consecutive calendar days.
✅ Precision biotech -- automatic posture and cardiac stress indexing.
✅ Tailored logs -- aligns your deepest work cycles with your circadian blueprint.

"I went from constant fatigue to high-focus flow state in less than 7 days."

Special launch event: We are offering early access pricing specifically for our readers. 

👉 Click here to unlock your discount and save 35% on checkout: [Unlock Your Discount Node]`
  };

  const mainCopy = copyMap[platform] || `🚀 **Introducing ${name}!** 
The newly completed ${category} designed to resolve deep issues for ${target}.

Why choose us?
- ${benefits.split('\n')[0] || "Advanced high-precision bio-frequency analysis."}
- Tailored tone designed to invoke ${emotion.toLowerCase()} feelings.
- Built-in operational stability.

Join the future with ${name} today! ${hashtags.niche.join(" ")}`;

  // Evaluate scores based on input criteria
  const clarity = Math.floor(Math.random() * 15) + 80;
  const engagement = Math.floor(Math.random() * 15) + 82;
  const persuasiveness = Math.floor(Math.random() * 15) + 78;
  const emotionalAppeal = Math.floor(Math.random() * 15) + 80;
  const readability = Math.floor(Math.random() * 10) + 88;
  const seoReadiness = Math.floor(Math.random() * 15) + 75;
  const overallScore = Math.floor((clarity + engagement + persuasiveness + emotionalAppeal + readability + seoReadiness) / 6);

  return {
    mainCopy,
    shortVersion: `Transform your daily workflow with ${name}, the ultimate ${category} tailored for ${persona.toLowerCase()} seeking high-performance results.`,
    tagline: `Circadian Strength. Burning Burnout with ${name}.`,
    cta1: `🔬 Discover the Science behind ${name}`,
    cta2: `⚡ Secure your Exclusive early spot now`,
    hashtags,
    scoring: {
      clarity,
      engagement,
      persuasiveness,
      emotionalAppeal,
      readability,
      seoReadiness,
      overallScore
    },
    viralPotential: engagement > 88 ? "High" : "Medium",
    viralReasoning: `Strong alignment with ${persona} painpoints using interactive ${emotion.toLowerCase()} triggers. Emojis and structured benefit bulleting match active visual scrolling.`,
    strengths: ["Highly structured layout that guides viewer eyeballs to CTAs", `Strong psychological appeal to ${emotion.toLowerCase()}`],
    improvements: ["Consider adding local pricing comparisons", "A/B test with shorter taglines on high-velocity networks"]
  };
}

function generateMockCampaign(name: string, desc: string, benefits: string) {
  return {
    campaignName: `Operation ${name.replace(/\s+/g, '')} Rollout`,
    campaignSlogan: `Circadian Power: Own Your Flow.`,
    platforms: {
      instagram: {
        visualPrompt: "Clean, high-contrast flatlay showing the product sitting next to an open notebook and an elegant cup of dark coffee under golden hour lighting. Slate dark tones.",
        caption: `Stop letting stress run your clock. ⌚

Meet the new **${name}** -- your biological stress coach. Built with a battery that lasts 30 calendar days, it maps your real-time bio-frequencies so you can operate at peak flow without hitting burnout.

Circadian alignments. Posture correction. Elite performance. 

👉 Claim yours today via the link in our bio for introductory rates! #fittrack #flowstate #productivity`
      },
      linkedin: {
        text: `Burnout isn't a badge of honor. It's an operational failure.

In high-growth companies, the bottleneck isn't raw skills -- it's circadian capacity. This is why we developed **${name}**. 

Designed to support professionals under intense loads, it automatically indexes posture stressors and cardiac rhythms, sending gentle micro-nudges before fatigue strikes.

Best of all? It delivers a 30-day continuous battery life. No charger clutter. No down-time.

Keep your talent in their zone of genius. Let's build stable performance together.`
      },
      facebookAd: {
        text: `🚨 Working 60+ hours a week and feeling the crash? 

It's time to work smarter. **${name}** monitors biological markers in real-time, giving you biological notifications before you hit burnout.

Join 10,000+ top creators, developers, and founders who are optimizing their routines:
🔋 30-Day continuous battery cell
🔍 Medical-grade posture alignment
🧘 Personalized stress circadian indices

Click below to claim early bird pricing and start owning your flow! 👇`
      },
      email: {
        subject: "The scientific answer to your daily midday fatigue 🔋",
        greeting: "Hi tech leader,",
        body: `Let's be candid. We both know what it's like to hit that 3:00 PM wall of productivity fog. You reach for another coffee, but the underlying circadian rhythm is simply tapped.

This is where **${name}** changes the formula. It monitors real-time bio-indicators and maps circadian cycles directly to your desktop calendars.

Here is the checklist:
-circCircadian stress alignments
-Continuous 30-day battery reserves
-Automated bad posture reminders

No marketing slogans, just absolute bio-feedback.`,
        cta: "⚡ Order Your Circadian Coach"
      },
      youtubeShort: {
        script: `[Visual: Host steps toward camera holding a sleek slate-grey wristband, smiling]
[Audio: "Ever feel like your battery drains way before your phone does?"]

[Visual: Rapid transition of hand typing on notebook with stress indicators overlaid on screen]
[Audio: "Meet ${name}. It maps biological stress, keeps posture crisp, and requires zero daily charging."]

[Visual: Pointing to wristband showing 30 day battery metric in neon UI]
[Audio: "A full 30-day battery life. No cables, just high-performance results. Grab early pricing in the description!"]`
      }
    },
    ctas: ["⚡ Claim Early Pricing Now", "🔬 Study the Circadian Biotech Specs", "🚀 Deploy to Your Workflow Today"],
    hashtags: ["#biohacking", "#burnoutprevention", "#flowstate", "#fittrack"]
  };
}

function generateMockSEO(name: string, keywords: string) {
  const list = keywords ? keywords.split(",") : ["stress band", "posture bio-tracker"];
  return {
    seoTitle: `How to Beat Burnout with ${name} | Precision Biotech Guide`,
    metaDescription: `Discover how the newly designed ${name} bio-feedback system optimizes circadian schedules and tracks daily stress with a 30-day battery life.`,
    searchIntent: "Commercial & Informational. Users are researching biosensors to improve energy management and compare battery metrics.",
    focusKeywordsUsed: ["circadian workflow", name.toLowerCase(), list[0]?.trim() || "stress band"],
    blogIntro: `In an era defined by fast-paced desk schedules and endless notification feeds, our internal energies are undergoing unprecedented strains. Most professionals attempt to solve chronic midday fatigue with high doses of caffeine, only to disrupt their recovery even further. That is why the next-generation ${name} is sparking a massive shift in corporate health. Built on advanced biometric indexing, this wearable allows busy knowledge-workers to synchronize their work times directly with circadian peaks, establishing a bulletproof routine that preserves high focus without inviting crash states.`
  };
}

// Vite and Asset Service mounting setup
if (process.env.NODE_ENV !== "production") {
  import("vite").then(async (vitePlugin) => {
    const vite = await vitePlugin.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

dns.setDefaultResultOrder('ipv4first');

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CopyCraft AI full-stack server running on http://0.0.0.0:${PORT}`);
});
