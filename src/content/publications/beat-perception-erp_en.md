---
title: "The Effect of Stimulus Interval Shift on Beat Perception: An ERP Study"
description: "An ERP study of how the brain responds when a sound arrives slightly earlier or later than expected."
date: 2023-05-31
type: "Undergraduate Thesis"
authors: ["Ruiyi Huang"]
repository: "https://github.com/inewhero/BP-ERP"
materials: "https://doi.org/10.17605/OSF.IO/V3T8R"
draft: false
---

> A sound that arrives only 37.5 milliseconds away from an established beat can be enough to produce a measurable brain response, even when the listener is paying attention to something else.

## Timing before attention

Regular rhythms allow the brain to predict when the next sound should occur. A sound that arrives too early or too late violates that prediction, but the detection process does not always enter conscious awareness.

This study examined whether small shifts in sound onset would produce a mismatch response during passive listening. It also tested whether that response changed with metric position: the strong and weak beats that give a rhythm its internal structure.

## Creating a temporal surprise

Twenty university students listened to a regular 4/4 sequence at 100 beats per minute while watching a silent nature video. Most tones followed a 600 ms interval. Occasional tones appeared 37.5 or 75 ms early or late, at either a strong or weak beat position. An on-time condition completed the five-level onset manipulation.

| Component | Design |
| --- | --- |
| Participants | 20 students, ages 21 to 27 |
| Conditions | Two metric positions × five onset timings |
| Sequence | 4/4 meter, 100 BPM, 600 ms base interval |
| Sounds | 37.5 ms sine tones |
| Task | Passive listening during a silent video |
| Session | Approximately 50 minutes |

EEG was recorded with a 64-channel Brain Products system. The recordings were processed in EEGLAB and ERPLAB with average re-referencing, 0.1 to 20 Hz filtering, bad-channel interpolation, and independent component analysis. The primary analysis focused on the frontocentral response between 100 and 200 ms after each sound.

## The brain registered the shift

Temporally shifted tones produced a stronger frontocentral negative response than standard tones. Its timing and scalp distribution were consistent with mismatch negativity (MMN), a response associated with automatic detection of an unexpected auditory event.

Across the early and late shifts, Bayesian comparisons did not support a reliable difference between strong and weak beat positions, nor a clear interaction between metric position and onset timing.

| Comparison | Bayesian evidence | Reading |
| --- | --- | --- |
| Standard tones at strong vs. weak positions | $BF_{01}=6.649$ | Responses were more likely to be similar |
| Mismatch response by metric position | $BF_{10}=0.242$ | Evidence favored no reliable position effect |
| Position × onset-timing interaction | $BF_{10}=0.861$ | Neither model was clearly favored |

Together, the results show that the auditory system tracked the regular sequence closely enough to register small deviations in time, without an explicit rhythm judgment.

## Reading the result

The clearest finding is automatic sensitivity to temporal change. The shifted tones were also rare events in a modified oddball sequence, so the response can include both timing prediction and general auditory surprise. A follow-up experiment could separate these processes by varying metric position independently from the probability of each onset.

That distinction matters for beat research. Detecting that a sound is unusual is not quite the same as representing the meter of a rhythm. Combining EEG with a behavioral measure of perceived beat would connect the neural response more directly to experience.

## A researcher's note

This was the first EEG study I saw through from stimulus programming and data collection to preprocessing and Bayesian analysis. It left me with a lasting interest in a simple design question: does an experiment merely reveal a signal, or can it also distinguish the processes that produced it? That question continues to guide how I think about cognitive and clinical research.

## Materials

The thesis materials are linked through [OSF](https://doi.org/10.17605/OSF.IO/V3T8R). The [BP-ERP GitHub repository](https://github.com/inewhero/BP-ERP) contains the MATLAB/Psychtoolbox experiment code and EEGLAB/ERPLAB analysis scripts. The repository is a desensitized archive of the workflow used for the study.
