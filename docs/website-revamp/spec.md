# Website Revamp Spec

## Positioning

Roger Twan's website should move from a general full-stack developer portfolio toward an AI-native product engineer presence.

Primary message:

> AI Product Engineer building AI-native applications, agent workflows, and modern full-stack products.

The site should make visitors feel that Roger is actively building polished AI products, not only writing code or publishing a personal blog.

## Visual Direction

- Product-first, AI-native, startup-ready.
- Clean neutral base: white, graphite, black, restrained cyan, lime, and amber accents.
- Large product screenshots and AI workspace surfaces should carry the first impression.
- Use dashboard, agent workflow, RAG, architecture, and build-log visuals as proof.
- Avoid generic blue-purple gradients, cartoon robots, neon brains, badge walls, stock-photo AI imagery, and blog-first layouts.

Generated visual references:

- Mood board: `/Users/roger/.codex/generated_images/019f1c2c-a31e-7dd3-beb1-d2554eb571a8/ig_096ab4223d06e457016a44aa8e689481988bb4b22519981c58.png`
- Homepage mockup: `/Users/roger/.codex/generated_images/019f1c2c-a31e-7dd3-beb1-d2554eb571a8/ig_096ab4223d06e457016a44aadf559c8198897473c1ee04f01c.png`

## Navigation

```text
Roger Twan Website
├── Home
├── Projects
├── Journal
├── About
├── Contact
└── AI Assistant Chat
```

AI Assistant Chat should be a first-level navigation item because it connects to Roger's RAG system and acts as the strongest interactive AI-native proof on the site.

## Global Layout

```text
Global Layout
├── Header
│   ├── Logo / Roger Twan
│   ├── Nav
│   │   ├── Home
│   │   ├── Projects
│   │   ├── Journal
│   │   ├── About
│   │   └── Contact
│   ├── Primary CTA
│   │   └── Chat with AI Assistant
│   └── Mobile Menu
│       ├── Collapsed hamburger
│       └── Same nav links
│
├── Page Content
│   └── Responsive sections per page
│
└── Footer
    ├── Short positioning line
    │   └── AI Product Engineer building AI-native applications and workflows
    ├── Quick Links
    │   ├── Home
    │   ├── Projects
    │   ├── Journal
    │   ├── About
    │   └── Contact
    ├── Social Links
    │   ├── GitHub
    │   ├── LinkedIn
    │   └── Email
    └── Copyright / location / availability
```

All pages should share the same header and footer. The AI Assistant Chat page may use a more immersive middle layout, but it should still feel connected to the same site system.

## Responsive Rules

```text
Desktop
├── Header: horizontal nav
├── Hero: two-column layout
│   ├── Left: positioning + CTA
│   └── Right: product screenshot / AI interface
├── Project sections: 2-3 column grids
└── Footer: multi-column

Tablet
├── Header: compact nav or hamburger
├── Hero: two-column if space allows
├── Project sections: 2-column grids
└── Footer: 2-column

Mobile
├── Header: logo + hamburger + optional Chat CTA
├── Hero: single column
│   ├── Copy first
│   └── Product visual second
├── CTAs: stacked or 2-per-row
├── Project sections: single column
├── Chat page: sticky input near bottom if appropriate
└── Footer: single column
```

Consistency should cover:

- Header
- Footer
- Section spacing
- Button styles
- Project card styles
- Typography scale
- Page hero style
- CTA pattern
- Light and dark surface rules

## Page Tree And Sections

```text
Roger Twan Website
├── Home
│   ├── Hero
│   │   ├── AI Product Engineer positioning
│   │   ├── AI workspace / product screenshot
│   │   ├── CTA: View Projects
│   │   ├── CTA: Chat with AI Assistant
│   │   └── CTA: GitHub
│   ├── Featured Project
│   │   ├── Main AI showcase
│   │   ├── Screenshots
│   │   ├── Live entry / Chat entry
│   │   ├── Architecture preview
│   │   └── GitHub / Case Study
│   ├── Current Focus
│   │   ├── AI agents
│   │   ├── RAG systems
│   │   ├── AI-native UX
│   │   ├── Workflow automation
│   │   └── Self-hosted AI infrastructure
│   ├── Selected AI Work
│   │   ├── 3-5 curated projects
│   │   ├── Product screenshots
│   │   ├── AI workflow tags
│   │   └── Live / GitHub / Case Study links
│   ├── Journal Preview
│   │   ├── Latest AI build notes
│   │   └── RAG / agents / AI UX topics
│   ├── About Preview
│   │   └── Full-stack + UX + AI product background
│   └── Contact CTA
│       └── Collaboration / hiring prompt
│
├── Projects
│   ├── Page Hero
│   │   └── Selected AI products and experiments
│   ├── Featured Project
│   │   ├── Killer AI showcase
│   │   ├── Screenshots
│   │   ├── Demo
│   │   ├── Architecture
│   │   └── Tech stack
│   ├── Project Grid
│   │   ├── AI Assistant / RAG Chat
│   │   ├── Agent workflow tools
│   │   ├── RAG / knowledge systems
│   │   ├── Developer tooling
│   │   └── Full-stack products
│   ├── Experiments
│   │   ├── Prototypes
│   │   ├── Work in progress
│   │   └── Self-hosted AI experiments
│   └── GitHub Curation
│       ├── 3-5 polished repos
│       ├── README quality
│       ├── Screenshots
│       └── Deployment notes
│
├── AI Assistant Chat
│   ├── Chat Interface
│   │   ├── Direct conversation with Roger's AI assistant
│   │   ├── Connected to Roger's RAG system
│   │   ├── Streaming responses
│   │   └── Source-aware answers
│   ├── What It Knows
│   │   ├── Personal background
│   │   ├── Projects
│   │   ├── Technical notes
│   │   ├── Journal
│   │   └── Portfolio context
│   ├── RAG System Explanation
│   │   ├── Retrieval flow
│   │   ├── Knowledge base
│   │   ├── Embeddings / vector store
│   │   └── Citations / source grounding
│   ├── Product Notes
│   │   ├── Why this assistant exists
│   │   ├── UX decisions
│   │   ├── Limitations
│   │   └── Future improvements
│   └── CTA
│       ├── View architecture
│       ├── Read case study
│       └── Contact Roger
│
├── Case Studies
│   ├── Case Study Index
│   │   ├── Featured case studies
│   │   ├── Product thumbnails
│   │   └── Outcome summary
│   └── Case Study Template
│       ├── Problem
│       ├── Context / Constraints
│       ├── Product Goal
│       ├── UX Decisions
│       ├── AI Workflow
│       ├── Architecture
│       ├── Tradeoffs
│       ├── Screenshots / Demo
│       ├── Result
│       └── Next Steps
│
├── Journal
│   ├── Page Hero
│   │   └── Notes from building AI-native products
│   ├── Featured Build Log
│   │   └── Current major experiment
│   ├── Topic Filters
│   │   ├── Agents
│   │   ├── RAG
│   │   ├── AI UX
│   │   ├── Full-stack
│   │   ├── Self-hosting
│   │   └── Developer tooling
│   └── Article List
│       ├── Build notes
│       ├── Mistakes learned
│       ├── Architecture decisions
│       └── Product reflections
│
├── About
│   ├── Positioning Summary
│   │   ├── Full-stack engineer
│   │   ├── AI product engineer direction
│   │   └── UI/UX background
│   ├── How I Work
│   │   ├── Product thinking
│   │   ├── Systems thinking
│   │   ├── UX taste
│   │   └── Shipping mindset
│   ├── Skills
│   │   ├── AI product engineering
│   │   ├── Full-stack systems
│   │   ├── UX/UI
│   │   └── Infrastructure
│   ├── Experience
│   │   ├── Work history
│   │   └── Selected achievements
│   └── Personal Angle
│       ├── Builder story
│       ├── Interests
│       └── Working style
│
└── Contact
    ├── Contact Hero
    │   └── Build AI-native products and workflows
    ├── Contact Form
    │   ├── Name
    │   ├── Email
    │   └── Message
    ├── Social Links
    │   ├── GitHub
    │   ├── LinkedIn
    │   └── Email
    └── Collaboration Types
        ├── AI product engineering
        ├── RAG / agent workflows
        ├── Prototype to production
        └── Full-stack product builds
```

## Build Priority

```text
Phase 1
├── Home
├── AI Assistant Chat
└── Projects

Phase 2
├── Case Studies
└── Journal

Phase 3
├── About
└── Contact polish
```

Phase 1 should change the first impression from general full-stack developer to AI-native product builder as quickly as possible.
