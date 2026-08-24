export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceCategory {
  name: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: 'AI Enablement & Training Consulting',
    items: [
      {
        title: 'AI Operations Adoption Plan',
        description:
          "A full audit of an organization's workflows, tools, and team structure, mapped against where AI can actually save time without hurting quality. Includes a department-by-department opportunity map, prioritized workflow designs, a phased rollout plan, a governance policy, and a measurement framework. Signature deliverable.",
      },
      {
        title: 'Custom AI Training Programs',
        description:
          "Multi-session training built around a team's real work, not generic AI literacy. Each session uses the team's own documents, shows a tool failing before fixing it live, and ends with a written per-workflow guide people can use on their own after the session.",
      },
      {
        title: 'Workflow Design & Documentation',
        description:
          'For each recurring task worth automating: the current process mapped, the improved process designed, the source materials it depends on identified, a tested prompt or reusable instruction set written, a human review step built in, and a way to measure whether it worked.',
      },
      {
        title: 'AI Workspace & Tool Architecture',
        description:
          'Google Drive and AI-project structure designed around who needs to see what. Permission boundaries, document naming and versioning rules, and source-of-truth rules that keep AI output grounded in approved material instead of drafts.',
      },
      {
        title: 'AI Governance & Security Policy',
        description:
          "A plain-English policy covering what data can and can't go into an AI tool, who signs off on what before it reaches a client, and how access gets reviewed and removed.",
      },
      {
        title: 'Champion / Train-the-Trainer Programs',
        description:
          'Instead of training everyone at once, a small number of internal leads get trained deeply enough to sustain adoption after the engagement ends.',
      },
      {
        title: 'SOP & Knowledge Capture',
        description:
          "Turning what's in a founder's or senior staff member's head into documented process guides, built from short recorded conversations instead of asking anyone to sit down and write.",
      },
      {
        title: 'AI Cost Efficiency & ROI Review',
        description:
          "An honest look at where AI adoption reduces cost or time and where it doesn't. Not every workflow should be automated, and the review says so where that's true.",
      },
      {
        title: 'Phased Implementation Planning',
        description:
          "A 30/60/90-day rollout with named owners, weekly deliverables, and defined success metrics, sequenced around the team's actual busy season instead of an arbitrary calendar.",
      },
      {
        title: 'Ongoing Advisory',
        description:
          "Periodic check-ins on what's working, what's been quietly abandoned, and where the governance policy is being tested in practice.",
      },
    ],
  },
  {
    name: 'Custom AI-Powered Tools',
    items: [
      {
        title: 'Custom AI workflows',
        description:
          "Reusable prompts and instruction sets built around a team's actual documents and templates, not a generic assistant bolted onto a business.",
      },
      {
        title: 'AI-assisted document generation systems',
        description:
          'Branded, structured documents (proposals, reports, training materials) generated from source data, with a human review step built into the process rather than treated as optional.',
      },
      {
        title: 'Persono',
        description:
          'An AI journaling app, designed and built end to end. Used as a working demonstration of product design and AI product judgment, not just a case study.',
      },
      {
        title: 'AI-powered internal tools',
        description:
          'Small custom apps (trackers, comparison tools, dashboards) that use AI for the parts that benefit from it and plain logic everywhere else.',
      },
      {
        title: 'Custom instruction sets / "skills"',
        description:
          "Packaged reference material and rules that make an AI tool consistent with a brand's voice, format, and non-negotiables, so output doesn't drift between sessions or users.",
      },
    ],
  },
  {
    name: 'Custom Non-AI Digital Tools',
    items: [
      {
        title: 'Invoicing & payment tracking systems',
        description:
          'Branded templates, sequential numbering, and a payment record that stays consistent across every client.',
      },
      {
        title: 'Trackers & dashboards',
        description:
          "Spreadsheet or lightweight web tools for pipeline, budget, or project status, built for people who won't open a full project-management platform.",
      },
      {
        title: 'Document templates & systems',
        description:
          "Word, PDF, and slide templates built for repeat use, with formatting rules built in so quality doesn't depend on whoever's editing that day.",
      },
      {
        title: 'Small web tools',
        description:
          'Purpose-built pages or calculators for a specific, narrow business need, without the overhead of a full application.',
      },
    ],
  },
];
