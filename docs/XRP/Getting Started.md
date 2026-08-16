---
id: GettingStarted
title: Getting Started
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Welcome!

Before you ever touch a real FRC robot, you're going to learn the basics on an **XRP** (eXperiential Robotics Platform) — a small, cheap robot that runs on the exact same [WPILib](https://docs.wpilib.org/) software stack as our competition robot. Everything you learn here (subsystems, commands, autonomous routines) transfers directly over once you move onto the real thing.

This section (and the [Subsystems](/docs/XRP/Subsystems), [Commands](/docs/XRP/Commands), and [Autonomous](/docs/XRP/Autonomous) pages that follow) make up our preseason challenge curriculum. Work through them roughly in order — each page builds on the code you write in the last one.

:::info
The full official reference for the XRP hardware and software is here: [WPILib XRP Robot Docs](https://docs.wpilib.org/en/stable/docs/xrp-robot/index.html). Keep it bookmarked — we'll link back to specific pages throughout this curriculum, but it's worth skimming in full.
:::

## What You'll Need

- A laptop with [WPILib installed](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html) (this installs VS Code, the WPILib extension, and the toolchain)
- An XRP robot kit, assembled, with the battery charged
- A USB cable (for flashing/updating firmware) and access to WiFi (the XRP hosts its own access point)
- An Xbox-style controller (or any joystick WPILib recognizes)

## Step 1: Create Your XRP Project

Open VS Code, click the WPILib icon in the top-right corner, and run **Create a new project**. When prompted for a project type, choose the **XRP** template instead of a normal Romi/RIO template.

:::tip
Give the project a sensible name and save it somewhere you'll remember — you'll be building on this same project for every challenge in this curriculum.
:::

Take a minute to look through the generated project before changing anything. You should see:

- `Robot.java` — the entry point, wires together autonomous/teleop/disabled mode callbacks
- `RobotContainer.java` — where subsystems get created and controller buttons get bound to commands
- `subsystems/Drivetrain.java` — a subsystem wrapping the two drive motors
- `subsystems/OnBoardIO.java` — wraps the XRP's onboard button/LEDs
- `commands/` — a couple of example commands, including arcade drive

## Step 2: Connect to Your XRP

Power on your XRP. It broadcasts its own WiFi network (named something like `XRP-XXXX`). Connect your laptop to it.

In VS Code, open the WPILib menu and run **Simulate Robot Code** first if you just want to sanity-check that your code compiles — this runs entirely on your laptop, no XRP required, and pops up a simulation GUI with a virtual joystick.

When you're ready to run on the real robot, use **Deploy Robot Code** instead, which pushes your code over WiFi to the XRP itself.

:::note
Simulation is your best friend for this whole curriculum. You can write and test almost all of your subsystem and command logic in sim before ever touching the physical robot — it's faster to iterate and there's nothing to break.
:::

## Step 3: Driving in Teleop

Open `RobotContainer.java`. You should find something like this already wired up:

```java
public RobotContainer() {
  configureBindings();

  m_drivetrain.setDefaultCommand(
      new ArcadeDrive(m_drivetrain, () -> -m_controller.getLeftY(), () -> -m_controller.getRightX())
  );
}
```

This sets `ArcadeDrive` as the **default command** for the drivetrain subsystem — meaning it runs continuously whenever nothing else is using the drivetrain, reading the joystick every 20ms and driving accordingly.

## Challenges

<Tabs>
<TabItem value="setup" label="1. Get Connected" default>

**Goal:** Get a project building, deployed (or simulated), and confirm you can talk to the XRP.

- [ ] Install WPILib and create a new project from the XRP template
- [ ] Successfully run **Simulate Robot Code** and see the sim GUI open
- [ ] Connect to your XRP's WiFi network and **Deploy Robot Code** to it
- [ ] Confirm the deploy succeeded (check the console output in VS Code for "Build Successful" and no deploy errors)

</TabItem>
<TabItem value="drive" label="2. Drive Around">

**Goal:** Drive the XRP around the floor using a controller, in both simulation and on the real robot.

- [ ] Plug in your controller and confirm it shows up under the **Driver Station** (or the sim GUI's joystick tab)
- [ ] Deploy the default template code and drive the XRP forward, backward, and in a turn
- [ ] Read through `ArcadeDrive.java` and explain (out loud, to your mentor) what each of the two joystick axes controls
- [ ] **Stretch:** Try swapping arcade drive for tank drive (one stick per side) — you'll need to change what gets passed into the drivetrain's drive method

:::tip Hint
`Drivetrain.java` should expose a method like `arcadeDrive(double xaxisSpeed, double zaxisRotate)` that wraps a `DifferentialDrive`. Tank drive would call a different method — `tankDrive(double leftSpeed, double rightSpeed)` — with the two stick values passed straight through.
:::

</TabItem>
</Tabs>

Once you can reliably drive around, move on to [Subsystems](/docs/XRP/Subsystems).
