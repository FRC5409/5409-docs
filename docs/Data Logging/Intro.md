---
id: DataLogging
title: Intro
sidebar_position: 1
---

# What is Data Logging?
Data logging is a process which takes every (logged) variable/information about the robot and writes it to a log file on a USB stick connected to the roborio.
Example, an arm subsystem would include logged data of motor temp, motor voltage, motor current, and arm position.
This data can then be review by a program or manually to look through. Used to isolate **software** issues but can also be used to isolate **mechanical** issues.

![Data Logging Image](./../../static/img/dataLoggingImage.png)

## Advantage kit
[Advtange kit](https://docs.advantagekit.org) is a data logging software that we use; made by [6328](https://www.thebluealliance.com/team/6328). You can learn more about specifically what advantage kit is [here](https://docs.advantagekit.org). This is the streamlines data logging and provides good structure for [Robot Simulation]("TODO//SIMULATION"). Advantage kit works by splitting your subsytem into different layers; multiple files. You have the IO layer, this involves **all** data wanting to be logged and **all** data wanted for the *logic layer*. The logic layer works by taking the data from the IO layer and handeling all of the processing and logic. This would handel all of your commands as these are logic based. More in depth documentation can be found [here](https://docs.advantagekit.org).