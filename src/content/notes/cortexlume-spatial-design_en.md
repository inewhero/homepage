---
title: "Line Up, Light Up: Rethinking fNIRS Array Design with CortexLume"
description: "CortexLume connects functional targets, 2D arrays, a 3D head model, anatomical coverage, and reproducible output in one offline workflow for fNIRS spatial design."
published: 2026-08-12
updated: 2026-08-25
tags: ["CortexLume", "fNIRS", "brain imaging", "research tools"]
---

[CortexLume](https://github.com/inewhero/CortexLume) is an open-source, offline Windows workstation for designing fNIRS source and detector arrays. It keeps the functional target, 2D array editor, and 3D head model in one project. A researcher can inspect the cortex of interest, draw the source-detector relationships, place the patch on the scalp, check spacing and anatomical coverage, and export the coordinates with a record of how they were produced. Decisions that once lived across atlas websites, spreadsheets, modelling software, and scripts now remain connected.

That continuity matters more than the number of features. A layout built in the 2D editor stays editable after it enters the 3D workspace. Individual channels and optodes can be changed; patches can be moved, rotated, or duplicated. Five-point landmarks and 10-10 positions provide familiar anchors, with scalp, grey matter, and white matter available for anatomical context. CortexLume updates scalp placement, cortical contact, source-detector spacing, and atlas results as the layout changes. A basic placement question no longer requires an export and a second reconstruction elsewhere.

The latest version also moves the beginning of the workflow closer to the scientific question. Quick Target contains 132 offline functional targets across eight common fNIRS planning domains. The maps come from a pinned Neurosynth release, use NiMARE association testing with FDR correction, and are mapped to the 25,000-vertex Cedalion cortical surface. Their values are meta-analytic association z statistics, not activation probabilities. Researchers with maps from Compose, NiMARE, SPM, FSL, or NeuroVault can instead import a `.nii` or `.nii.gz` volume. CortexLume checks the image space, affine, units, datatype, and finite values before adding it as the project's functional layer.

The target map does not draw the array. It gives the researcher a visible spatial premise while leaving the layout decision under human control. That division is useful. A literature synthesis can indicate cortex worth examining, but channel count, hair, task design, and practical placement still require judgement.

## Where CortexLume fits

The spatial language of fNIRS owes much to EEG. The 10-20, 10-10, and 10-05 systems provide standardised scalp positions, but an fNIRS channel is not one sensor location. It is formed by a source and detector pair. Their separation, deformation across the curved head, and relationship to the underlying tissue all affect whether the design is usable.

Existing tools address different parts of this problem. fOLD starts with a region of interest, searches standard positions likely to cover it, and estimates sensitivity with photon transport simulation. devfOLD adds age-specific head models. AtlasViewer can load a fixed probe, digitised points, head models, and sensitivity distributions. Array Designer searches source-detector combinations to optimise sensitivity over a target region.

CortexLume concentrates on the stretch between these established tasks. Researchers often begin with constraints from the instrument, channel budget, or a reusable patch and need to see how the array behaves on a curved scalp. At that stage, moving a patch, correcting one optode, checking realised spacing, and seeing the anatomical consequence can be more useful than rerunning a simulation for every adjustment. Once the design has narrowed to a few candidates, those layouts can still move into AtlasViewer, Array Designer, or a Monte Carlo pipeline for validation.

## Coordinates, templates, and functional targets

An MNI coordinate acquires an anatomical label only after an atlas is chosen. Structural, cytoarchitectonic, and connectivity atlases divide the brain by different criteria, so one point can receive different names. A probabilistic atlas may also return several candidates near a boundary.

Templates and atlases are different things. BigBrain, fsaverage, Colin27, and MNI152 provide reference anatomy or coordinate spaces. Harvard-Oxford, Jülich, and Desikan-Killiany define regions. BigBrain offers exceptionally detailed ex vivo anatomy, but it comes from one donor and lacks a population-average scalp and skull for routine optical design. fsaverage is useful for cortical topology and surface analysis, although its averaged folding pattern is not a participant's anatomy. Colin27 reduces scan noise by averaging repeated acquisitions from one person without increasing the anatomical sample.

CortexLume uses `MNI152NLin6Asym`, the sixth-generation nonlinear asymmetric MNI ICBM152 template distributed through TemplateFlow. It is not a precise substitute for a participant's head. It is a well-supported common frame that connects cleanly to probabilistic atlases. A reusable cohort layout is not designed for one cortex, and basing it on a single detailed anatomy can bind the array to that person's particular folds and head geometry.

Subject-specific anatomy is better when a study has individual T1 scans and asks an individual localisation question. In a validation study of 32 individual MRIs, simulated activations reconstructed with registered Colin27 anatomy had a mean localisation error of about 18 mm; using each participant's MRI reduced it to about 9.1 mm. Individual anatomy helps individual localisation. It does not imply that every group layout should be designed around one particular head.

Harvard-Oxford percentages also have a limited meaning. In the FSL atlas, each three-dimensional volume represents a region and its voxel values record the proportion of the atlas sample assigned to it. A value of 62% is therefore spatial membership within the atlas. It is not a 62% probability that a channel measures that region, nor a 62% probability that a task activates it. CortexLume reports the original top three values without renormalising them, so uncertainty at a boundary remains visible.

Quick Target adds functional information to this anatomical frame. Its bundled maps use pinned Neurosynth 0.7 data, NiMARE 0.20.0, a declared TF-IDF threshold, and MKDAChi2 parameters. Only positive vertices within independently FDR-corrected support are retained. Each map carries its source, parameters, and hashes. It can answer an early design question about which cortical locations deserve attention, but it cannot predict the size of the haemodynamic response in a new experiment. The atlas describes regional membership; the meta-analysis offers an across-study functional association.

## Why photon transport is not recalculated while a patch moves

Near-infrared light does not travel through the head in a straight line. A detailed sensitivity map depends on optode positions, tissue boundaries, scalp-to-cortex distance, optical parameters, and local anatomy. Real recordings are also shaped by hair, skin pigmentation, skull thickness, superficial vessels, and optode coupling. A generic head model cannot know these conditions in advance.

Monte Carlo simulation is valuable, but its precision is conditional on the inputs. A generic head and assumed optical properties can produce detailed numbers for a standard head that no participant actually has. A few millimetres of placement error or a change in coupling may alter the result. Recalculating a photon map for every mouse movement can therefore show more detail than the acquisition can reproduce.

The recurring design questions are simpler: do optodes overlap on the curved scalp, is the realised separation acceptable, which cortex lies under a channel, and does moving a patch shift coverage away from the target? These are geometric screening questions. CortexLume answers them quickly and sends the final candidates, rather than every intermediate sketch, to a more detailed optical model.

This does not treat the light path as a straight ray. CortexLume constructs a geometric path into the cortex for each channel and evaluates a bounded kernel on the 25,000-vertex surface for array coverage and candidate comparison. The coverage view combines every visible patch and partitions the result with Harvard-Oxford membership. It is a geometric coverage prior, not fluence, a Jacobian, a measurement probability, or an individual sensitivity map. That boundary is part of the interface, so the coloured surface remains a design aid rather than a photon simulation in disguise.

Monte Carlo modelling becomes worth the additional work once only a few layouts remain and the inputs are credible: known device geometry, digitised optode positions, individual MRI when available, or explicit tissue parameters. Geometry and optical simulation can also be tested against each other by comparing sensitivity centroids, regional labels, or rankings of candidate arrays. A meaningful change in ranking for a target or head shape is a reason to proceed to individual modelling.

## What the software computes as the array moves

Sources, detectors, and channels are defined on a 10 mm grid, with 30 mm guides for common separations. The matrix remains editable after placement, so hardware topology and spatial position do not split into unrelated versions. CortexLume constructs a local tangent plane at the patch anchor, maps the 2D positions to the scalp, and handles finite optode size with sphere-aware collision and surface projection. Local editing changes only the selected optode.

Coordinate meanings remain separate. A scalp coordinate is the physical centre of an optode sphere on the head. A display coordinate prevents rendered nodes from entering deep sulci. A cortical coordinate is the first grey-matter contact on the correspondence-backed surface. Atlas lookup and BrainNet export use cortical coordinates, so display corrections do not enter the scientific result.

For source position $s$ and detector position $d$, the geometric channel centre is

$$
m = \frac{s+d}{2}.
$$

The software then finds cortical contact $p$ and samples atlas values $P_k(p)$. Channel-level anatomy aggregates the sampled geometric path, while an individual optode retains a single-ray reference. This formulation supports spatial mapping during design; it is not a replacement model for diffuse photon transport.

Anatomical Coverage extends the calculation to the full array. For channel path $c$ and surface vertex $v$, CortexLume applies a truncated Gaussian according to the shortest distance from the vertex to the path. The defaults are $\sigma=12$ mm and a 24 mm radius. Multiple channels combine by their vertex-wise maximum, which avoids inflating coverage simply because dense channels overlap. Region summaries then incorporate the original Harvard-Oxford memberships. The result records parameters, thresholds, coordinate conventions, and asset hashes, making the mosaic reviewable rather than merely decorative.

## From manual adjustment to machine-assisted planning

CortexLume now has a local stdio MCP interface. An MCP-capable agent can read the functional target catalog and plan from a Harvard-Oxford region, a RAS+ MNI point, or an authorised local NIfTI file, then write a complete `.cortexlume` project. The process stays local. It adds no chat panel or provider-specific service to the desktop application, and file access is limited to roots that the user grants explicitly.

The planner returns three reproducible and spatially distinct candidates. Its metrics include target-mass coverage, off-target specificity, robustness to placement perturbations, atlas alignment, optode clearance, and spacing distortion. Every candidate must remain on cranial scalp supported by the locked cortical surface; placements on the ears, face, or neck are rejected before ranking. For a spatially distributed functional map, the planner also assesses whether one patch is sufficient and recommends a patch count.

An agent is well suited to the combinatorial search, not to replacing scientific judgement. It can provide three quantitative starting points quickly. The desktop workspace remains the place for visual review and fine adjustment. The researcher can inspect the metrics, target map, anatomical coverage, and actual array before accepting, modifying, or discarding a candidate.

The format-v2 `.cortexlume` archive keeps the sparse functional map, active surface overlay, and complete planning provenance in a hash-verified `project.json` and `manifest.json` pair. Planning from an existing project creates a derived file with the source project hash instead of overwriting the original. NIfTI projects store the mapped 25k vertex values, original filename, and SHA-256 rather than silently embedding the source volume.

## Making spatial design reviewable

A final array has methodological value when its spatial assumptions can be reconstructed. A CortexLume project retains topology, head placement, the functional map, and planning provenance. Separate optode and channel CSV files provide coordinates, distances, and atlas results. `cortexlume_export.json` records template and atlas hashes, projection settings, device metadata, thresholds, quality flags, and export warnings. Readable results stay concise, while the full audit record remains available.

BIDS-NIRS export creates subject and session geometry, coordinate-system metadata, device information, and rows for each source-detector-wavelength combination. Adding the corresponding SNIRF recording completes the dataset. BrainNet Viewer export produces a `.node` file and MATLAB script, passes cortical MNI coordinates directly to the ICBM152 surface, and saves several views suited to inspecting an fNIRS array.

The scientific assets behind these outputs have explicit integrity checks. The official 25,000-vertex MNI correspondence from Cedalion 26.5.1 has a 95th-percentile residual of 0.000689 mm against its canonical surface. The TemplateFlow target grid corresponds to the Cedalion volume at offset `[5, 6, 76]`, with a brain-mask Dice coefficient of 0.953731. Runtime cortical contact uses the unsimplified 25k mesh that retains the official correspondence. Harvard-Oxford volumes are mapped losslessly to a locked 1 mm RAS+ grid, and released assets are verified by SHA-256.

Those values show that coordinates, surfaces, and atlases do not drift apart inside the software. They do not promise submillimetre localisation in an individual participant. Numerical precision, software consistency, and biological accuracy remain different claims. CortexLume works at the scale where it is most useful: showing the spatial consequences of a layout early, preserving the basis for each choice, and reducing a large set of sketches to candidates worth modelling in greater detail.

An fNIRS layout should not survive only as a cap screenshot or a few lines in a methods section. When its functional target, geometry, atlas interpretation, device constraints, and design provenance travel together, another researcher can inspect, reuse, or compare it. CortexLume does not replace individual MRI or photon modelling. It makes the steps before those costly methods clearer, and gives studies without those resources a credible spatial record.

---

## Sources and further reading

- [CortexLume repository](https://github.com/inewhero/CortexLume)
- [CortexLume Quick Target data pipeline](https://github.com/inewhero/CortexLume/blob/main/docs/quick-target-data.md)
- [CortexLume scientific asset pipeline](https://github.com/inewhero/CortexLume/blob/main/docs/SCIENTIFIC_ASSET_PIPELINE.md)
- [fOLD: a toolbox for fNIRS optode placement](https://pmc.ncbi.nlm.nih.gov/articles/PMC5820343/)
- [devfOLD: age-specific fNIRS channel placement](https://pmc.ncbi.nlm.nih.gov/articles/PMC8647945/)
- [AtlasViewer tutorial](https://pmc.ncbi.nlm.nih.gov/articles/PMC4478785/)
- [Array Designer for fNIRS probe optimisation](https://pmc.ncbi.nlm.nih.gov/articles/PMC6135986/)
- [FSL atlas datasets and probability volumes](https://fsl.fmrib.ox.ac.uk/fsl/docs/other/datasets.html)
- [BigBrain: an ultrahigh-resolution 3D human brain model](https://doi.org/10.1126/science.1235381)
- [Colin27 high-resolution stereotaxic model](https://www.bic.mni.mcgill.ca/ServicesAtlases/Colin27Highres)
- [Impact of anatomical variability on fNIRS sensitivity](https://pmc.ncbi.nlm.nih.gov/articles/PMC9962997/)
- [Hair and skin characteristics in fNIRS signal quality](https://pmc.ncbi.nlm.nih.gov/articles/PMC13264803/)
- [Subject-specific light propagation and scalp-cortex correspondence](https://pmc.ncbi.nlm.nih.gov/articles/PMC8046049/)
- [Optode positional calibration in diffuse optical tomography](https://opg.optica.org/abstract.cfm?uri=ao-42-16-3154)
- [Atlas-guided versus subject-specific DOT](https://pmc.ncbi.nlm.nih.gov/articles/PMC3408558/)
- [Best practices for fNIRS publications](https://pmc.ncbi.nlm.nih.gov/articles/PMC7793571/)
- [SNIRF data format](https://fnirs.github.io/snirf/)
