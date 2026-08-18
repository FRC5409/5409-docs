---
id: Subsystems
title: Subsystems
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is a Subsystem?

In command-based programming, every physical piece of hardware on the robot such the drivetrain, a sensor, or an arm, gets wrapped in a **subsystem**. A subsystem's job is to be the *only* piece of code that talks directly to that hardware.

```java
public class ExampleSubsystem extends SubsystemBase {
  // hardware objects live here

  @Override
  public void periodic() {
    // runs automatically every ~20ms, useful for updating dashboard values
  }
}
```

Subsystems can be used to both **read** and **write** information to different components as seen in the example below:

- **Reading**: wrapping a sensor and exposing data through **getter methods** (e.g. `getDistance()`)
- **Writing**: wrapping a motor, adding the ability to set its speed through **setter methods** (e.g. `setSpeed(int speed)`)

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
- [ ] Add a public method that returns the distance in inches
- [ ] Add instantiate the subsystem in `RobotContainer.java` 

```java title="Starter skeleton"
package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPRangefinder;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class RangefinderSubsystem extends SubsystemBase {
  private final XRPRangefinder m_rangefinder = new XRPRangefinder();

  // TODO: add a method that returns the current distance in inches
}
```

:::tip Hint
Check the autocomplete on `m_rangefinder.` in VS Code — `XRPRangefinder` exposes a method for distance in inches directly, so you don't need to do any unit conversion yourself.
:::

</TabItem>
<TabItem value="reflectance" label="2. Line Sensor">

**Goal:** Write a `LineSensorSubsystem` wrapping the XRP's two-channel reflectance sensor — this is what you'll use to follow a line later in the [Commands](/docs/XRP/Commands) and [Autonomous](/docs/XRP/Autonomous) pages.

- [ ] Create `subsystems/LineSensorSubsystem.java` extending `SubsystemBase`
- [ ] Add public methods for the left and right reflectance readings
- [ ] Place the XRP on the field and test how well the line following works
```java title="Starter skeleton"
package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPReflectanceSensor;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class LineSensorSubsystem extends SubsystemBase {
  private final XRPReflectanceSensor m_lineSensor = new XRPReflectanceSensor();

  // TODO: add getLeftReflectance() and getRightReflectance() methods
}
```

:::note
Don't just trust a Google search on which direction the values go — actually print the numbers and watch them change as you move the sensor over tape. This kind of quick empirical check will save you far more debugging time than guessing, on the XRP and on the real robot.
:::

</TabItem>
<TabItem value="claw" label="3. Claw">

**Goal:** Write a `ClawSubsystem` that controls your XRP's servo-driven claw attachment — an **actuator** ("writing") subsystem instead of a sensor one.

- [ ] Create `subsystems/ClawSubsystem.java` extending `SubsystemBase`
- [ ] Add `open()` and `close()` methods that drive the servo to two different angles
- [ ] Figure out (by testing angles one at a time) what open and closed actually look like on your specific claw, and use those values

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
Unlike the sensor subsystems above, this is a "writing" subsystem — its methods *do* something rather than *return* something. Resist the urge to add a `getState()` boolean unless a command actually needs it; keep it simple.
:::

</TabItem>
</Tabs>

Once all three subsystems compile and behave the way you expect (test each one individually before moving on!), head to [Commands](/docs/XRP/Commands) to make them actually do something useful.
