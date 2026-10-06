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
- A USB cable that fits your XRP's controller board, for flashing firmware
- *Optionally, a Xbox controller for driving around*

## Step 1: Read the Docs & Flash the Firmware

Before writing any code, get familiar with the hardware you're working with. Read through the official **[WPILib XRP documentation](https://docs.wpilib.org/en/stable/docs/xrp-robot/index.html)**. Then, **flash the latest WPILib firmware onto your XRP** by following the imaging instructions in **[XRP Hardware, Assembly, and Imaging](https://docs.wpilib.org/en/stable/docs/xrp-robot/hardware-and-imaging.html)**. Out of the box, the XRP doesn't run firmware that WPILib can talk to, so this step is required.

## Step 2: Create Your XRP Project

Open VS Code, click the WPILib icon in the top-right corner, and run **Create a new project**. When prompted for a project type, choose the **XRP - Command Robot** template.

:::tip
Create the project in the GitHub repository provided to you for pre-season, and then create your first commit before making any code changes. Version control is crucial and you should be making commits after major changes. To learn more about version control, see the **[Git](/docs/Git/Merge.md)** section in the documentation!
:::

Take a minute to look through the generated project before changing anything. You should see:

- `Main.java`: starts the robot program (you won't need to touch this)
- `robot/Robot.java`:  wires together the disabled/autonomous/teleop/utility mode callbacks and runs the `CommandScheduler`
- `robot/RobotContainer.java`:  where subsystems get created and controller buttons get bound to commands
- `robot/Constants.java`: a place for robot-wide constants
- `robot/subsystems/XRPDrivetrain.java`:  a subsystem wrapping the two drive motors and wheel encoders
- `robot/commands/ExampleCommand.java`: an empty example command


## Step 3: Connect to Your XRP

Power on your XRP. It broadcasts its own WiFi network (named something like `XRP-XXXX`). Connect your laptop to it.

Unlike a competition robot, **you never deploy code to the XRP**. Your robot program always runs on your laptop: in VS Code, open the WPILib menu and run **Simulate Robot Code** (or press `F5`). The program uses WPILib's simulation framework to send motor/servo commands to the XRP over WiFi and read its sensors back, and the simulation GUI that pops up is where you enable the robot and set up your joystick.

:::warning
Your laptop has to stay connected to the XRP's WiFi the whole time the code is running. The XRP's network has no internet, so your computer may quietly switch back to another WiFi network. If the robot stops responding, check this first.
:::

## Step 4: Driving in Teleop

Unlike older XRP templates, the 2027 template **does not** come with a controller or teleop driving wired up. You'll add it yourself in `RobotContainer.java`:

```java
import org.wpilib.command2.Commands;
import org.wpilib.command2.button.CommandXboxController;

public class RobotContainer {
  private final XRPDrivetrain xrpDrivetrain = new XRPDrivetrain();
  private final CommandXboxController controller = new CommandXboxController(0);

  public RobotContainer() {
    configureButtonBindings();

    xrpDrivetrain.setDefaultCommand(
        Commands.run(
            () -> xrpDrivetrain.arcadeDrive(-controller.getLeftY(), -controller.getRightX()),
            xrpDrivetrain));
  }
  // ...
}
```

This sets an arcade drive command as the **default command** for the drivetrain subsystem, meaning it runs continuously whenever nothing else is using the drivetrain, reading the joystick every 20ms and driving accordingly.

:::tip
If you want to see a fuller XRP project (with a dedicated `ArcadeDrive` command, an arm, and autonomous routines), create a new project from the **XRP Reference** example instead of the template and read through it.
:::

## Challenges

<Tabs>
<TabItem value="setup" label="1. Get Connected" default>

**Goal:** Get the firmware flashed, a project building, and confirm you can talk to the XRP.

- [ ] Flash the latest WPILib firmware onto your XRP using the WPILib docs
- [ ] Install WPILib and create a new project from the XRP template
- [ ] Connect to your XRP's WiFi network and run **Simulate Robot Code**, and see the sim GUI open
- [ ] Confirm your laptop is talking to the XRP: with the robot connected, the **XRPGyro** values in the sim GUI should change when you rotate the robot by hand

</TabItem>
<TabItem value="drive" label="2. Drive Around">

**Goal:** Drive the XRP around the floor using a controller.

- [ ] Plug in your controller (or use the keyboard) and drag it into **Joystick slot 0** in the sim GUI's Joysticks panel
- [ ] Add the teleop driving code from Step 4, run **Simulate Robot Code**, set the robot to **Teleoperated**, and drive the XRP around
- [ ] **Stretch:** Try swapping out **ArcadeDrive** for a tank drive such that each wheel is controlled by one of the joysticks *(forwards/backwards)*

</TabItem>
</Tabs>

Once you can reliably drive around, move on to [Subsystems](/docs/XRP/Subsystems).
