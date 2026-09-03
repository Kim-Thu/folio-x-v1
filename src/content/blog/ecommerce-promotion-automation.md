---
order: 1
readingMinutes: 14
slug: ecommerce-promotion-automation
category: Case Studies
categorySlug: case-studies
tags:
  - label: Automation
    slug: automation
  - label: E-commerce
    slug: e-commerce
  - label: Odoo
    slug: odoo
  - label: Workflow
    slug: workflow
title: "E-commerce Promotion Automation: From 8 Hours to 15 Minutes"
excerpt: "A production case study on centralizing multi-store promotion setup, reducing repeated campaign work from about eight hours to about 15 minutes."
publishedAt: "2026-09-03"
author: Nguyễn Kim Thu
image: /uploads/ecommerce-promotion-automation-cover.svg
imageAlt: Four storefront workflows converging into one centralized promotion module, with setup time changing from about eight hours to about fifteen minutes
---

E-commerce promotion automation is useful only when it removes a real operational bottleneck. In one production environment I worked on, campaign setup across multiple storefronts took **about eight hours** because the same promotion work had to be repeated. A centralized promotion module reduced that setup to **about 15 minutes** and gave Marketing a way to publish through an administration tool instead of relying on repeated manual entry.

This case study is about that change. It is not a reconstruction of proprietary source code, and I will not invent endpoint names, database tables, promotion fields, queue topology, retry policies, or campaign rules that are not supported by the material I still have. The useful part is the engineering shape of the problem: repeated ownership across several storefronts, a centralized administration workflow, validation and access control, and an integration landscape that already included Odoo ERP, REST APIs, React/Next.js storefronts, and Node.js/NestJS services.

## The real problem was repeated ownership

At Vong Xanh, the e-commerce environment included multiple storefronts such as **xedap.vn, giant.vn, xedaptot.com, and active.vn**. These sites were not isolated brochure websites. They were customer-facing parts of a larger operating system in which product availability, prices, promotions, and orders were connected to internal applications and Odoo ERP.

The promotion workflow became expensive when a campaign needed to be prepared across several storefronts. The business intent was one thing — publish a campaign — but the operational work had to be repeated. In practice, a campaign setup could take about eight hours.

That distinction matters. If I describe the problem as “a form was slow,” the natural response is to optimize a screen. If I describe it as “one business action had to be repeated across several destinations,” the problem becomes architectural.

Repeated entry creates several forms of cost even before a specific production incident happens:

- the same decision has to be expressed more than once;
- each additional storefront adds another place that must be updated and checked;
- campaign preparation becomes dependent on people remembering every destination;
- the process scales with the number of storefronts instead of with the number of campaigns;
- business users spend time moving information rather than deciding what the campaign should be.

The important observation was therefore not “we need a faster import.” It was **we should not require several storefront-specific operations to represent one promotion decision**.

### Why automating each storefront separately would have been the weaker solution

A common automation mistake is to preserve the old process exactly and only make each step faster. If four storefronts each require the same campaign entry, one option is to build four faster import routines. That may reduce typing, but the system still has four operational owners for one business action.

Centralization attacks the duplication itself. Instead of asking Marketing to think in terms of destination websites, the administration layer can represent the promotion once and let the application handle the work required to make that promotion available across the appropriate storefronts.

That is a broader lesson I still use: **before automating a repetitive process, look for duplicated ownership**. Sometimes the best automation is not a faster version of every existing step. It is removing several steps because they should never have been separate responsibilities.

## What changed

The implemented change was a **centralized promotion module** used across multiple storefronts. Marketing could publish campaigns through the administration tool, and campaign setup dropped from about eight hours to about 15 minutes.

Those two numbers are the strongest verified outcome in this case, so I keep them exactly at that level. I do not turn them into claims about revenue, perfect accuracy, zero incidents, or a completely autonomous campaign system because I do not have evidence for those claims.

The administration tooling around products, prices, customers, and promotions also included **validation and access control**. That part is important because automation changes the blast radius of an action. A manual workflow may be slow, but a badly controlled automated workflow can distribute a bad change much faster.

A useful internal-tool design therefore has to solve two problems at the same time:

1. remove unnecessary repetition for the business user;
2. keep enough control that the faster workflow remains understandable and safe to operate.

## Before and after

| | Before | After |
| --- | --- | --- |
| Business intent | Publish a campaign | Publish a campaign |
| Operational shape | Repeated setup across multiple storefronts | Centralized promotion workflow |
| Primary user path | Repeated entry and checking | Publish through the administration tool |
| Controls | Distributed across the older workflow | Validation and access control in the administration tooling |
| Approximate setup time | About 8 hours | About 15 minutes |

Eight hours is 480 minutes. Comparing 480 minutes with 15 minutes gives a difference of **465 minutes per setup**, or roughly **96.9% less setup time**. That percentage is simple arithmetic derived from the two verified time estimates; it is not a separately measured KPI.

The more meaningful result is that the time saving came from changing the workflow shape. People were not asked to type faster. The system stopped making them repeat the same business operation several times.

## The system around the promotion module

The promotion module was one part of a larger e-commerce architecture. In the same production environment:

- React and Next.js were used for customer-facing frontend work;
- Node.js and NestJS were used for application services;
- REST APIs connected storefronts and operational services;
- Odoo ERP was part of the source and synchronization flow for operational data;
- Node.js services synchronized stock, prices, promotions, and orders from Odoo;
- internal administration interfaces were used for products, prices, customers, and promotions.

This context matters because a promotion does not live only on a marketing screen. It interacts with product data, pricing, time-sensitive storefront behavior, and the operational systems behind those storefronts.

I do **not** have enough source material to document the exact production topology, so I will not pretend that the original module used a particular queue, cron schedule, event bus, database schema, or API endpoint. What I can say is that the solution existed inside an API-backed e-commerce system where Odoo and storefront applications already exchanged business data.

That is enough to explain the architectural boundary: the administration tool was the place where a business user expressed the campaign intent; application services and existing integrations were responsible for carrying that intent into the surrounding system.

## Mindmap of the workflow

The following diagram stays deliberately at the level supported by the production evidence.

![Mindmap showing repeated multi-store promotion setup, a centralized promotion module with validation and access control, Odoo and REST API integration context, and Marketing publishing in about fifteen minutes](/uploads/ecommerce-promotion-automation-mindmap.svg)

The same structure in Mermaid source is:

```
mindmap
  root((Promotion setup))
    Before
      Multiple storefronts
      Repeated campaign entry
      About 8 hours
    Centralized module
      Administration tool
      Validation
      Access control
    System context
      Odoo ERP
      REST APIs
      Stock, prices, promotions, orders
    After
      Marketing can publish
      Centralized workflow
      About 15 minutes
```

I keep the Mermaid source in the article because it describes the idea more clearly than invented implementation diagrams would. The rendered visual is a static SVG, so the page does not need to load a Mermaid runtime just to display one diagram.

## The engineering decisions behind the result

The exact code is proprietary and no longer available to me as a source for this article, but the production facts still support several useful engineering decisions.

### 1. Put the business operation in one place

The most important decision was centralization. A promotion is a business operation; it should not become four separate concepts because four websites consume it.

A centralized administration workflow gives the operation one visible owner. It also gives the engineering team one place to apply rules that belong to the operation itself, rather than duplicating those rules at every destination.

This does not mean every system must use one database or one service. It means the **business command** should have a clear boundary. Internally, that command may still result in several API calls, data transformations, or system updates.

### 2. Validate before distribution

The production administration tooling included validation. In any similar multi-destination workflow, this is the point where validation has the most leverage.

If one operation can affect several storefronts, invalid data should be rejected as early as possible. Otherwise the system can create a partial state: one destination accepts the change while another rejects it, leaving the user with a harder reconciliation problem than the original manual process.

I am deliberately describing the principle rather than claiming a specific validation rule from the original module. The exact campaign constraints are not in my available source.

### 3. Keep authorization close to the operation

The administration tooling also used access control. Once an internal tool can publish a change across multiple storefronts, access control is part of the workflow design, not merely a security checkbox.

Centralization reduces operational effort, but it also concentrates capability. The better the automation becomes, the more important it is to know which users are allowed to trigger business-state changes.

Again, I do not have the original role matrix, so I will not invent one. The supported point is simply that access control existed in the administration layer and belonged to the same operational concern as validation.

### 4. Debug across system boundaries, not only in the UI

Another part of my production work in the same environment was investigating incorrect stock or price displays by tracing information through **Odoo, API responses, stored data, and frontend behavior**, then fixing the fault at the responsible layer.

That debugging pattern is relevant to promotion automation too. When several systems participate in one customer-facing result, the browser is only the last visible layer. A reliable support process needs to answer questions such as:

- Did the operational source contain the expected value?
- Did the service return the expected value?
- Did the application store or transform it correctly?
- Did the frontend render the response correctly?

The lesson is not “add more logs everywhere.” It is **make ownership traceable enough that the team can identify the responsible layer**.

## Why the result mattered to Marketing

The strongest business impact was not that a developer wrote an automation module. It was that Marketing could perform the campaign workflow through the administration tool instead of depending on repeated technical work across several storefronts.

That changes the relationship between product teams and engineering teams.

A weak internal tool still requires developers for ordinary business changes. The interface exists, but the actual operating model remains “ask engineering to do it.” A useful administration tool moves repeatable, validated operations to the people who own the business decision while keeping technical constraints in the system.

For campaign work, that means engineering can spend less time repeating known steps, while Marketing can work with a workflow closer to the way the business thinks about promotions.

## What I would not claim from this case

Technical case studies become less credible when a good result is expanded into unsupported success metrics. So there are several things I intentionally do **not** claim:

- I do not claim the workflow had zero errors.
- I do not claim 100% data accuracy.
- I do not claim promotions were fully autonomous.
- I do not claim a specific revenue increase.
- I do not claim a specific API topology or database design.
- I do not claim the production system used Python, Celery, Redis, scheduled jobs, or any other technology that is not in the source evidence.

The verified result is already useful: **campaign setup across multiple storefronts went from about eight hours of repeated work to about 15 minutes through a centralized administration workflow**.

A portfolio article should make the boundary between evidence and interpretation obvious. That is more valuable than making the architecture sound more sophisticated than it was.

## Practical checklist for similar e-commerce automation

If I were approaching a similar problem today, I would start with this sequence.

### Map the real workflow

Write down what the business user is trying to achieve, then list every place where that intent has to be repeated. Do not start with React components, API endpoints, or database tables.

Ask:

- What is the single business action?
- Who owns that decision?
- Which steps are real rules and which are only system hand-offs?
- How many destinations repeat the same information?
- Which checks currently depend on human memory?

### Decide where ownership belongs

Choose one place where the user should express the operation. That is often an internal administration application, but the important thing is ownership, not the specific UI.

### Separate rules from distribution

Validation and authorization belong to the operation. Destination-specific delivery belongs to the integration layer. Mixing the two makes future storefronts harder to add because every destination inherits business rules that should have been centralized.

### Make failure diagnosable

A faster workflow is only useful if the team can still understand what happened when the final storefront output is wrong. Preserve enough traceability to follow the value from the operational source through APIs and application logic to the UI.

### Measure the operational outcome

The metric should describe the original problem. In this case, setup time was meaningful because the bottleneck was repeated campaign preparation. Another workflow might be better measured by manual touch points, support tickets, reconciliation time, or failed submissions.

## What I learned from the project

The biggest lesson was that automation is often an ownership problem before it is a coding problem.

If the same business intent is duplicated across several applications, adding scripts around the existing workflow may help temporarily, but the fundamental cost remains. The larger improvement comes from deciding where that operation belongs and making the rest of the system consume it from there.

The second lesson was that internal tooling deserves product thinking. Marketing users do not benefit from an administration interface merely because it exists. They benefit when the interface gives them control over the operations they actually own, while the application handles repetitive technical steps and protects the important constraints.

The third lesson was that integrations need clear debugging boundaries. Odoo, APIs, stored application data, and frontend code can all participate in one visible result. When a number looks wrong on a website, the solution is not to assume the frontend is wrong or the ERP is wrong. It is to trace the value until the responsible layer becomes clear.

## The real optimization was removing repeated work

Going from eight hours to 15 minutes sounds like a performance story, but the code was not optimizing CPU time or shaving milliseconds from a request. The expensive resource was **human repetition**.

The improvement came from changing the shape of the workflow:

**one campaign decision → one controlled administration flow → the surrounding system handles distribution.**

That is the principle I would carry into another promotion management system, inventory tool, ERP integration, or internal platform. Understand the repeated work first. Decide where the business operation should belong. Keep validation and authorization at that boundary. Then automate the technical movement underneath it.

The 15-minute result is what makes the case easy to remember. The clearer ownership model is what made the result possible.
