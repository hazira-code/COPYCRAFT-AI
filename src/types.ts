/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PlatformType = "Instagram" | "LinkedIn" | "Email" | "Facebook" | "Twitter" | "YouTube";

export type ToneType = "Professional" | "Friendly" | "Casual" | "Luxury" | "Humorous" | "Persuasive" | "Inspirational" | "Storytelling";

export type PersonaType = "Students" | "Developers" | "Startup Founders" | "Business Owners" | "Fitness Enthusiasts" | "Parents" | "Working Professionals" | "College Graduates";

export type EmotionType = "Excitement" | "Trust" | "Urgency" | "Luxury" | "Curiosity" | "FOMO";

export type BrandVoiceType = "Apple" | "Nike" | "Tesla" | "Startup" | "None";

export interface GenerationOutput {
  mainCopy: string;
  shortVersion: string;
  tagline: string;
  cta1: string;
  cta2: string;
  hashtags: {
    trending: string[];
    niche: string[];
    brand: string[];
  };
  scoring: {
    clarity: number;
    engagement: number;
    persuasiveness: number;
    emotionalAppeal: number;
    readability: number;
    seoReadiness: number;
    overallScore: number;
  };
  viralPotential: "Low" | "Medium" | "High" | "Viral Potential";
  viralReasoning: string;
  strengths: string[];
  improvements: string[];
  warning?: string;
}

export interface CampaignOutput {
  campaignName: string;
  campaignSlogan: string;
  platforms: {
    instagram: {
      visualPrompt: string;
      caption: string;
    };
    linkedin: {
      text: string;
    };
    facebookAd: {
      text: string;
    };
    email: {
      subject: string;
      greeting: string;
      body: string;
      cta: string;
    };
    youtubeShort: {
      script: string;
    };
  };
  ctas: string[];
  hashtags: string[];
  warning?: string;
}

export interface SEOOutput {
  seoTitle: string;
  metaDescription: string;
  searchIntent: string;
  focusKeywordsUsed: string[];
  blogIntro: string;
}

export interface GenerationRecord {
  id: string;
  timestamp: string;
  productName: string;
  platform: PlatformType;
  tone: ToneType;
  persona: PersonaType;
  score: number;
  content: string;
}
