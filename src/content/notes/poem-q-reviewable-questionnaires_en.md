---
title: "POEM-Q: An LLM-agent workflow for questionnaire prototype evaluation"
description: "How POEM-Q uses specialised LLM agents, deterministic scoring code, and semantic checks to evaluate early questionnaire prototypes before formal psychometric validation."
published: 2026-08-19
updated: 2026-08-25
tags: ["POEM-Q", "psychometrics", "questionnaire development", "LLM agents", "research tools"]
---

After the items have been written, a questionnaire usually passes through a messy preparation period before formal psychometric validation can begin. The construct has a theoretical definition and the first item pool is in place, but the measurement structure is still changing. Some items span several dimensions, reverse-scoring rules may be incomplete, and pilot-data columns may not match the questionnaire item by item. Samples at this stage are often small, so the results are better suited to finding problems than settling them.

[POEM-Q](https://github.com/inewhero/POEM-Q) organises this preparation work. The Dify-based LLM-agent workflow checks questionnaire prototypes before EFA, CFA, invariance analysis, and other formal validation procedures. It reads questionnaire items, construct definitions, scoring information, and optional response data, then produces a Markdown report. Source evidence, model interpretation, code-based calculations, and unresolved decisions appear separately.

POEM-Q addresses an earlier question than scale validity: is the prototype clear enough to justify a larger study? Ambiguous items and incomplete rules stay visible in the report so that researchers can revise or confirm them.

## Why use an agent workflow

Several kinds of work are easily mixed together when a questionnaire prototype is reviewed. Reading a construct definition calls for a different approach from extracting observable behaviour. Finding a possible reverse-scored item does not resolve its dimensional assignment. Matching item text to a pilot dataset requires a stricter set of rules again.

A single large prompt can cover the whole process, but models tend to compress their reasoning into one fluent answer that is hard to check. POEM-Q assigns the work to focused nodes. Each node keeps its intermediate results separate until a later structuring step.

The item parser preserves the original order, labels, wording, and response anchors while assigning stable item IDs. Several definition agents then read the construct material. Together they extract theoretical definitions and explicit scoring rules, find behavioural descriptions, and record discriminative terms, semantic opposites, and boundaries between nearby constructs.

The agents answer different questions, so disagreement does not have to be removed by a vote. An item may fit dimension A in theory while its behavioural wording resembles dimension B. A grammatical negation may look like reverse scoring without functioning as a reverse item. The structuring stage preserves these tensions through low-confidence assignments or leaves an item unresolved. Researchers can then see exactly where the uncertainty arose.

## From interpretation to prototype evaluation

POEM-Q does not assign a single score to "prototype quality." Such a score would hide whether a problem came from wording, scoring, or data mapping, even though each calls for a different response.

The semantic check compares item wording with the intended construct and looks for confusion between neighbouring dimensions. The scoring check tries to recover response ranges and reverse-scoring rules from the source material. The data check asks whether each item can be mapped reliably to a pilot-data column. If response data are available, the report also includes preliminary internal-consistency statistics.

The report can then show which parts of the prototype are well specified, where evidence is missing, and which decisions require review before formal validation, rather than declaring that a scale is simply good or bad.

Scoring direction follows an explicit evidence order. A reverse-scoring rule stated in the source document takes precedence. When the document is silent, an LLM agent may suggest a direction and provide its confidence and reasoning. The final report always distinguishes documented rules from model inference.

## LLMs interpret; code calculates

When response data are supplied, the workflow moves into data processing. Pilot files are rarely tidy. They may contain participant identifiers, demographic variables, blank columns, inconsistent labels, and a mixture of numeric responses and written anchors.

POEM-Q maps questionnaire items to data columns in a fixed sequence. It checks exact item text first, followed by original labels and item IDs. A guarded ordinal fallback is available only after those methods fail. The report records every fallback, missing match, and conflict so that mapping problems do not disappear during processing.

After mapping, deterministic Python code applies reverse scoring, rescales items to a 0 to 100 range, calculates equal-weight dimension scores, and summarises missingness. When the data permit, it also calculates Cronbach's alpha, corrected item-total correlations, and alpha if an item is deleted.

The language model receives the results after calculation and does not recreate statistical values in prose. Semantic interpretation benefits from flexible language reasoning, whereas numerical operations should return the same result for the same code and input. Keeping them separate also makes the source of each calculation easier to inspect.

## Embeddings as a second semantic check

POEM-Q also uses `BAAI/bge-m3` to compare item embeddings with dimension descriptions. These distances are prompts for further inspection, not psychometric evidence.

An item assigned to dimension A may be semantically closer to dimension B. Another item may have weak similarity to every available definition. Either result can direct attention to ambiguous wording, construct overlap, or an incomplete definition, but similarity alone cannot validate or invalidate an item.

The canonical prototype score therefore remains transparent and equal weighted. Any embedding-weighted score is stored separately and labelled exploratory. Semantic similarity helps locate items for human review. It cannot replace content-validity assessment, factor analysis, or measurement-invariance testing.

## Two operating modes

The available inputs determine which route POEM-Q follows.

With questionnaire items and construct definitions only, it generates a definition-level prototype report covering item structure, dimension assignment, scoring direction, ambiguity, and missing information.

When response data are also supplied, the workflow activates data mapping, scoring, embedding checks, and preliminary internal-consistency statistics. A conditional node records the path that actually ran, and the report can only cite analyses completed upstream.

The route also defines the evidential boundary. A definition-only report contains no reliability evidence. A pilot-data report can describe internal consistency in the current sample, but cannot establish construct validity, diagnostic accuracy, norms, cut points, or invariance across populations.

## Reviewability is part of the architecture

POEM-Q preserves intermediate interpretations, confidence levels, fallback matches, and source-derived rules. Researchers can follow these records to see how the report was assembled instead of treating agent output as a black-box conclusion.

The repository's UCOC materials serve as a smoke-test fixture for the definition-only path, not as an accuracy benchmark. A successful run shows that parsing, branching, scoring, and export completed. It does not show that every item assignment is correct.

Further development will concentrate on the review interface. Researchers need to confirm low-confidence assignments item by item, compare questionnaire versions, and record overrides. Formal analyses should become available only when the sample size and data type support them. These tools would improve the review process more than another layer of autonomous conclusions.

POEM-Q organises the interpretive work involved in questionnaire prototyping. Agents arrange scattered early-stage materials, while deterministic code performs the calculations. Researchers can then return to the source rules and intermediate results when deciding whether an item needs rewriting, reassignment, or more evidence.

---

## Project and resources

- [POEM-Q repository](https://github.com/inewhero/POEM-Q)
- [Dify documentation](https://docs.dify.ai/)
- [BAAI/bge-m3 model card](https://huggingface.co/BAAI/bge-m3)
