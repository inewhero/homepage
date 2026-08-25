---
title: "POEM-Q"
summary: "A Dify workflow for turning questionnaire items, construct definitions, scoring evidence and optional pilot data into a reviewable Markdown report."
repository: "https://github.com/inewhero/POEM-Q"
order: 20
selected: true
draft: false
---

Moving from a questionnaire concept to analysable data involves many small decisions that can accumulate into large errors: assigning items to dimensions, recovering response ranges and reverse scoring, matching dataset columns, and deciding what the available evidence permits the report to say. POEM-Q turns this middle stage into an inspectable Dify workflow.

Separate parsers read theory, behavioural descriptions and semantic boundaries before a structuring node reconciles item assignments. Language models interpret text, deterministic Python code handles scoring and preliminary statistics, and `BAAI/bge-m3` is used only to flag semantic cases that deserve review. Documented rules remain distinct from model suggestions, while uncertain assignments, fallback column matches and missing information stay visible.

The workflow is intended for questionnaire prototyping, teaching and exploratory work, not as a substitute for formal psychometric validation. The [development note](../notes/poem-q-reviewable-questionnaires/) explains why the pipeline is divided this way and where its automation should stop.
