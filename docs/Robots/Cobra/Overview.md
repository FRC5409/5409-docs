---
id: Overview
title: Overview
sidebar_position: 1
---

![Cobra](./../../../static/img/cobra.jpg)

## About the Season

In the [2025 FRC game *REEFSCAPE*](https://www.youtube.com/watch?v=YWbxcjlY9JY), was ocean-themed, where robots placed Coral onto a Reef structure and managed Algae to score points. Our robot focused strictly on scoring Coral quickly and accurately across all levels of the Reef.

## Software & Hardware Overview

### Hardware:
- 8 KrakenX60's & 4 cancoders for the swerve modules
- 1 Pigeon2.0 gyro
- 1 Limelight 4 + hailo-8 upgrade for april tag localization
- 2 Falcon500's for controlling the elevator
- 1 KrakenX60 for controling the pivot
- 1 Falcon500 for the rollers on end effector
- 1 ToF sensor for detecting game piece in end effector
- 1 CANCoder for absolute position of the pivot 

### Software:
- [Path Planner](pathplanner.dev) for path following routines
- [SysID](https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html) for auto tuning
- [MegaTag2](https://docs.limelightvision.io/docs/docs-limelight/pipeline-apriltag/apriltag-robot-localization-megatag2) for localization accuracy improvements
- Drive motors FOC Current Velocity PID control.
- Phoenix pro certified for CTRE products
- Data Logging through [Advantage Kit](https://docs.advantagekit.org)
- Accurate Robot Simulation through [Maple Sim](https://shenzhen-robotics-alliance.github.io/maple-sim/), visualized using [Advantage Scope](https://docs.advantagescope.org)
- Custom auto align using physics & PID control to ensure accurate and efficent scoring
- Fused CANCoder on swerve modules and pivot for increase in accuracy