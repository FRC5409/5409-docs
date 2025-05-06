---
id: Project
title: Project Development
sidebar_position: 2
---

## Drive
This year with the addition of Advantage Kit we decided it was much easier use [Advantage Kit's TalonFX Swerve Template](https://docs.advantagekit.org/getting-started/template-projects/talonfx-swerve-template/). Made by [6328](https://www.thebluealliance.com/team/6328), it is a powerful resource for fast and effective swerve drive control. We then did some modifications to include Torque control on the motors to get to get an increase in peak power from FOC. From there we set up and tweaked with the simulation for the template to include [Maple Sim](https://shenzhen-robotics-alliance.github.io/maple-sim/). This is optional but we find that it can lead to an increase accuracy in simulation and offers more areas to find bugs before going on the real robot.

## Vision
One of our takeaways from last year was having as **little cameras as possible** would make programming a lot easier. Having one camera doing what your **main function** of your robot is was our note. We also wanted the easiest and effective solution which is why we decided to use a [LimeLight](https://docs.limelightvision.io/docs/docs-limelight/getting-started/summary). In our case we knew we wanted to have one camera that could see the tag when aligned to both the left and right branch so we would be confident when scoring. To do this we used [Advantage Scope](https://docs.advantagescope.org/) to visualize a camera through a 3d field. We would run some basic autos and some "*telop cycles*".
:::note
Used MT1 for rotation when close to a april tag MT2 used when farther away to increase accuracy.
:::

## Autonomous
One of our big takeaways from last year was our auto didn't score many points, our design this year reflected that by maximizing auto points. We starting designing our autos using [Path Planner](pathplanner.dev) and our alignment commands would have to be custom. This is due to **path planner ending paths early** with a timeout instead of an end condition, any wheel slipage or inaccuracy would cause the path to end before the robot has reached the target. Another improvement we used this year was implementing [sysID](https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html) which could tune some of our PID contants for your drive base. To increase accuracy we also made sure our *robot config* was as accurate as possible; robot weight **in full** (bumpers, battery), MoI, etc. One trick we used to get around paths ending early was to drive at a constant slow speed into the coral station when picking up; simple and effective.
:::tip
Logging how long auto takes can aid with autonomous development
:::

## Auto Align
At the start of the year we knew right away it was going to be essential to have auto align to score on every branch quickly. The easiest and recommended way would be **triple PID**; x position, y position, and rotation. It works by taking your current pose and a target pose then applies a **field-oriented** PID output for x, y, and rotation. This solution is fast with minimal setup. This method we used for our first competition and it worked great, be there was room to improve, it wouldn't always take the most optimal path to the point and we had issues with the robot traveling and then auto aligning. This is why we developed our custom auto align, it works similar however with only two PID controllers, a distance and a rotation. We orginally used a ```ProfiledPIDController``` but soon released there was a small yet painful bug, it wouldn't apply the contraints properly. So we created our custom Constrained PID Controller. To fix the second issue with traveling then auto align we would reset the PID controller with our average wheel velocity, this would create a nice smooth transition when aligning with almost no way of human error.

## Teleoperated
Our goal for this year was **reducing as much load on the driver** as possible, meaning as **little buttons** as possible with minimal thinking for all the buttons. We managed to mainly have only 3; auto align left, auto align right, and remove algae.

### Coral 
We first started with loads of manual buttons; score, retract elevator, pickup, etc. We then soon noticed that we could have the robot intaking constantly if the robot didn't have a game piece. We also had human error with retracting the elevator close to the reef. Our idea was to have a *danger zone* around the reef and have the elevator automatically retract after leaving the *danger zone*. All the driver had to do to score was press a button, the robot would take over and do the rest of the work.

### Algae
Algae removale was also fully automatic, there was three different types; perfect conditions, too close & L4, too close. Perfect would be aligning while raising the elevator to the correct algae height based off the closest algae, grabbing the algae then backing up. Too close L4 was when we just scored an L4 branch and we were in that *danger zone*, the robot would keep the elevator up, travel to the middle of the branches then go down into the algae and backup. Too close would be when the robot is too close to the reef (inside the *danger zone*) it would first backup, then do the perfect conditions command.

## Learning Insights
The biggest takeaway from this year was path planners issues, we wanted a faster and more efficent travel method. **Point-to-Point** is the next best option, [Cheoreo](https://choreo.autos/) does this so we would be looking into that, otherwise we might create a custom Point-to-Point program or stick with Path Planner. Always having some sort of filtering for your vision cameras is a must.