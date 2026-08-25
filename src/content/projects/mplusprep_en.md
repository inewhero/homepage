---
title: "MplusPrep"
summary: "A one-command scaffold for turning common research data files into ready-to-run Mplus mediation models."
repository: "https://github.com/inewhero/MplusPrep"
order: 50
selected: false
draft: false
---

Starting an Mplus analysis used to mean recalling unfamiliar syntax while also converting the dataset into the exact format the program expects. Much of that effort is repetitive, yet a small naming or formatting mistake can stop a model before the substantive analysis begins.

MplusPrep converts CSV, Excel, or SPSS files into a Mplus `.dat` file and a ready-to-edit `.inp` scaffold with one command. It supports simple mediation and moderated mediation, repairs invalid variable names with confirmation, and records every change in a variable map. The generated template leaves the scientific decisions visible while removing the setup work that does not need to be rewritten each time.
