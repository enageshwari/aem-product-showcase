# Portfolio Page — Authoring Guide

This document explains exactly how to recreate the portfolio page in da.live or Google Docs.
Each section below is a block table. Copy each table into your doc in order.

The final published URL will be:
https://main--adobe-cloud-platform--enageshwari.aem.live/

---

## How to use this guide

1. Open https://da.live (or create a new Google Doc)
2. Install the AEM Sidekick Chrome extension
3. For each section below, insert a table with the exact rows shown
4. The first row of every table is the block name — it tells AEM which block to load
5. Click Preview in Sidekick to see it live, then Publish to push to aem.live

---

## Page structure (in order)

---

### 1. Metadata (first thing in the doc — no visible output)

| Metadata      |                                                                  |
|---------------|------------------------------------------------------------------|
| Title         | Nageshwari Elango — Senior Backend Engineer                      |
| Description   | Portfolio for Adobe R168509: 10 years AWS cloud engineering, Java, microservices, AI-first development. |
| Image         | (paste your headshot or a professional photo here)               |

---

### 2. Hero block

| Hero          |                                                                  |
|---------------|------------------------------------------------------------------|
| (paste a professional/tech background image here — dark preferred) | **Nageshwari Elango** |
|               | Senior Backend Engineer · Cloud Platform                         |
|               | 10 years at AWS building distributed systems, microservices, and AI-powered developer tools at scale. |
|               | [**View My Work**](https://github.com/enageshwari) [*Contact Me*](mailto:tech.nageshwari@gmail.com) |

**Notes:**
- First cell: insert an image (drag in or use Insert > Image). Use a dark tech/cloud photo from Unsplash — e.g. https://unsplash.com/photos/a-computer-screen-with-a-lot-of-code-on-it
- `**bold link**` = primary button (white on dark in hero)
- `*italic link*` = secondary button (outlined)

---

### 3. Section divider — "Why I'm the right fit for R168509"

Just type this as a plain heading (not a table) between blocks:

## Why I'm the right fit

Then type this paragraph:

Adobe's Senior Backend Engineer role calls for deep Java and cloud API expertise, AI-first development experience, DevOps ownership, and — as a standout differentiator — familiarity with AEM. I bring all of it, backed by 10 years building the systems that power AWS's biggest data platforms.

---

### 4. Match block — job requirements vs. your experience

| Match                                      |                                                                                                                                                     |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| What Adobe needs                           | How I deliver it                                                                                                                                    |
| Java & Cloud APIs (AWS/Azure SDK)          | 10 years at AWS building Java microservices. Designed and implemented EMR Instance Fleets APIs managing EC2 cluster lifecycle at global scale.       |
| DevOps: deployment & monitoring            | Implemented CI/CD pipelines with end-to-end integration tests and auto-rollout for EMR. Built AMI pipelines deploying to all AWS regions in 15 mins. |
| Microservices, Docker, Kubernetes          | Built microservices APIs for EMR EC2, EKS, and Serverless clusters. Direct hands-on with EKS-based Spark workloads in SageMaker Unified Studio.      |
| AI-first development                       | Implemented Agentic Chat in SMUS using Amazon Kiro/Q. Used Model Context Protocol (MCP) to connect systems and accelerate all components of Spark Connect integration. |
| Scalable backend systems across cloud      | Spearheaded EMR Studio region expansion across new AWS regions, resolving architectural bottlenecks with configuration-driven, automated rollout.    |
| Python development                         | Used Python for AMI build automation, ML platform tooling, and data processing workflows in SageMaker.                                              |
| Familiarity with Adobe AEM (standout)      | Built this portfolio site using AEM Edge Delivery Services — custom blocks (feature-grid, hero, match), Google Sheets JSON ingestion, 100 Lighthouse. |
| Distributed team collaboration             | Collaborated across 25+ engineers in multiple time zones on EMR and SMUS teams. Led features from design through release.                           |

---

### 5. Section heading

## Key Projects

Then this paragraph:

Filter by area to explore the systems I've designed and shipped at AWS.

---

### 6. Feature Grid block — project cards

| Feature Grid       |                                                                                 |                                                                        |               |                                   |             |
|--------------------|---------------------------------------------------------------------------------|------------------------------------------------------------------------|---------------|-----------------------------------|-------------|
| Name               | Description                                                                     | Tags                                                                   | Price         | Link                              | CTA Text    |
| EMR Persistent App UI | Pioneered off-console SSO access to YARN, Tez, and Spark UIs from POC to global release. Full CI/CD with integration tests. | Cloud, Java, DevOps | Core platform | https://github.com/enageshwari   | View on GitHub |
| Spark Connect Integration | Unified Spark Connect across EMR, EKS, and Glue in SageMaker Data Notebooks. Used Kiro for spec-driven development and MCP for system integration. | Cloud, AI, Big Data | SMUS flagship | https://github.com/enageshwari  | View on GitHub |
| Agentic Chat (SMUS) | Implemented Agentic Chat for big data and ML job development using Amazon Kiro/Q in private subnets. Supports Python, Scala, SQL with visual output. | AI, Big Data | AI-powered | https://github.com/enageshwari   | View on GitHub |
| EMR Region Expansion | Automated EMR Studio service builds across new AWS regions. Config-driven rollout with automated test and metrics-based validation. | DevOps, Cloud | Global scale | https://github.com/enageshwari   | View on GitHub |
| AMI Build Automation | Fully automated Profiler image builds using S3 multipart/parallel ops and caching. Reduced build time to 15 mins. Deployed via CodePipeline to all regions. | DevOps, Java | Build platform | https://github.com/enageshwari  | View on GitHub |
| Kerberos on EMR | Implemented Kerberos infrastructure on EMR to satisfy critical enterprise compliance mandates within a compressed timeline. | Java, Security | Enterprise | https://github.com/enageshwari   | View on GitHub |

**Notes on the Tags column:**
- Tags drive the filter bar automatically. Use comma-separated values.
- Available tags in this setup: `Cloud`, `Java`, `DevOps`, `AI`, `Big Data`, `Security`
- If you have 2+ unique tags, the filter bar renders automatically above the grid.

---

### 7. Section heading + AEM EDS callout

## This Site Is the Demo

Then this paragraph:

This portfolio is itself built on AEM Edge Delivery Services — the same technology stack used across Adobe Experience Manager. Custom blocks authored in da.live, live JSON from a Google Sheet, and a 100/100 Lighthouse score. The code is at github.com/enageshwari/aem-product-showcase.

Then insert a Columns block:

| Columns           |                                    |
|-------------------|------------------------------------|
| **100**           | **Zero frameworks**                |
| Lighthouse score  | Vanilla JS + AEM block model       |
| **Google Sheets** | **Edge CDN**                       |
| Live data source  | Instant global deploy via aem.live |

---

### 8. Footer (plain text — no table needed)

Just type at the bottom of the doc:

---

Nageshwari Elango · tech.nageshwari@gmail.com · +1 408-772-8154 · github.com/enageshwari

---

## Publishing checklist

- [ ] All tables entered in da.live / Google Doc
- [ ] Doc connected to aem-product-showcase repo via Sidekick
- [ ] Click Preview — verify layout at https://main--adobe-cloud-platform--enageshwari.aem.page/
- [ ] Click Publish — live at https://main--adobe-cloud-platform--enageshwari.aem.live/
- [ ] Run Lighthouse on the live URL — target 100/100
- [ ] Send URL to Adobe hiring team (see hiring-email.md)
