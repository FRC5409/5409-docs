---
id: Autonomous
title: Autonomous
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Autonomous Mode?

In a real FRC match, the first 15 seconds run with **no driver input**. The robot has to do something useful entirely on its own, following whatever code runs when `autonomousInit()` fires. Everything in this page is about building that code up in stages, from fully scripted to fully sensor-driven.

By now you should have:

- A working `Drivetrain`, `RangefinderSubsystem`, `LineSensorSubsystem`, and `ClawSubsystem` (from [Subsystems](/docs/XRP/Subsystems))
- Working `OpenClaw`, `CloseClaw`, and `LineFollowCommand` commands (from [Commands](/docs/XRP/Commands))

This page is entirely about **combining** those pieces. 

## Challenges

<Tabs>
<TabItem value="chained" label="1. Hard-Coded Auto" default>

**Goal:** Get *something* autonomous working end-to-end, using only chained/timed commands. No sensor feedback yet. This is the fastest path to a working auto, and a good sanity check before adding sensors into the mix.

- [ ] Using `Commands.sequence(...)` (or a `SequentialCommandGroup`), chain together: drive forward for a fixed time, stop, close the claw, drive backward for a fixed time
- [ ] Time it with a stopwatch against your actual course and adjust durations until it reliably reaches the box
- [ ] Bind the whole sequence as your `autonomousCommand` in `RobotContainer.java`

```java title="Example shape"
public Command getAutonomousCommand() {
  return Commands.sequence(
      Commands.run(() -> m_drivetrain.arcadeDrive(0.3, 0), m_drivetrain).withTimeout(2.0),
      new CloseClaw(m_claw),
      Commands.run(() -> m_drivetrain.arcadeDrive(-0.3, 0), m_drivetrain).withTimeout(1.0)
  );
}
```

</TabItem>
<TabItem value="linefollow-grab" label="2. Follow Line & Grab">

**Goal:** Replace the blind "drive forward for N seconds" step with your real `LineFollowCommand`, and use the rangefinder to detect when you've reached the box instead of guessing a time.

- [ ] Give `LineFollowCommand` a real end condition using `.until(...)`: stop following the line once the rangefinder reads closer than some threshold distance
- [ ] Chain it with your claw commands: follow the line **until** close to the box, **then** close the claw
- [ ] Test from a few different starting positions on the line. This version should be far more consistent than the hard-coded version

```java title="Example shape"
public Command getAutonomousCommand() {
  return Commands.sequence(
      new LineFollowCommand(m_drivetrain, m_lineSensor)
          .until(() -> m_rangefinder.getDistanceInches() < 4.0),
      new CloseClaw(m_claw)
  );
}
```

:::tip Hint
`.until(BooleanSupplier)` is a decorator available on any `Command`. it wraps your command and ends it (without needing to touch `isFinished()`) the moment the supplied condition becomes true. This is generally cleaner than cramming the end condition into the command class itself.
:::

</TabItem>
<TabItem value="pathplanner" label="3. PathPlanner Auto">

**Goal:** Build the same "reach the box" routine again, this time driving a pre-planned path instead of reacting to the line sensor live.

[PathPlanner](https://pathplanner.dev) is a GUI tool for drawing autonomous paths, which then get followed on the robot using odometry (the robot's estimate of its own position, built from encoders + gyro).

- [ ] Add `PathplannerLib` as a vendor dependency to your project (WPILib menu → **Manage Vendor Libraries**)
- [ ] Set up odometry for the XRP's differential drivetrain (you'll need wheel encoder readings and the gyro heading you already wrapped in [Subsystems](/docs/XRP/Subsystems))
- [ ] Configure `AutoBuilder` for a differential-drive robot, following [PathPlanner's documentation](https://pathplanner.dev/pplib-getting-started.html)
- [ ] Draw a path in the PathPlanner GUI that matches your test course, and run it as your autonomous command

:::info
This challenge is a bigger jump than the others. PathPlanner setup for a differential (tank-style) drivetrain like the XRP needs accurate odometry to track well. Don't be afraid to ask a mentor for help wiring this one up. Getting odometry right the first time is genuinely tricky even for experienced programmers.
:::

</TabItem>
<TabItem value="gaps" label="4. Advanced: Gaps in the Line">

**Goal:** Make your line follower survive small gaps in the tape, where neither sensor sees the line for a moment.

This is open-ended on purpose. Think through it before you start coding:

- [ ] What should the robot do the instant *both* reflectance readings say "no line"?
- [ ] Design a solution and implement it. A few ideas worth considering, roughly in order of complexity:
  - Keep driving straight for a short, fixed time and hope the line reappears
  - Remember which direction you were last steering, and keep curving that way while the line is lost
  - Use the gyro to hold your last known heading while searching
- [ ] Test with a course that has a deliberate 1-2 inch gap in the tape, and see how far you can push the gap size before it fails

:::tip
There's no single "correct" answer here. This challenge is about problem-solving under an ambiguous spec, which is most of what real robot programming actually looks like.
:::

</TabItem>
</Tabs>
