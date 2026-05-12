---
id: LessonsLearned
title: Lessons Learned
sidebar_position: 2
---

## Launcher

### Launcher-Feeder-Serializer Synchronization

A smooth increase in **surface speed** from the indexer/serializer all the way to the launcher helps maximize efficiency
and
accuracy.

As an example, if you run the launcher at 100% speed and the serializer at 40% speed, the feeders should run at 70% (
lower feeder) and 100% (upper feeder) surface speed respectively. The upper feeder should run at the same **surface**
speed of the launcher, as this way the different diameters of the different subsystems does not affect the exit velocity
of the projectile.

It is important you use SURFACE speed for your calculations, and not raw rotational speed.

### Working with Slow Servos (Hood)

Note: slow servos are not optimal, ideally an adjustable hood should be able to move fast.

Since this year we got very slow servos (35 mm/s!), the robot could not adjust the hood fast enough on-demand (i.e. move
the hood to 30° when it's time to launch). We got around this by constantly adjusting the hood's position on-the-fly,
while in the alliance zone. The hood would always move, as to be in the correct position such that launching could happen as soon as the button was pressed. Though care had to be taken to avoid excessive continuous servo movement, as prolonged operation can lead to internal wear or damage over time.

### Feedforward & PID Tuning

When tuning high-inertia mechanisms like flywheels, the control strategy must prioritize a robust **Feedforward** model to handle the majority of the power output, as this provides the base voltage required to hit a target velocity without relying on error-based feedback. **Proportional (kP)** gains can then be set relatively high to act as a corrective "kick," ensuring the wheel recovers its speed rapidly after the energy loss of a shot. It is critical to avoid **Integral (kI)** gain in these velocity loops; because the error fluctuates so sharply during firing, the kI term accumulates historical error that no longer reflects the current state of the system, causing the motor to "lag" and eventually overshoot as it attempts to compensate for past resistance.

## Drive & Vision

### Gyroscope

All accelerometer-based gyroscopes can drift occasionally. To combat this, we gave the driver a button to "reset" their
gyro's heading position back to zero if they needed to.

To prevent accidentally resetting the gyro, this command required a double-press of the driver's desired button.

### Camera Position

Something that made tuning the Limelight significantly easier was having a vertical tilt no greater than 5°. This allows
the robot to be resilient to glare. This was a huge issue a lot of other teams faced at the 2026 Ontario Championships,
which affected us less as we strategically placed our camera more forward-facing.

### Limelight Tuning

Tuning the Limelight is more straight-forward then it seems. The 3 things you will adjust are the exposure, sensor gain,
and black level offset.

Increasing **exposure** makes the picture brighter (by allowing more light into the camera sensor) but increases the
time between frames, decreasing the camera's overall FPS.
This value should be tuned for a picture that allows the Limelight to capture as many tags as possible, while not being
too high that it significantly increases the frame delay.

Increasing the **sensor gain** digitally increases picture brightness, but increases noise in the picture itself. This
can make it harder for the Limelight to recognize AprilTags or other objects. Use this value in cases where you cannot
change the exposure to make the picture bright enough (i.e. if there is not enough light in the room).

Increasing the **black level offset** increases the cutoff range for total blackness. You can think of this like
increasing the contrast, or playing with the levels of the picture.
