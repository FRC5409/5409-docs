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

Open VS Code, click the WPILib icon in the top-right corner, and run **Create a new project**. When prompted for a project type, choose the **XRP - Command Robot** template.

:::tip
Create the project in the GitHub repository provided to you for pre-season, and then create your first commit before making any code changes. Version control is crucial and you should be making commits after major changes. To learn more about version control, see the **[Git](/docs/Git/Merge.md)** section in the documentation!
:::

Take a minute to look through the generated project before changing anything. You should see:

- `Main.java` — starts the robot program (you won't need to touch this)
- `robot/Robot.java` — wires together the disabled/autonomous/teleop/utility mode callbacks and runs the `CommandScheduler`
- `robot/RobotContainer.java` — where subsystems get created and controller buttons get bound to commands
- `robot/Constants.java` — a place for robot-wide constants
- `robot/subsystems/XRPDrivetrain.java` — a subsystem wrapping the two drive motors and wheel encoders
- `robot/commands/ExampleCommand.java` — an empty example command

:::info SystemCore 2027 changes
The 2027 libraries were reorganized, so code from older seasons (or older tutorials online) won't compile as-is. The big ones:

- Your code now lives in the `first.robot` package instead of `frc.robot`
- Imports moved from `edu.wpi.first.wpilibj...` / `edu.wpi.first.wpilibj2.command...` to `org.wpilib...` (e.g. `org.wpilib.command2.Command`, `org.wpilib.xrp.XRPGyro`)
- Motors use `setThrottle(...)` instead of `set(...)`, and **Test** mode has been renamed **Utility** mode
- Commands are scheduled with `CommandScheduler.getInstance().schedule(command)` (there's no `command.schedule()` anymore)
:::

## Step 2: Connect to Your XRP

Power on your XRP. It broadcasts its own WiFi network (named something like `XRP-XXXX`). Connect your laptop to it.

In VS Code, open the WPILib menu and run **Simulate Robot Code** first if you just want to sanity-check that your code compiles. This runs entirely on your laptop, no XRP required, and pops up a simulation GUI with a virtual joystick.

Once you are ready to deploy to the real XRP, use **Deploy Robot Code** instead, which pushes your code over WiFi to the XRP itself.

## Step 3: Driving in Teleop

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
`XRPDrivetrain.java` exposes `arcadeDrive(double xaxisVelocity, double zaxisRotate)`, which wraps a `DifferentialDrive`. For tank drive, add a `tankDrive(double leftVelocity, double rightVelocity)` method to `XRPDrivetrain` that calls `diffDrive.tankDrive(...)`, and pass the two stick values straight through.
:::

</TabItem>
</Tabs>

Once you can reliably drive around, move on to [Subsystems](/docs/XRP/Subsystems).
