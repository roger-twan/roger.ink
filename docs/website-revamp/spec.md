# Website Revamp Spec

## Positioning

Roger Twan's website should move from a general full-stack developer portfolio toward a product engineer presence shaped by AI-assisted building.

Primary message:

> Full-stack product engineer using AI-assisted workflows to move ideas into polished products.

The site should make visitors feel that Roger knows how to integrate AI into the product-building workflow: discovery, prototyping, implementation, knowledge systems, automation, and delivery. It should also make clear that Roger can build AI products when intelligence is part of the product itself.

## Visual Direction

- Product-first, AI-assisted, startup-ready.
- Clean neutral base: white, graphite, black, restrained cyan, lime, and amber accents.
- Large product screenshots and workflow surfaces should carry the first impression.
- Use product workflow, RAG, architecture, automation, and shipping visuals as proof.
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
└── Chat with my AI assistant
```

Chat with my AI assistant should appear as a primary CTA rather than a normal nav link. It connects to Roger's RAG system and acts as a strong interactive proof point, but it should support the broader message: Roger uses AI to improve product building from idea to delivery.

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
    │   └── Full-stack product engineer using AI-assisted workflows
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

All pages should share the same header and footer. The chat page may use a more immersive middle layout, but it should still feel connected to the same site system.

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
│   │   ├── AI-assisted product-building positioning
│   │   ├── Product workflow / product screenshot
│   │   ├── CTA: View Projects
│   │   ├── CTA: Chat with AI Assistant
│   │   └── CTA: GitHub
│   ├── AI Assistant
│   │   ├── RAG-powered assistant connected to site knowledge
│   │   ├── Example of AI embedded in a product experience
│   │   ├── Inline chat entry
│   │   └── Full chat page entry
│   ├── Featured Project
│   │   ├── Main product showcase
│   │   ├── Screenshots
│   │   ├── Live entry
│   │   ├── Architecture preview
│   │   └── GitHub / Case Study
│   ├── Current Focus
│   │   ├── AI-assisted discovery
│   │   ├── Prototype acceleration
│   │   ├── Knowledge systems
│   │   ├── Workflow automation
│   │   └── Practical shipping systems
│   ├── Selected Work
│   │   ├── 3-5 curated projects
│   │   ├── Product screenshots
│   │   ├── Workflow / product tags
│   │   └── Live / GitHub / Case Study links
│   ├── Journal Preview
│   │   ├── Latest product-building notes
│   │   └── AI workflows / RAG / UX / architecture topics
│   ├── About Preview
│   │   └── Full-stack + UX + AI-assisted product background
│   └── Contact CTA
│       └── Collaboration / hiring prompt
│
├── Projects
│   ├── Page Hero
│   │   └── Selected products, AI-assisted workflows, and experiments
│   ├── Featured Project
│   │   ├── Strong product showcase
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
├── Chat with my AI assistant
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
│   │   └── Project context
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
│   │   └── Notes on building products with AI
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
│   │   ├── AI-assisted product-building direction
│   │   └── UI/UX background
│   ├── How I Work
│   │   ├── Product thinking
│   │   ├── Systems thinking
│   │   ├── UX taste
│   │   └── Shipping mindset
│   ├── Skills
│   │   ├── AI-assisted product engineering
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
    │   └── Build products faster and better with AI
    ├── Contact Form
    │   ├── Name
    │   ├── Email
    │   └── Message
    ├── Social Links
    │   ├── GitHub
    │   ├── LinkedIn
    │   └── Email
    └── Collaboration Types
        ├── AI-assisted product engineering
        ├── RAG / agent workflows
        ├── Prototype to production
        └── Full-stack product builds
```

## Build Priority

```text
Phase 1
├── Home
├── Chat with my AI assistant
└── Projects

Phase 2
├── Case Studies
└── Journal

Phase 3
├── About
└── Contact polish
```

Phase 1 should change the first impression from general full-stack developer to product engineer who uses AI as a practical force multiplier across the build process.
