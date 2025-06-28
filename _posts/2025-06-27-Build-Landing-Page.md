---
layout: post
title: Build Landing Page For GenAI Engineer Course
description: Building the landing page in next.js for the GenAI Engineer Course
date:   2025-06-27 01:42:44 -0500
---

# Build a Landing Page with Next.js, TailwindCSS, and React

In this guide, I’ll walk you through how to build a modern landing page, using Next.js, TailwindCSS, and a few essential React libraries. Whether you’re marketing a bootcamp, a course, or a digital product, this tutorial gives you a full-stack production-ready layout and strategy to ship fast.

⸻

🧭 What We’re Rebuilding

We’re re-creating the following structure (all naming is customized for clarity):

Order	Section	Description
1	Hero	Title, tagline, and dual CTA buttons
2	Deadline Banner	Application urgency callout
3	Trust Logos	Trustpilot/CourseReport review badges
4	Testimonials	Rotating quotes from past learners
5	Outcomes	What you’ll learn, via icon bullets
6	Rankings	University brag bar with rankings
7	Curriculum	Accordion-style module breakdown
8	Lead Capture Form	Email, phone, experience dropdown
9	FAQ	Expandable Q&A below the fold


⸻

🧱 Step 1: Bootstrapping the Project

We’ll use Next.js 14 (App Router) for static rendering and optimal performance. Start with:

```bash
npx create-next-app@latest ai-landing --app
cd ai-landing
```

Install core dependencies:

```bash
npm install tailwindcss framer-motion react-hook-form @headlessui/react
npx tailwindcss init -p
```

Update tailwind.config.js:

```javascript
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
plugins: [],
```

Then in app/globals.css, paste:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

⸻

🧱 Step 2: File Structure

Organize reusable components:

```
/app
  └ page.tsx
/components
  ├ Hero.tsx
  ├ DeadlineBanner.tsx
  ├ TrustBar.tsx
  ├ Testimonials.tsx
  ├ Outcomes.tsx
  ├ Rankings.tsx
  ├ Curriculum.tsx
  ├ LeadForm.tsx
  ├ Faq.tsx
  └ Button.tsx
/public
  └ /images
```

⸻

💡 Step 3: Build Each Component

🟨 Hero.tsx

```typescript
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-[url('/images/hero-bg.jpg')] bg-cover bg-center text-white py-24 px-6 text-center">
      <div className="bg-black/60 absolute inset-0" />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold mb-4">AI & Machine Learning for Leaders</h1>
        <p className="text-lg mb-6">Build real-world GenAI and ML systems in just 7 months.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg">Apply Now</button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-lg">Download Brochure</button>
        </div>
      </motion.div>
    </section>
  );
}
```

⸻

🟥 DeadlineBanner.tsx

```typescript
export default function DeadlineBanner() {
  const deadline = new Date("2025-07-03");
  const today = new Date();
  const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-red-600 text-white text-center py-2 font-semibold">
      Application closes in {daysLeft} days – July 3, 2025
    </div>
  );
}
```

⸻

🟦 TrustBar.tsx

```typescript
export default function TrustBar() {
  const platforms = [
    { name: "Trustpilot", rating: "4.8/5" },
    { name: "CourseReport", rating: "4.7/5" },
  ];
  return (
    <div className="bg-gray-100 py-4 flex justify-center gap-8">
      {platforms.map((p) => (
        <div key={p.name} className="text-center">
          <p className="text-xl font-bold">{p.rating}</p>
          <p className="text-sm text-gray-600">{p.name}</p>
        </div>
      ))}
    </div>
  );
}
```

⸻

🟩 Testimonials.tsx

Use Embla Carousel or react-slick for a more robust slider. Placeholder version:

```typescript
export default function Testimonials() {
  const testimonials = [
    { name: "Casey L.", title: "CTO, Retail", quote: "This course changed the trajectory of my career." },
    { name: "Amara G.", title: "Product Manager", quote: "Practical and relevant. Worth every minute." },
  ];

  return (
    <div className="py-12 bg-white text-center">
      <h2 className="text-2xl font-bold mb-6">Learner Testimonials</h2>
      <div className="space-y-6 max-w-xl mx-auto">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="italic border-l-4 border-orange-500 pl-4">
            “{t.quote}”<br />
            <span className="block mt-2 text-sm font-medium">– {t.name}, {t.title}</span>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
```

⸻

🟨 Outcomes.tsx

```typescript
const outcomes = [
  "Lead AI and GenAI initiatives at your company",
  "Build ML pipelines from raw data to deployed models",
  "Understand LLMs and prompt engineering",
  "Capstone project with real-world AI challenge"
];

export default function Outcomes() {
  return (
    <section className="bg-slate-50 py-12">
      <h2 className="text-center text-2xl font-bold mb-6">What You'll Learn</h2>
      <ul className="max-w-xl mx-auto grid gap-4">
        {outcomes.map((item, i) => (
          <li key={i} className="bg-white p-4 rounded-md shadow-sm">{item}</li>
        ))}
      </ul>
    </section>
  );
}
```

⸻

🟪 Curriculum.tsx (Accordion)

```typescript
import { Disclosure } from "@headlessui/react";

const modules = [
  { title: "Module 1: Statistics & Python", details: "Foundations of data analysis and Python for ML." },
  { title: "Module 2: Machine Learning", details: "Supervised learning, cross-validation, pipelines." },
  { title: "Module 3: Deep Learning", details: "CNNs, RNNs, transformers, training optimization." },
  { title: "Module 4: Generative AI", details: "Prompting, LLMs, RLHF, LangChain, agents." },
];

export default function Curriculum() {
  return (
    <section className="py-12 px-4 bg-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Curriculum Overview</h2>
      {modules.map((m, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full text-left font-medium py-2 border-b">{m.title}</Disclosure.Button>
              <Disclosure.Panel className="py-2 text-sm text-gray-600">{m.details}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </section>
  );
}
```

⸻

🟫 LeadForm.tsx

```typescript
import { useForm } from "react-hook-form";

export default function LeadForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log("Form Data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 py-10 px-6 max-w-xl mx-auto rounded-md">
      <h2 className="text-xl font-bold mb-4">Apply for the Program</h2>
      <input {...register("name")} placeholder="Full Name" className="w-full p-2 mb-4 border" />
      <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 mb-4 border" />
      <input {...register("phone")} type="tel" placeholder="Phone Number" className="w-full p-2 mb-4 border" />
      <select {...register("experience")} className="w-full p-2 mb-4 border">
        <option value="">Experience Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
    </form>
  );
}
```

⸻

🚀 Step 4: Deploy It

Push to GitHub and deploy to Vercel or Netlify:

```bash
git init
git add .
git commit -m "Initial site"
```

Vercel auto-detects Next.js, builds, and serves the app globally.

⸻

📈 Step 5: Add Growth Tools

| Feature | Tool |
|---|---|
| Analytics | Plausible / PostHog |
| Session Recording | OpenReplay |
| A/B Testing | next-experiment, or manually route traffic by UTM |
| CRM Integrations | Zapier or serverless /api/submit → Mailchimp / HubSpot |
| SEO | Add JSON-LD schema via next/seo |

⸻

🏁 Wrapping Up

With this guide, you now have:

✅ A production-ready layout
✅ Responsive styling with Tailwind
✅ React component structure
✅ Form validation & lead capture
✅ Real-time urgency logic
✅ Expandable curriculum
✅ SEO-ready and deployable in one click

Want to go further? Add AI-powered form auto-filling, testimonial sentiment scoring, or live chat with a local LLM.

💬 Got questions or want the full template repo? Drop me a message on GitHub or leave a comment below.

⸻

Now go forth, build fast—and convert smarter. 🧠💻

⸻

Below is a ready-to-paste CLIne prompt that will spin up a Next .js 14 + Tailwind landing page whose layout mimics your GEN-AI 4001: Applied Generative AI Engineering course.
Course facts (title, tagline, duration, module names) were taken from the published syllabus at danielkliewer.com/genai-course and danielkliewer.com/genai-course/syllabus  ￼ ￼.

# === CLIne • New Task =========================================
# GOAL
Build a high-converting landing page for my free course
“GEN-AI 4001: Applied Generative AI Engineering”.
Match the visual rhythm of UT-Austin’s Exec-Ed AI page
(hero, urgency banner, trust bar, testimonials, outcomes,
rankings, accordion curriculum, lead-capture form, FAQ),
but use the content & branding below.

# TECH STACK & CONSTRAINTS
- Next.js 14 (App Router, TypeScript, Server Components)
- Tailwind CSS, Framer Motion (basic fade/slide), Headless UI
- Form handled with react-hook-form → POST to /api/lead
  • Hidden inputs must capture all UTM params
- Images: royalty-free or Unsplash placeholders only
- All text/images must be CC-BY-SA friendly
- CTAs: “Start Learning Free”  &  “Download Syllabus”
- Deliver a PR-ready repo (no .git history) in /genai-landing

# CONTENT  (to drop straight into copy)
courseTitle:  GEN-AI 4001: Applied Generative AI Engineering
tagLine:      Building Production-Ready AI Systems from
              Foundation to Deployment
metaStats:    24 weeks • Self-paced milestones • Intermediate-Advanced
overview:     This intensive, project-driven course transforms
              intermediate developers into production-ready Gen-AI
              engineers through six full-stack projects.
modules:
  - Orientation – What is a Gen-AI Engineer? (Week 1)
  - Module 1 – Implementing Transformers from Scratch (Weeks 2-4)
  - Module 2 – Domain-Specific Fine-Tuning (Weeks 5-7)
  - Module 3 – Serving LLMs with FastAPI + VLLM (Weeks 8-10)
  - Module 4 – RAG with Vector Databases (Weeks 11-13)
  - Module 5 – Multimodal Reasoning & Guardrails (Weeks 14-16)
  - Module 6 – MLOps and Model Governance (Weeks 17-19)
  - Capstone – Job-Market Simulation (Weeks 20-24)
keyOutcomes:
  • Implement transformer models from first principles
  • Deploy scalable LLM inference with FastAPI + VLLM
  • Build production RAG pipelines with vector DB back-ends
  • Ship multimodal systems with safety guardrails
  • Master MLOps & governance for real-world AI
licensingNote: “Course content CC-BY-SA 4.0, code MIT”

# DELIVERABLE FILES
/app/page.tsx              ← assembles sections in order
/components/
  Hero.tsx                 (bg-image, title, tagline, dual CTA)
  DeadlineBanner.tsx       (dynamic calc daysLeft to next cohort)
  TrustBar.tsx             (two rating placeholders 4.8 ★)
  Testimonials.tsx         (slider with 3 stub quotes)
  Outcomes.tsx             (icon bullets from keyOutcomes)
  Rankings.tsx             (placeholder QS & FT tiles)
  Curriculum.tsx           (accordion fed by modules[])
  LeadForm.tsx             (react-hook-form, hidden UTM fields)
  Faq.tsx                  (5 placeholder Q&As)
/public/images/            (hero.jpg, placeholder headshots)
/styles/globals.css        (Tailwind directives)
/api/lead/route.ts         (POST stub logs JSON to console)

# PLAN MODE
1. Scaffold project & install deps.
2. Generate Tailwind config; add brand colours in theme.extend.
3. Stub all components with props & Storybook-style example data.
4. Wire page.tsx to render components w/ dummy props.
5. Implement DeadlineBanner logic (targetDate = '2025-09-01').
6. Hook LeadForm to /api/lead; console-log payload for now.
7. Ensure lighthouse ≥ 90, axe-core scan passes.
8. Hand back PR-ready folder structure.

# ACT MODE
After presenting the plan, wait for my 👍 before it writes code.
# ===============================================================

Copy that block into your CLine chat, give it a quick “Go for it 👌”, and CLine will first outline the steps (Plan Mode). Approve, and it will execute the scaffold, generate code, and hand you a fully-functional landing page skeleton that’s ready for design polish and real testimonials.
