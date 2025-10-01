---
id: Project
title: Project Development
sidebar_position: 2
---

## Drive
This year with the addition of AdvantageKit, we decided it was much easier to use [AdvantageKit's TalonFX Swerve Template](https://docs.advantagekit.org/getting-started/template-projects/talonfx-swerve-template/). Made by [Team 6328](https://www.thebluealliance.com/team/6328), it is a powerful resource for fast and effective swerve drive control. We then did some modifications to include Torque control on the motors to get an increase in peak power from FOC. From there we set up and tweaked the simulation for the template to include [MapleSim](https://shenzhen-robotics-alliance.github.io/maple-sim/). This is optional but we find that it can lead to increased accuracy in simulation and offers more areas to find bugs before going on the real robot.

## Vision
One of our takeaways from last year was having as **few cameras as possible** would make programming a lot easier. Having one camera doing your robot's **main function** was our approach. We also wanted the easiest and most effective solution, which is why we decided to use a [Limelight](https://docs.limelightvision.io/docs/docs-limelight/getting-started/summary). In our case, we knew we wanted to have one camera that could see the tag when aligned to both the left and right branch so we would be confident when scoring. To do this we used [AdvantageScope](https://docs.advantagescope.org/) to visualize a camera through a 3D field. We would run some basic autos and some "*teleop cycles*".
:::note
Used MT1 for rotation when close to an AprilTag; MT2 used when farther away to increase accuracy.
:::

## Autonomous
One of our big takeaways from last year was that our auto didn't score many points. Our design this year reflected that by maximizing auto points. We started designing our autos using [PathPlanner](https://pathplanner.dev) and our alignment commands would have to be custom. This is due to **PathPlanner ending paths early** with a timeout instead of an end condition - any wheel slippage or inaccuracy would cause the path to end before the robot has reached the target. Another improvement we used this year was implementing [SysID](https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html) which could tune some of our PID constants for the drive base. To increase accuracy we also made sure our *robot config* was as accurate as possible: robot weight **in full** (bumpers, battery), moment of inertia, etc. One trick we used to get around paths ending early was to drive at a constant slow speed into the coral station when picking up - simple and effective.
:::tip
Logging how long auto takes can aid with autonomous development
:::

## Auto Align
At the start of the year, we knew right away it was going to be essential to have auto align to score on every branch quickly. The easiest and recommended way would be **triple PID**: x position, y position, and rotation. It works by taking your current pose and a target pose, then applies a **field-oriented** PID output for x, y, and rotation. This solution is fast with minimal setup. We used this method for our first competition and it worked great, but there was room to improve - it wouldn't always take the most optimal path to the point and we had issues with the robot traveling and then auto aligning. 

This is why we developed our custom auto align. It works similarly but with only two PID controllers: distance and rotation. We originally used a ```ProfiledPIDController``` but soon realized there was a small yet painful bug - it wouldn't apply the constraints properly. So we created our custom Constrained PID Controller. To fix the second issue with traveling then auto align, we would reset the PID controller with our average wheel velocity. This would create a nice smooth transition when aligning with almost no possibility of human error.

## Teleoperated
Our goal for this year was **reducing as much load on the driver** as possible, meaning as **few buttons** as possible with minimal thinking for all the buttons. We managed to mainly have only 3: auto align left, auto align right, and remove algae.

### Coral 
We first started with loads of manual buttons: score, retract elevator, pickup, etc. We then soon noticed that we could have the robot intaking constantly if the robot didn't have a game piece. We also had human error with retracting the elevator close to the reef. Our idea was to have a *danger zone* around the reef and have the elevator automatically retract after leaving the *danger zone*. All the driver had to do to score was press a button - the robot would take over and do the rest of the work.

### Algae
Algae removal was also fully automatic. There were three different types: perfect conditions, too close & L4, and too close. Perfect would be aligning while raising the elevator to the correct algae height based on the closest algae, grabbing the algae, then backing up. Too close L4 was when we just scored an L4 branch and we were in that *danger zone* - the robot would keep the elevator up, travel to the middle of the branches, then go down into the algae and backup. Too close would be when the robot is too close to the reef (inside the *danger zone*) - it would first backup, then do the perfect conditions command.

## Learning Insights
The biggest takeaway from this year was PathPlanner's issues - we wanted a faster and more efficient travel method. **Point-to-Point** is the next best option. [Choreo](https://choreo.autos/) does this, so we would be looking into that. Otherwise, we might create a custom Point-to-Point program or stick with PathPlanner. Always having some sort of filtering for your vision cameras is a must.