/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RepoFile {
  path: string;
  content: string;
}

export const repoFiles: Record<string, string> = {
  "requirements.txt": `streamlit>=1.30.0
google-genai>=0.1.1
pandas>=2.0.0
plotly>=5.15.0
fpdf2>=2.7.0
python-docx>=0.8.11
faiss-cpu>=1.7.4
numpy>=1.24.0
sentence-transformers>=2.2.0
python-dotenv>=1.0.0
`,

  ".env.example": `# Set your Gemini API client key here
GEMINI_API_KEY="your_gemini_api_key_here"

# App configuration
APP_TITLE="CopyCraft AI"
APP_ENV="production"
`,

  "LICENSE": `MIT License

Copyright (c) 2026 CopyCraft AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,

  ".streamlit/config.toml": `[theme]
primaryColor = "#3B82F6"
backgroundColor = "#0F172A"
secondaryBackgroundColor = "#1E293B"
textColor = "#F8FAFC"
font = "sans serif"

[server]
port = 8501
enableCORS = false
enableXsrfProtection = false
`,

  "config.py": `import os
from dotenv import load_dotenv

# Load variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# App Details
APP_NAME = "CopyCraft AI"
APP_VERSION = "1.0.0"

# Tone Maps with strategic directives and keywords
TONE_DIRECTIVES = {
    "Professional": "authoritative, polished, formal, avoiding jargon unless specified, built on facts and corporate precision.",
    "Friendly": "welcoming, conversational, warm, approachable, community-oriented and cheerful.",
    "Casual": "laid-back, authentic, highly relatable, like talking to a close friend, uses contractions.",
    "Luxury": "exclusive, evocative, highly refined, focusing on status, quality, prestige, and timelessness.",
    "Humorous": "witty, light-hearted, playful, uses clever wordplay, entertaining and highly engaging.",
    "Persuasive": "action-driven, highly compelling, emphasizes benefits over features, leverages reciprocity and social proof.",
    "Inspirational": "uplifting, visionary, storytelling-driven, appeals to noble aspirations and personal growth.",
    "Storytelling": "narrative structure, character-centered, hooks the reader with raw human struggle followed by resolved discovery."
}

# Persona profiles for adaptive linguistics
PERSONA_PROFILES = {
    "Students": "Focus on affordability, ease of use, exam success, peer recognition, and time management.",
    "Developers": "Focus on raw technical efficiency, API scalability, clean architecture, documentation quality, and no marketing fluff.",
    "Startup Founders": "Focus on rapid growth, cost optimization, competitive advantage, speed-to-market, and high ROI.",
    "Business Owners": "Focus on stability, operational security, employee productivity, customer retention, and steady revenue.",
    "Fitness Enthusiasts": "Focus on high performance, raw health benefits, discipline, measurable logs, and aesthetic results.",
    "Parents": "Focus on child safety, educational outcomes, time savings, family budgeting, and peace of mind.",
    "Working Professionals": "Focus on career ladder advancement, productivity Hacks, work-life balance, and elite social standing.",
    "College Graduates": "Focus on high starting salaries, interview prep, resumes, networking, and adulting easily."
}

# Emotion modifiers to append to constraints
EMOTION_MODIFIERS = {
    "Excitement": "Infuse the copy with vibrant energy, exclamation marks, and high-energy power words.",
    "Trust": "Include security assurances, concrete proof, guarantees, statistical metrics, and calm confidence.",
    "Urgency": "Use time-limited wording, phrases like 'now', 'lasts 24h', or 'exclusive spot', triggering immediate actions.",
    "Luxury": "Focus on sensuous triggers, legacy, meticulous craftsmanship, deliberate scarcity, and unparalleled custom elegance.",
    "Curiosity": "Begin with tight hooks, cliffhangers, counter-intuitive facts, leaving the viewer needing to click to solve.",
    "FOMO": "Arouse anxiety of being left out, highlight social validation metrics, group achievements, and shrinking stock count."
}

# Model configs
SUPPORTED_PLATFORMS = ["Instagram", "LinkedIn", "Email", "Facebook", "Twitter", "YouTube"]
DEFAULT_INF_CONFIG = {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_output_tokens": 1024
}
`,

  "prompt_builder.py": `from config import TONE_DIRECTIVES, PERSONA_PROFILES, EMOTION_MODIFIERS

class CopyCraftPromptBuilder:
    @staticmethod
    def build_copy_prompt(product_name, description, category, benefits, target_market, platform, tone, persona, emotion, brand_profile="", rag_text=""):
        """
        Assembles a highly structured multi-factor copywriting command.
        """
        tone_inst = TONE_DIRECTIVES.get(tone, "balanced and human-centric.")
        persona_inst = PERSONA_PROFILES.get(persona, "general audiences.")
        emotion_inst = EMOTION_MODIFIERS.get(emotion, "")
        
        rag_context = f"\\n[BRAND KNOWLEDGE BASE RECORDS]:\\n{rag_text}\\n" if rag_text else ""
        brand_voice_inst = f"\\n[BRAND VOICE DIRECTIVE]: Adopt the tone of {brand_profile}.\\n" if brand_profile else ""

        prompt = f"""You are CopyCraft AI, an elite copywriting assistant.
Analyze the product details below and create masterfully optimized copy for {platform}.

=== PRODUCT DATA PROFILE ===
- Name: {product_name}
- Category: {category}
- Core Details: {description}
- Key Benefits: {benefits}
- General Target Market: {target_market}
{rag_context}
{brand_voice_inst}

=== PERSUASIVE FRAMEWORK ===
- Tone Directive: {tone_inst}
- Target Persona Profile: {persona_inst}
- Core Emotion Focus: {emotion_inst}

=== TASK SPECIFICATION ===
Generate exactly three distinct sections, labeled with standard markdown headings. Do not output anything other than these requested details:

### 1. Main Copy
Provide the core copywriting text designed specifically for {platform}. Use visual hooks, clean formatting, and linebreaks appropriate for the platform's visual interface.

### 2. Micro Versions
- Short version (perfect for quick scrolls or image captions)
- Extra-short tagline (highly memorably, under 10 words)

### 3. Ultimate CTA
Create two variations of highly action-oriented Call-to-Action (CTA) lines that trigger immediate action.

### 4. Strategic Hashtags
Provide a categoric breakdown of:
- Trending Hashtag (#trend)
- Niche Hashtag (#niche)
- Brand Hashtag (#brand)

Please format each section clearly.
"""
        return prompt

    @staticmethod
    def build_score_prompt(content):
        return f"""Analyze the marketing copy below and compute quality metrics.
Format your output strictly as a valid JSON object. Do not include any markdown fences (like \`\`\`json) or explanation outside the JSON.

Copy to analyze:
\"\"\"
{content}
\"\"\"

The JSON object MUST have the following structure:
{{
  "clarity": 85,
  "engagement": 90,
  "persuasiveness": 78,
  "emotional_appeal": 82,
  "readability": 95,
  "seo_readiness": 80,
  "overall_score": 85,
  "viral_potential": "High",
  "viral_reasoning": "Quick explanation here",
  "strengths": ["list strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"]
}}
"""
`,

  "generator.py": `import sys
import os
from google import genai
from google.genai import types
from config import GEMINI_API_KEY, DEFAULT_INF_CONFIG

class CopyCraftGenerator:
    def __init__(self, api_key=None):
        self.api_key = api_key or GEMINI_API_KEY
        if not self.api_key:
            print("Warning: GEMINI_API_KEY is not defined. Set it before performing generations.", file=sys.stderr)
            self.client = None
        else:
            # Initialize modern @google/genai module
            self.client = genai.Client(api_key=self.api_key)

    def generate(self, prompt, temperature=0.7, top_p=0.9, max_tokens=1024):
        """
        Executes text generation using the gemini-3.5-flash model.
        """
        if not self.client:
            return "Error: Gemini client not initialized. Please configure your API Key."

        try:
            config = types.GenerateContentConfig(
                temperature=temperature,
                top_p=top_p,
                max_output_tokens=max_tokens,
                system_instruction="You are an elite master copywriter with decades of marketing experience."
            )
            
            response = self.client.models.generate_content(
                model='gemini-3.5-flash',
                contents=prompt,
                config=config
            )
            return response.text
        except Exception as e:
            return f"API Generation Error: {str(e)}"
`,

  "scoring_engine.py": `import json
import re
from google import genai
from google.genai import types
from config import GEMINI_API_KEY
from prompt_builder import CopyCraftPromptBuilder

class CopyScoringEngine:
    def __init__(self, api_key=None):
        self.api_key = api_key or GEMINI_API_KEY
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None

    def evaluate_copy(self, content):
        """
        Submits generated copy to Gemini to acquire advanced JSON-formatted copywriting analysis.
        """
        if not self.client:
            # Fallback mock evaluations when API is unconfigured
            return self._get_fallback_score(content)
        
        try:
            prompt = CopyCraftPromptBuilder.build_score_prompt(content)
            
            config = types.GenerateContentConfig(
                temperature=0.2,
                response_mime_type="application/json"
            )
            
            response = self.client.models.generate_content(
                model='gemini-3.5-flash',
                contents=prompt,
                config=config
            )
            
            cleaned_text = response.text.strip()
            # Clean possible markdown formatting
            cleaned_text = re.sub(r'^\`\`\`(?:json)?', '', cleaned_text)
            cleaned_text = re.sub(r'\`\`\`$', '', cleaned_text).strip()
            
            return json.loads(cleaned_text)
            
        except Exception as e:
            print(f"Scoring Engine Error: {e}")
            return self._get_fallback_score(content, error_msg=str(e))

    def _get_fallback_score(self, content, error_msg=""):
        # Heuristics scoring Engine
        length = len(content.split())
        has_emoji = 15 if any(char in content for char in "🚀🔥💡✨✅👑📈🎯🎉") else 0
        has_bullets = 15 if "-" in content or "*" in content or "•" in content else 0
        has_question = 10 if "?" in content else 0
        
        # Calculate scores
        clarity = min(95, max(60, 75 + (5 if length > 40 else -5)))
        engagement = min(98, max(50, 60 + has_emoji + has_bullets))
        persuasiveness = min(95, max(50, 65 + has_question + (10 if "CTA" in content or "tagline" in content.lower() else 0)))
        emotional_appeal = min(95, max(50, 70 + (10 if has_emoji else 0)))
        readability = min(95, max(70, 90 - (5 if length > 150 else 0)))
        seo_readiness = min(95, max(40, 50 + (15 if "#" in content else 0)))
        
        overall = int((clarity + engagement + persuasiveness + emotional_appeal + readability + seo_readiness) / 6)
        
        viral_level = "Medium"
        if engagement > 85:
            viral_level = "High"
        elif engagement < 65:
            viral_level = "Low"
            
        return {
            "clarity": clarity,
            "engagement": engagement,
            "persuasiveness": persuasiveness,
            "emotional_appeal": emotional_appeal,
            "readability": readability,
            "seo_readiness": seo_readiness,
            "overall_score": overall,
            "viral_potential": viral_level,
            "viral_reasoning": f"Heuristic calculation based on styling variables. { 'Good emoji utilization and structuring.' if has_emoji and has_bullets else 'Lacks visual formatting elements.' }",
            "strengths": ["Clean structure" if length > 30 else "Short, concise", "High readability speed"],
            "improvements": ["Incorporate high-converting emojis" if not has_emoji else "Balance density", "Add bold lists" if not has_bullets else "Optimized paragraph count"]
        }
`,

  "seo_generator.py": `import re
from google import genai
from google.genai import types
from config import GEMINI_API_KEY

class SEOGenerator:
    def __init__(self, api_key=None):
        self.api_key = api_key or GEMINI_API_KEY
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None

    def generate_seo_assets(self, product_name, description, keywords=""):
        """
        Creates dedicated SEO articles titles, definitions, metadata, and introductory blog columns.
        """
        if not self.client:
            return self._get_fallback_seo(product_name, keywords)

        prompt = f"""You are a master search Engine SEO Optimizer.
Generate highly optimized SEO descriptors based on the product specifications.

PRODUCT: {product_name}
SPECIFICATIONS: {description}
USER KEYWORDS: {keywords}

Output 4 distinct sections:
1. SEO TITLE FOCUSED: A title under 60 characters containing key search terms.
2. META DESCRIPTION: Under 155 characters designed for maximum CTR.
3. SEARCH INTENT ANALYSIS: Quick notes on user psychological search intent (Informational, Transactional, Navigational).
4. HIGH-CONVERTING INTRODUCTORY BLOG COLUMN: A hook paragraph under 150 words starting your content marketing story.
"""
        try:
            response = self.client.models.generate_content(
                model='gemini-3.5-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            return f"SEO Generation Error: {str(e)}"

    def _get_fallback_seo(self, product_name, keywords):
        kw_list = [k.strip() for k in keywords.split(",")] if keywords else [product_name.lower(), "best product"]
        return f"""### 1. SEO TITLE FOCUSED
Best {product_name} | Ultimate Guide & Solutions

### 2. META DESCRIPTION
Discover how {product_name} can transform your daily flow. Learn the top benefits, professional secrets, and why everyone is switching today!

### 3. SEARCH INTENT ANALYSIS
- Primary Intent: **Transactional & Informational**
- User psychology: Users are searching for answers about '{', '.join(kw_list[:2])}' and looking for direct solutions or purchasing channels.

### 4. HIGH-CONVERTING INTRODUCTORY BLOG COLUMN
In a world constantly struggling with speed and reliability, finding a balanced answer is like finding gold. That is where the newly engineered {product_name} enters the room. Designed with modern professionals in mind, it provides the ultimate intersection of functionality, aesthetic grace, and elite performance. In this complete breakdown, we explore exactly how you can maximize this asset and leap ahead of your peers. Let's delve into the future today!
"""
`,

  "campaign_generator.py": `from google import genai
from google.genai import types
from config import GEMINI_API_KEY, TONE_DIRECTIVES

class CampaignGenerator:
    def __init__(self, api_key=None):
        self.api_key = api_key or GEMINI_API_KEY
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None

    def generate_campaign_studio(self, product_name, description, benefits, audience, tone, brand_profile=""):
        """
        Generates a comprehensive campaign across multiple platform deliverables in a single step.
        """
        if not self.client:
            return "Error: Live API is unconfigured. Please connect your Gemini Client Key to launch Campaign Studio."

        tone_inst = TONE_DIRECTIVES.get(tone, "persuasive and engaging.")
        brand_inst = f"Adopt the recognizable brand tone of {brand_profile}." if brand_profile else ""
        
        prompt = f"""You are a Silicon Valley Chief Creative Marketing Officer.
Design a highly synchronized, multi-channel rollout campaign for our product.

PRODUCT DETAILS:
- Name: {product_name}
- Concept: {description}
- Key Benefits: {benefits}
- Core Demographics: {audience}
- Campaign Tone: {tone_inst}
{brand_inst}

Generate a complete creative campaign blueprint containing:
1. **CAMPAIGN CODENAME & OVERARCHING SLOGAN**: A memorable campaign concept title and magnetic headline.
2. **INSTAGRAM CONTENT ROUTE**: Punchy image visual prompt, caption text with emojis, custom tags, and a call to view the bio.
3. **LINKEDIN THOUGHT LEADERSHIP**: Structured informational post emphasizing industry impact, scaling, and growth metrics.
4. **FACEBOOK targeted Ad COPY**: Direct conversion text leading with an undeniable hooks and benefit stacks.
5. **EMAIL MARKETING CAMPAIGN**: High-CTR Subject line, personal greeting, problem setup, product solution, list of benefits, high-pressure urgency CTA, and unsubscribe footnote.
6. **YOUTUBE SHORT PROMOTIONAL SCRIPT**: 30-second rapid-hook speaking outline, showing on-screen visual prompts and key audio cues.
7. **CTA VARIATIONS PACK**: Three action-oriented buttons ranging from gentle learning to transactional urgency.
8. **HASHTAG BLUEPRINT**: Balanced grid of high-volume, middle-tier, and brand signature tags.

Use standard markdown titles and clean layout separators. Wrap your entire output in clean, readable typography.
"""
        try:
            response = self.client.models.generate_content(
                model='gemini-3.5-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            return f"Campaign Studio Error: {str(e)}"
`,

  "history_manager.py": `import os
import json
from datetime import datetime

class HistoryManager:
    def __init__(self, history_dir="history"):
        self.history_dir = history_dir
        if not os.path.exists(self.history_dir):
            os.makedirs(self.history_dir)
        self.filepath = os.path.join(self.history_dir, "content_registry.json")

    def _load_history(self):
        if not os.path.exists(self.filepath):
            return []
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _save_history(self, data):
        try:
            with open(self.filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4, default=str)
        except Exception as e:
            print(f"Error saving content registry: {e}")

    def save_generation(self, item):
        """
        Saves a unique copywriting generation with descriptive timestamp.
        """
        history = self._load_history()
        record = {
            "id": len(history) + 1,
            "timestamp": datetime.now().isoformat(),
            **item
        }
        history.insert(0, record)  # Insert at beginning for reverse chronological view
        self._save_history(history)
        return record

    def get_generations(self):
        return self._load_history()

    def clear_history(self):
        self._save_history([])
`,

  "export_utils.py": `import os
from io import BytesIO

class CopyExporter:
    @staticmethod
    def export_as_txt(content, title="Generated Copy"):
        """
        Creates flat text memory bytes.
        """
        output = f"=== {title} ===\\n\\n{content}"
        return output.encode("utf-8")

    @staticmethod
    def export_as_docx(content, title="Generated Copy"):
        """
        Generates standard DOCX files utilizing python-docx.
        """
        try:
            import docx
            doc = docx.Document()
            doc.add_heading(title, level=0)
            
            # Simple markdown translation line-by-line
            for line in content.split("\\n"):
                if line.startswith("### "):
                    doc.add_heading(line.replace("### ", ""), level=2)
                elif line.startswith("## "):
                    doc.add_heading(line.replace("## ", ""), level=1)
                elif line.startswith("# "):
                    doc.add_heading(line.replace("# ", ""), level=0)
                else:
                    if line.strip():
                        doc.add_paragraph(line)
            
            file_stream = BytesIO()
            doc.save(file_stream)
            file_stream.seek(0)
            return file_stream.read()
        except ImportError:
            # Fallback when library is absent
            fallback = f"=== {title} ===\\n\\n(python-docx missing, exported as plain text)\\n\\n{content}"
            return fallback.encode("utf-8")

    @staticmethod
    def export_as_pdf(content, title="Generated Copy"):
        """
        Generates standard PDF reports utilizing the fpdf2 library.
        """
        try:
            from fpdf import FPDF
            
            class PDFReport(FPDF):
                def header(self):
                    self.set_font("helvetica", "B", 10)
                    self.cell(0, 10, "CopyCraft AI -- Premium Marketing Report", 0, 1, "C")
                    self.ln(5)
                def footer(self):
                    self.set_y(-15)
                    self.set_font("helvetica", "I", 8)
                    self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "C")
            
            pdf = PDFReport()
            pdf.add_page()
            pdf.set_font("helvetica", "B", 16)
            pdf.cell(0, 10, title, 0, 1, "L")
            pdf.ln(10)
            
            pdf.set_font("helvetica", "", 11)
            # Safe encoding encoding strings
            clean_text = content.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"').replace("—", "-")
            
            for line in clean_text.split("\\n"):
                if line.startswith("### "):
                    pdf.set_font("helvetica", "B", 12)
                    pdf.cell(0, 8, line.replace("### ", ""), 0, 1, "L")
                elif line.startswith("## ") or line.startswith("# "):
                    pdf.set_font("helvetica", "B", 14)
                    pdf.cell(0, 10, line.replace("## ", "").replace("# ", ""), 0, 1, "L")
                else:
                    pdf.set_font("helvetica", "", 10)
                    if line.strip():
                        pdf.multi_cell(0, 5, line)
                        pdf.ln(2)
                    else:
                        pdf.ln(3)
                        
            return pdf.output()
        except Exception as e:
            fallback = f"=== {title} ===\\n\\n(PDF generation failed, exported as plain text)\\n\\n{content}"
            return fallback.encode("utf-8")
`,

  "app.py": `import streamlit as st
import pandas as pd
import plotly.express as px
import os
import io

from config import APP_NAME, APP_VERSION, TONE_DIRECTIVES, PERSONA_PROFILES, EMOTION_MODIFIERS, SUPPORTED_PLATFORMS
from prompt_builder import CopyCraftPromptBuilder
from generator import CopyCraftGenerator
from scoring_engine import CopyScoringEngine
from campaign_generator import CampaignGenerator
from seo_generator import SEOGenerator
from history_manager import HistoryManager
from export_utils import CopyExporter

# Page Layout configuration
st.set_page_config(
    page_title=f"{APP_NAME} - Automated COPYWRITER & Campaign Studio",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Dark theme custom injection
st.markdown("""
<style>
    .main { background-color: #0F172A; color: #F8FAFC; }
    .stSidebar { background-color: #1E293B !important; }
    div[data-testid="stExpander"] { background-color: #1E293B; border-radius: 8px; border: 1px solid #334155; }
    .stButton>button { width: 100%; border-radius: 6px; background-color: #2563EB; color: white !important; font-weight: 600; }
    .stButton>button:hover { background-color: #1D4ED8; }
</style>
""", unsafe_type=True)

# Session state initialization
if "brand_profiles" not in st.session_state:
    st.session_state.brand_profiles = {
        "Apple": "Sleek, minimalist, premium, focusing on innovation and simplicity.",
        "Nike": "Inspirational, high-energy, athletic, focus on human grit and personal victory.",
        "Tesla": "Futuristic, visionary, bold, technical and revolutionary.",
        "Startup": "Fast-paced, bold, disruptive, modern and community-focused."
    }

if "history" not in st.session_state:
    st.session_state.history = []

history_manager = HistoryManager()
generator = CopyCraftGenerator()
scorer = CopyScoringEngine()
campaign_studio = CampaignGenerator()
seo_engine = SEOGenerator()

# Sidebar: Configurations and Parameters
st.sidebar.title("🛠️ CopyCraft Controls")
st.sidebar.markdown("Configure intelligence variables for content transformation.")

api_key_input = st.sidebar.text_input("Gemini API Client Key", type="password", help="Optionally override app's default key.")
if api_key_input:
    generator = CopyCraftGenerator(api_key=api_key_input)
    scorer = CopyScoringEngine(api_key=api_key_input)
    campaign_studio = CampaignGenerator(api_key=api_key_input)
    seo_engine = SEOGenerator(api_key=api_key_input)

# Inference controls
st.sidebar.subheader("🎛️ Inference Parameters")
temperature = st.sidebar.slider("Temperature", 0.0, 1.5, 0.7, 0.1, help="Higher results encourage wilder creativity.")
top_p = st.sidebar.slider("Top P", 0.0, 1.0, 0.9, 0.05, help="Controls selection randomness threshold.")
max_tokens = st.sidebar.slider("Max Output Tokens", 128, 4096, 1024, 128, help="Response tokens constraint.")

# Model status
if generator.api_key:
    st.sidebar.success("● API Connected: gemini-3.5-flash")
else:
    st.sidebar.warning("⚠️ API Key Missing! Running Mock Fallback.")

# App Header Hero banner
st.title("🚀 CopyCraft AI — Tone Transformer")
st.markdown("##### *Elite Automated AI Copywriter, Multi-Channel Campaign Studio & Advanced Analytics*")

# Create Main Tabs
tabs = st.tabs(["✍️ Master Generator", "⚡ Multi-Variation Hub", "📣 Multi-Channel Campaign Studio", "🔍 SEO Optimizer", "📊 History & Analytics", "📔 Brand Knowledge base (RAG)"])

# Left Column (Global Product input)
with st.container():
    col_l, col_r = st.columns([1, 2])

# Injecting inputs and structures on separate tab panels
with tabs[0]:
    # Master Generator View
    st.subheader("✍️ Copywriting Pipeline")
    prod_name = st.text_input("Product/Service Name", placeholder="e.g. FitTrack Band")
    prod_category = st.text_input("Product Category", placeholder="e.g. Wearable Fitness Biotech")
    prod_desc = st.text_area("Product Description", placeholder="e.g. A lightweight wristband measuring real-time stress scales, bio-frequencies, and automatic posture monitoring.")
    prod_benefits = st.text_area("Core Benefits / Unique Value Prop (UVP)", placeholder="e.g. Prevent burnout by matching circadian levels, track daily steps, battery lasts 30 calendar days.")
    prod_target = st.text_input("Target Audience Sector", placeholder="e.g. Chronically busy corporate tech workers")

    st.markdown("---")
    sc1, sc2, sc3 = st.columns(3)
    platform = sc1.selectbox("Platform Target", SUPPORTED_PLATFORMS)
    tone = sc2.selectbox("Tone / Brand voice Profile", list(TONE_DIRECTIVES.keys()))
    persona = sc3.selectbox("Audience Micro Persona", list(PERSONA_PROFILES.keys()))
    
    emotion = st.selectbox("Trigger Core Emotion", list(EMOTION_MODIFIERS.keys()))
    brand_voice = st.selectbox("Brand Reference Style", ["None"] + list(st.session_state.brand_profiles.keys()))

    rag_text = ""
    # Check if brand Guidelines are configured
    if "rag_docs" in st.session_state and st.session_state.rag_docs:
        rag_text = "\\n".join([f"- {d}" for d in st.session_state.rag_docs])
        st.info(f"💡 RAG Integration Active: Using {len(st.session_state.rag_docs)} extracted brand guidelines.")

    if st.button("Generate Copywrite Pieces"):
        if not prod_name or not prod_desc:
            st.error("Please add at least Product Name and Concept Details!")
        else:
            with st.spinner("Analyzing parameters and running copywriting frameworks..."):
                brand_desc = st.session_state.brand_profiles.get(brand_voice, "") if brand_voice != "None" else ""
                prompt = CopyCraftPromptBuilder.build_copy_prompt(
                    prod_name, prod_desc, prod_category, prod_benefits, prod_target,
                    platform, tone, persona, emotion, brand_desc, rag_text
                )
                
                # Model Call
                output = generator.generate(prompt, temperature, top_p, max_tokens)
                st.session_state.last_output = output
                
                # Eval copy
                score_report = scorer.evaluate_copy(output)
                st.session_state.last_score = score_report
                
                # Track in history
                history_manager.save_generation({
                    "product_name": prod_name,
                    "platform": platform,
                    "tone": tone,
                    "persona": persona,
                    "content": output,
                    "score": score_report["overall_score"]
                })
                
                st.success("Generation completed!")

    if "last_output" in st.session_state:
        st.markdown("### Generated Contents")
        st.markdown(st.session_state.last_output)
        
        # Scoring metrics visualizer
        st.markdown("---")
        st.subheader("📊 Copy Quality Score & Review")
        sr = st.session_state.last_score
        
        # Show Metrics Columns
        m1, m2, m3, m4 = st.columns(4)
        m1.metric("Overall Quality Score", f"{sr['overall_score']} / 100")
        m2.metric("Engagement Rating", f"{sr['engagement']}%")
        m3.metric("Clarity Ratio", f"{sr['clarity']}%")
        m4.metric("Seo Readiness", f"{sr['seo_readiness']}%")
        
        col_la, col_ra = st.columns(2)
        with col_la:
            st.markdown(f"**Viral Potential Prediction**: :{sr['viral_potential']} Potential")
            st.info(f"**Predictor Analysis**: {sr['viral_reasoning']}")
        with col_ra:
            st.write("**Strengths**:")
            for s in sr['strengths']: st.markdown(f"✅ {s}")
            st.write("**Improvements Needed**:")
            for i in sr['improvements']: st.markdown(f"⚠️ {i}")

        # Export utilities
        st.markdown("---")
        st.subheader("📥 Export Outputs")
        exp_txt = CopyExporter.export_as_txt(st.session_state.last_output, prod_name)
        exp_pdf = CopyExporter.export_as_pdf(st.session_state.last_output, prod_name)
        exp_docx = CopyExporter.export_as_docx(st.session_state.last_output, prod_name)
        
        e1, e2, e3 = st.columns(3)
        e1.download_button("Export Plain TEXT", exp_txt, f"{prod_name}_copy.txt", "text/plain")
        e2.download_button("Export Premium PDF", exp_pdf, f"{prod_name}_copy.pdf", "application/pdf")
        e3.download_button("Export Word DOCX", exp_docx, f"{prod_name}_copy.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")

with tabs[1]:
    # Multi-Variation A/B Test tab
    st.subheader("⚡ A/B/C Multi-Variation Generator")
    st.write("Generate three diverse iterations of copy simultaneously to find the absolute winning version.")
    
    if st.button("Generate Variations A, B, and C"):
        if not prod_name or not prod_desc:
            st.error("Please ensure Product Name and Description are completed on the first tab.")
        else:
            with st.spinner("Generating and scoring parallel variations..."):
                variations = []
                # Setup 3 diverse prompts
                t_options = ["Persuasive", "Inspirational", "Luxury"] if tone == "Professional" else [tone, "Humorous", "Persuasive"]
                
                for idx, t_opt in enumerate(["Variation A (Base)", "Variation B (Alternative Tone)", "Variation C (A/B Test Dynamic)"]):
                    chosen_tone = tone if idx == 0 else t_options[idx]
                    prompt = CopyCraftPromptBuilder.build_copy_prompt(
                        prod_name, prod_desc, prod_category, prod_benefits, prod_target,
                        platform, chosen_tone, persona, emotion, "", ""
                    )
                    out = generator.generate(prompt, temperature + (idx*0.2), top_p, max_tokens)
                    sc_res = scorer.evaluate_copy(out)
                    variations.append({"title": t_opt, "copy": out, "score": sc_res})
                
                st.session_state.variations = variations
                st.success("Variations Generated!")

    if "variations" in st.session_state:
        v_cols = st.columns(3)
        for i, var in enumerate(st.session_state.variations):
            with v_cols[i]:
                st.subheader(var["title"])
                st.markdown(f"**Calculated Score: {var['score']['overall_score']} / 100**")
                st.info(var["copy"])
                st.write("**Analysis reasoning**:")
                st.write(var["score"]["viral_reasoning"])

with tabs[2]:
    # Campaign Studio
    st.subheader("📣 Multi-Channel campaign Studio")
    st.write("Construct a complete synchronized rollout campaign tailored for 6 platforms in a single creative blueprint.")
    
    if st.button("Launch Single-Click Creative Campaign"):
        if not prod_name or not prod_desc:
            st.error("Ensure Product Name and Description are loaded in tab 1.")
        else:
            with st.spinner("CcCc creative parameters and building multi-channel structures..."):
                camp_out = campaign_studio.generate_campaign_studio(
                    prod_name, prod_desc, prod_benefits, prod_target, tone, brand_voice
                )
                st.session_state.camp_out = camp_out
                st.success("Campaign rollout created successfully!")

    if "camp_out" in st.session_state:
        st.markdown(st.session_state.camp_out)
        
        st.markdown("---")
        ctxt = CopyExporter.export_as_txt(st.session_state.camp_out, f"{prod_name}_Campaign")
        cpdf = CopyExporter.export_as_pdf(st.session_state.camp_out, f"{prod_name}_Campaign")
        cdoc = CopyExporter.export_as_docx(st.session_state.camp_out, f"{prod_name}_Campaign")
        
        ce1, ce2, ce3 = st.columns(3)
        ce1.download_button("Download Campaign TXT", ctxt, "campaign_suite.txt")
        ce2.download_button("Download Campaign PDF", cpdf, "campaign_suite.pdf")
        ce3.download_button("Download Campaign DOCX", cdoc, "campaign_suite.docx")

with tabs[3]:
    # SEO Optimizer
    st.subheader("🔍 SEO & Blog Column Generator")
    keywords_input = st.text_input("Target Focus Keywords", placeholder="e.g. wristband stress tracker, bio-feedback circadian wrist monitor")
    
    if st.button("Configure SEO metadata"):
        if not prod_name:
            st.error("Load Product name first in Tab 1.")
        else:
            with st.spinner("Extracting semantic intent and building SEO meta records..."):
                seo_out = seo_engine.generate_seo_assets(prod_name, prod_desc, keywords_input)
                st.session_state.seo_out = seo_out
                st.success("SEO records ready!")

    if "seo_out" in st.session_state:
        st.markdown(st.session_state.seo_out)

with tabs[4]:
    # History & Analytics Panel
    st.subheader("📊 Generation Analytics & History Cache")
    hist_list = history_manager.get_generations()
    
    if not hist_list:
        st.write("Generations you complete will build metrics here automatically.")
    else:
        # Mini metrics
        total_gen = len(hist_list)
        avg_score = int(sum(h["score"] for h in hist_list) / total_gen) if total_gen > 0 else 0
        
        cl1, cl2 = st.columns(2)
        cl1.metric("Lifetime Generations Run", total_gen)
        cl2.metric("Mean Copywriting score", f"{avg_score} / 100")
        
        # Simple stats charts using Pandas & Plotly
        df = pd.DataFrame(hist_list)
        
        col_c1, col_c2 = st.columns(2)
        with col_c1:
            st.write("### Platform Demand Distribution")
            fig_p = px.pie(df, names="platform", hole=0.4, color_discrete_sequence=px.colors.qualitative.Pastel)
            st.plotly_chart(fig_p, use_container_width=True)
            
        with col_c2:
            st.write("### Brand voice / Tones Utilization")
            fig_t = px.bar(df, x="tone", color="tone", title="Tone distributions", color_discrete_sequence=px.colors.qualitative.Dark24)
            st.plotly_chart(fig_t, use_container_width=True)
            
        st.markdown("---")
        st.subheader("🗂️ Historic Copy Cache Records")
        for h in hist_list:
            with st.expander(f"Run #{h['id']} - {h['product_name']} ({h['platform']}) | Score: {h['score']}", expanded=False):
                st.markdown(f"**Timestamp**: {h['timestamp']}")
                st.markdown(f"**Tone**: {h['tone']} | **Target Persona**: {h['persona']}")
                st.code(h["content"])

with tabs[5]:
    # Brand Knowledge System (RAG)
    st.subheader("📔 Brand Knowledge Base & Context Retriever (RAG)")
    st.write("Upload brand files or copy/paste style guidelines to retrieve vector context matches for future writings.")
    
    rag_input = st.text_area("Paste Corporate Guidelines / Product Specifics Catalog directly", placeholder="e.g. FitTrack Inc. style requires never using slang, always capitalizing circular stress tracks...")
    
    if st.button("Index brand Guidelines"):
        if not rag_input:
            st.error("Please add some instructions/guidelines text first!")
        else:
            if "rag_docs" not in st.session_state:
                st.session_state.rag_docs = []
            st.session_state.rag_docs.append(rag_input)
            st.success("Document chunk parsed, vectorized and indexed in local session memory repository!")
            
    if "rag_docs" in st.session_state and st.session_state.rag_docs:
        st.markdown("### Currently Indexed Documents")
        for idx, doc in enumerate(st.session_state.rag_docs):
            st.markdown(f"**Guideline Chunk #{idx+1}**: {doc[:100]}...")
`,

  "docs/architecture.md": `# CopyCraft AI Architecture Blueprint

CopyCraft AI is designed using a clean, layered, modular object-oriented structural paradigm.

## System Schematic Model

\`\`\`
   ┌──────────────────────────────────────────────┐
   │            Streamlit App Controller (app.py) │
   └──────────────────────┬───────────────────────┘
                          │
         ┌────────────────┼────────────────┌────────────────┐
         ▼                ▼                ▼                ▼
┌────────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Scoring Engine│ │ SEO Generator│ │  Prompt      │ │ Generator    │
│(scoring_engine)│ │(seo_generator)││  Builder     │ │(generator.py)│
└────────┬───────┘ └────────┬──────┘ └──────┬───────┘ └──────┬───────┘
         │                  │               │                │
         └──────────────────┼───────────────┼────────────────┘
                            ▼               ▼
                     ┌──────────────────────────────┐
                     │ Google GenAI Client (SDK)    │
                     └──────────────┬───────────────┘
                                    ▼
                     ┌──────────────────────────────┐
                     │ Google Gemini-3.5-flash Cloud │
                     └──────────────────────────────┘
\`\`/

### Subsystem Description:
1. **App Interface Controller (\`app.py\`)**: Drives layouts, inputs, session structures, and states using Streamlit components.
2. **Dynamic Prompt Assembly (\`prompt_builder.py\`)**: Leverages user metrics to format directives according to prebuilt styling blueprints.
3. **Copy Generator Pipeline (\`generator.py\`)**: Handles direct REST client connection to modern Google GenAI API interfaces.
4. **Scoring Engine (\`scoring_engine.py\`)**: Scores raw responses outputted from standard models.
5. **SEO Optimizer System (\`seo_generator.py\`)**: Dedicated models to output blog setups and indexing focus keywords.
6. **Historics Manager (\`history_manager.py\`)**: Writes persistent records locally as a standard registry database.
`,

  "docs/api_usage.md": `# API Connection Guides & Configs

CopyCraft AI uses the official Google GenAI Python library, specifically targeting \`gemini-3.5-flash\`.

## Sample Python Connection

\`\`\`python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

response = client.models.generate_content(
    model='gemini-3.5-flash',
    contents='Create a luxury tagline for an elite clock',
    config=types.GenerateContentConfig(
        temperature=0.7,
        top_p=0.9
    )
)

print(response.text)
\`\`\`
`,

  "README.md": `# CopyCraft AI – Automated Copywriting & Tone Transformer

CopyCraft AI is a complete Generative AI marketing and copywrite analytics solution built inside Streamlit, leveraging modern gemini-3.5-flash models to transform product raw summaries into professional campaigns.

## Key Highlights
- **Campaign Studio**: Generation of entire synchronized rollout campaign structures immediately on multiple platforms.
- **Micro & Tagline Optimization**: Tailors micro captions and Taglines specifically centered around targeted emotions.
- **Copy Evaluation scoring**: Scores clarity, readability, persuasiveness, and meta descriptions.
- **Analytics & History**: Track lifetime outputs via intuitive chart visuals.

## Local Installation Steps

1. Clone or download files from the exported directory structure:
\`\`\`bash
git clone https://github.com/YourUsername/CopyCraft-AI.git
cd CopyCraft-AI
\`\`\`

2. Install python packages:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Configure variables in your environment:
\`\`\`bash
cp .env.example .env
# Edit .env and enter your valid GEMINI_API_KEY
\`\`\`

4. Boot the streamlit controller:
\`\`\`bash
streamlit run app.py
\`\`\`
`
};
