---
id: Commands
title: Commands
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is a Command?

If subsystems are the *hardware*, commands are the *behavior*. A command typically describes an action, using one or more subsystems, over time. Every command has four lifecycle methods:

```java
public class ExampleCommand extends Command {
  public ExampleCommand(XRPDrivetrain subsystem) {
    addRequirements(subsystem); // prevents two commands from fighting over the same hardware
  }

  @Override
  public void initialize() { /* runs once, when the command starts */ }

  @Override
  public void execute() { /* runs every ~20ms while the command is scheduled */ }

  @Override
  public boolean isFinished() { return false; /* return true when the command should stop */ }

  @Override
  public void end(boolean interrupted) { /* runs once, when the command stops */ }
}
```

`addRequirements(...)` is important: it tells the scheduler which subsystems this command needs. If you bind a second command that also requires the drivetrain, the scheduler will cancel the first one to avoid two commands driving the motors at once.

:::info
For short, simple actions, WPILib gives you factory methods so you don't have to write a whole class, `Commands.runOnce(...)`, `Commands.run(...)`, `InstantCommand`, etc. You'll see both styles below. Use whichever is clearer for the situation.
:::

## Worked Example: A Command Using the Gyro Subsystem

Using the `GyroSubsystem` from the [Subsystems page](/docs/XRP/Subsystems), here's a full command that resets the heading to zero:

```java
package first.robot.commands;

import org.wpilib.command2.InstantCommand;
import first.robot.subsystems.GyroSubsystem;

public class ResetGyro extends InstantCommand {
  public ResetGyro(GyroSubsystem gyro) {
    super(gyro::reset, gyro);
  }
}
```

`InstantCommand` is a shortcut for a command whose `execute()` does nothing and whose `isFinished()` is immediately `true` — perfect for "do one thing and stop" actions like this.

In `RobotContainer.java`, you'd bind it to a button on the `CommandXboxController` you added in [Getting Started](/docs/XRP/GettingStarted) like:

```java
controller.a().onTrue(new ResetGyro(gyroSubsystem));
```

## Challenges

<Tabs>
<TabItem value="claw" label="1. Open / Close Claw" default>

**Goal:** Write two commands that use your `ClawSubsystem` from the Subsystems page, and bind them to controller buttons.

- [ ] Create an `OpenClaw` command and a `CloseClaw` command (either as `InstantCommand`s or their own classes)
- [ ] Bind `OpenClaw` to one button and `CloseClaw` to another in `RobotContainer.java`
- [ ] Run **Simulate Robot Code** and confirm you can open/close the claw on demand while driving around

```java title="Starter skeleton"
package first.robot.commands;

import org.wpilib.command2.InstantCommand;
import first.robot.subsystems.ClawSubsystem;

public class OpenClaw extends InstantCommand {
  public OpenClaw(ClawSubsystem claw) {
    // TODO: call super(...) with a method reference and the subsystem as a requirement
  }
}
```

:::tip Stretch Challenge
Combine both into a single `ToggleClaw` command that flips between open and closed depending on current state. You'll need to track the claw's state somewhere — think about whether that state belongs in the command or in the subsystem.
:::

</TabItem>
<TabItem value="linefollow" label="2. Line Follow Command">

**Goal:** Write a `LineFollowCommand` that uses your `LineSensorSubsystem` and `XRPDrivetrain` together to steer the XRP along a line on the floor. This is the foundation for most of the [Autonomous](/docs/XRP/Autonomous) challenges.

The core idea is **proportional steering**: compare the left and right reflectance readings, and turn toward whichever side sees more line.

```java title="Starter skeleton"
package first.robot.commands;

import org.wpilib.command2.Command;
import first.robot.subsystems.XRPDrivetrain;
import first.robot.subsystems.LineSensorSubsystem;

public class LineFollowCommand extends Command {
  private final XRPDrivetrain drivetrain;
  private final LineSensorSubsystem lineSensor;

  private static final double kBaseSpeed = 0.3; // TODO: tune
  private static final double kTurnGain = 1.0;  // TODO: tune

  public LineFollowCommand(XRPDrivetrain drivetrain, LineSensorSubsystem lineSensor) {
    this.drivetrain = drivetrain;
    this.lineSensor = lineSensor;
    addRequirements(drivetrain, lineSensor);
  }

  @Override
  public void execute() {
    double error = lineSensor.getLeftReflectance() - lineSensor.getRightReflectance();
    // TODO: drive forward at kBaseSpeed, steering proportional to `error * kTurnGain`
  }

  @Override
  public boolean isFinished() {
    return false; // TODO: decide what "finished" means for this command (see hint below)
  }
}
```

- [ ] Fill in `execute()` to drive the robot using `error` to steer
- [ ] Start with a small `kTurnGain` and increase it until the robot follows the line without overshooting wildly
- [ ] Decide what `isFinished()` should return. Should this command stop on its own, or only stop when its interrupted?

:::tip Hint
A command that's meant to run until something else stops it (like being bound to `whileTrue`, or replaced by another command later) can simply `return false` forever from `isFinished()`. You'll add a real end condition for this in the Autonomous challenges.
:::

</TabItem>
</Tabs>

With claw control and line following working under driver control, you're ready to chain them together into real autonomous routines on the [Autonomous](/docs/XRP/Autonomous) page.
