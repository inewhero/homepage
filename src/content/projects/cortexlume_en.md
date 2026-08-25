---
title: "CortexLume"
summary: "An offline fNIRS spatial-design workstation that begins with a functional target and preserves reviewable anatomical coverage, coordinates, and provenance."
repository: "https://github.com/inewhero/CortexLume"
order: 10
selected: true
draft: false
---

An fNIRS study raises spatial questions before the first recording: which cortex matters for the task, whether the available instrument can form suitable channels, and whether the intended spacing survives placement on a curved head. When the functional map, flat array sketch, 3D model, and analysis coordinates live in separate tools, the reasoning behind each adjustment is easily lost.

CortexLume brings this work into an offline Windows application. A study can begin with one of 132 FDR-corrected Neurosynth Quick Targets or a statistical NIfTI that passes strict validation. The dense editor defines sources, detectors, and channels before a reusable patch moves onto the anatomical head. Individual optodes, whole-array Harvard-Oxford coverage, realised spacing, and cortical MNI coordinates remain visible while the layout is still editable.

The local MCP interface can plan three distinct candidates from a functional target, atlas region, MNI point, or authorised NIfTI. It reports coverage, specificity, placement robustness, optode clearance, and spacing distortion, leaving visual review and fine adjustment to the researcher. Format-v2 projects retain the functional map and planning provenance, with export to CSV, BIDS-NIRS geometry, technical JSON, or BrainNet Viewer. The [design note](../notes/cortexlume-spatial-design/) discusses where geometric screening is useful, why the project uses a population template, and how the outputs remain auditable.
