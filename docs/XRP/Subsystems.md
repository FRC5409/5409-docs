---
id: Subsystems
title: Subsystems
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is a Subsystem?

In command-based programming, every physical piece of hardware on the robot *(drivetrain, sensor, claw)* gets wrapped in a **subsystem**. A subsystem's job is to be the *only* piece of code that talks directly to that hardware.

```java
public class ExampleSubsystem extends SubsystemBase {
  // hardware objects live here

  @Override
  public void periodic() {
    // runs automatically every ~20ms, useful for updating dashboard values
  }
}
```

Subsystems typically integrate the ability to **read/write** data to hardware. For example: 

- **Reading**: Subsystem wraps a distance sensor with **getter methods** (e.g. `getDistanceInches()`) so commands can ask "how far am I?"
- **Writing**: Subsystems wraps a motor and expose **setter methods** (e.g. `setVoltage(int voltage)`, `setRotationsPerMinute(int rpm)`) so commands can tell it "Go this speed"

:::info
Commands should never talk to motors or sensors directly. They call methods on subsystems, and subsystems talk to the hardware. This separation is what lets you test a command's logic without caring exactly how the drivetrain is wired.
:::

## Worked Example: Reading the Gyro

Here's a complete, simple "reading" subsystem, wrapping the XRP's onboard gyro so the rest of the robot can ask for the current heading:

```java
package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPGyro;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class GyroSubsystem extends SubsystemBase {
  private final XRPGyro m_gyro = new XRPGyro();

  /** @return the robot's current heading, in degrees */
  public double getAngleDegrees() {
    return m_gyro.getAngleZ();
  }

  public void reset() {
    m_gyro.reset();
  }
}
```

Notice the pattern: one hardware object as a field, a constructor if you need to configure it, and a handful of small public methods. That's it. Now you'll build two more subsystems that follow the same shape.

## Challenges

<Tabs>
<TabItem value="rangefinder" label="1. Distance Sensor" default>

**Goal:** Write a `RangefinderSubsystem` that wraps the XRP's onboard ultrasonic rangefinder and reports distance to whatever is in front of the robot.

- [ ] Create `subsystems/RangefinderSubsystem.java` extending `SubsystemBase`
- [ ] Add an `XRPRangefinder` field
- [ ] Add a public method that returns the distance in inches
- [ ] Add the subsystem as a field in `RobotContainer.java` and print its value to the console (or SmartDashboard) to confirm it updates as you move your hand in front of the sensor

```java title="Starter skeleton"
package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPRangefinder;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class RangefinderSubsystem extends SubsystemBase {
  private final XRPRangefinder m_rangefinder = new XRPRangefinder();

  // TODO: add a method that returns the current distance in inches
}
```

</TabItem>
<TabItem value="reflectance" label="2. Line Sensor">

**Goal:** Write a `LineSensorSubsystem` wrapping the XRP's two-channel reflectance sensor. This is what you'll use to follow a line later in the [Commands](/docs/XRP/Commands) and [Autonomous](/docs/XRP/Autonomous) pages.

- [ ] Create `subsystems/LineSensorSubsystem.java` extending `SubsystemBase`
- [ ] Add an `XRPReflectanceSensor` field
- [ ] Add public methods for the left and right reflectance readings
- [ ] Place the XRP on the field or over a piece of black tape and figure out through experimentation whether a higher value indicates black or white

```java title="Starter skeleton"
package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPReflectanceSensor;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class LineSensorSubsystem extends SubsystemBase {
  private final XRPReflectanceSensor m_lineSensor = new XRPReflectanceSensor();

  // TODO: add getLeftReflectance() and getRightReflectance() methods
}
```

</TabItem>
<TabItem value="claw" label="3. Claw">

**Goal:** Write a `ClawSubsystem` that controls your XRP's servo-driven claw attachment.

- [ ] Create `subsystems/ClawSubsystem.java` extending `SubsystemBase`
- [ ] Add an `XRPServo` field
- [ ] Add `open()` and `close()` methods that drive the servo to two different angles
- [ ] Figure out through experimentation what positions to use for *open* and *close*

```java title="Starter skeleton"
package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPServo;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class ClawSubsystem extends SubsystemBase {
  private final XRPServo m_servo = new XRPServo(0);

  private static final double kOpenAngleDegrees = 0.0;   // TODO: tune for your claw
  private static final double kClosedAngleDegrees = 90.0; // TODO: tune for your claw

  // TODO: add open() and close() methods that call m_servo.setAngle(...)
}
```

:::tip Hint
Permanant values such as setpoints which do not change at runtime should be written in `Constants.java`
:::

</TabItem>
</Tabs>
