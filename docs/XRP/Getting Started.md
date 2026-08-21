---
id: GettingStarted
title: Getting Started
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## What You'll Need

- A laptop with [WPILib installed](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html) (this installs VS Code, the WPILib extension, and the toolchain)
- An XRP robot kit, along with batteries
- A USB C cable for flashing firmware
- *Optionally, a Xbox controller for driving around*

## Step 1: Create Your XRP Project

Open VS Code, click the WPILib icon in the top-right corner, and run **Create a new project**. When prompted for a project type, choose the **XRP** template instead of a normal Romi/RIO template.

:::tip
Create the project in the GitHub repository provided to you for pre-season, and then create your first commit before making any code changes. Version control is crucial and you should be making commits after major changes. To learn more about version control, see the **[Git](/docs/Git/Merge.md)** section in the documentation!
:::

Take a minute to look through the generated project before changing anything. You should see:

- `Robot.java` — the entry point, wires together autonomous/teleop/disabled mode callbacks
- `RobotContainer.java` — where subsystems get created and controller buttons get bound to commands
- `subsystems/Drivetrain.java` — a subsystem wrapping the two drive motors
- `subsystems/OnBoardIO.java` — wraps the XRP's onboard button/LEDs
- `commands/` — a couple of example commands, including arcade drive

## Step 2: Connect to Your XRP

Power on your XRP. It broadcasts its own WiFi network (named something like `XRP-XXXX`). Connect your laptop to it.

In VS Code, open the WPILib menu and run **Simulate Robot Code** first if you just want to sanity-check that your code compiles. This runs entirely on your laptop, no XRP required, and pops up a simulation GUI with a virtual joystick.

Once you are ready to deploy to the real XRP, use **Deploy Robot Code** instead, which pushes your code over WiFi to the XRP itself.

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

This sets `ArcadeDrive` as the **default command** for the drivetrain subsystem, meaning it runs continuously whenever nothing else is using the drivetrain, reading the joystick every 20ms and driving accordingly.

## Challenges

<Tabs>
<TabItem value="setup" label="1. Get Connected" default>

**Goal:** Get a project building, deployed, and confirm you can talk to the XRP.

- [ ] Install WPILib and create a new project from the XRP template
- [ ] Successfully run **Simulate Robot Code** and see the sim GUI open
- [ ] Connect to your XRP's WiFi network and **Deploy Robot Code** to it
- [ ] Confirm the deploy succeeded (check the console output in VS Code for "Build Successful" and no deploy errors)

</TabItem>
<TabItem value="drive" label="2. Drive Around">

**Goal:** Drive the XRP around the floor using a controller, in both simulation and on the real robot.

- [ ] Plug in your controller and confirm it shows up under the **Driver Station** (or the sim GUI's joystick tab)
- [ ] Deploy the default template code and drive the XRP around
- [ ] **Stretch:** Try swapping out **ArcadeDrive** for a tank drive such that each wheel is controlled by one of the joysticks *(forwards/backwards)*

:::tip Hint
`Drivetrain.java` should expose a method like `arcadeDrive(double xaxisSpeed, double zaxisRotate)` that wraps a `DifferentialDrive`. Tank drive would call a different method `tankDrive(double leftSpeed, double rightSpeed)` with the two stick values passed straight through.
:::

</TabItem>
</Tabs>

Once you can reliably drive around, move on to [Subsystems](/docs/XRP/Subsystems).
