---
id: Intro
title: Intro
sidebar_position: 1
---

# What is Robot Simulation?
Robot Simulation is a **crucial** part in code development. It allows programmers to get a head start in programming the robot before actually having the robot. Robot Simulation is also a safe enviorment to test potentially *dangerous* code like automated commands. Used to validate robot commands and actions where it is safe to make mistakes before putting them on a real robot.

:::tip
Before even knowing what the robots functions are you can start working on drive commands like auto align.
:::

# Maple Sim
[Maple Sim](https://shenzhen-robotics-alliance.github.io/maple-sim/) provides an extra layer to simulation. One of the key improvements is odometry simulation; wheel slippage. This can also be used to simulate a vision subsystem to aid with resetting odometry position. It also provides collision to the field and opponent robots which can be used for driver practice before having a real robot. As well as some other cool features which you can check out on their [docs](https://shenzhen-robotics-alliance.github.io/maple-sim/). Championship conference by [4152](https://www.thebluealliance.com/team/4152) about maple sim on [Chief Delphi](https://www.chiefdelphi.com/t/maple-sim-conference-team-4152-slides-and-video-release/500585).
:::caution
Last Validated in 2025
:::

# Advantage Scope
"AdvantageScope is a robot diagnostics, log review/analysis, and data visualization application for FIRST Robotics Competition teams developed by [Team 6328](https://www.littletonrobotics.org/). It reads logs in WPILOG, DS log, Hoot (CTRE), and RLOG file formats, plus live robot data viewing using NT4 or RLOG streaming." - [Advantage Scope Docs](https://docs.advantagescope.org/).

![Advantage Scope](./../../static/img/AdvantageScopeShowcase.png)

Advantage scope provides a visualization of simulated or real data. It can be used to validate robot pose, mechanism positions, motor outputs, etc. 3D Field tab can be used to validate different commands that use mechanisms. 2D Field tab can be used to validate robot pose on the field and pathing for drive functions. Read more on the [Advantage Scope Docs](https://docs.advantagescope.org/) for useful functions on the software.

:::tip
Create and save multiple layouts for advtange scope so that you can easily save a load them at a competition. Have a "Simulation", "Log Replay", and "Live Robot" layouts are useful. 
:::