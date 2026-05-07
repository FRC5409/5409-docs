---
id: camera_tuning
title: Camera Tuning
sidebar_position: 6
---

# Limelight Tuning

Tuning the Limelight is more straight-forward then it seems. The 3 things you will adjust are the exposure, sensor gain,
and black level offset.

<div style={{padding: '1rem', backgroundColor: 'rgba(46, 133, 85, 0.08)', borderRadius: '6px', marginBottom: '1.5rem', borderLeft: '3px solid var(--ifm-color-primary)'}}>

💡 **Tip**<br/>
You should always name your Limelight tuning profiles, so they can easily be identitifed. For instance, a profile for
the 2026 Ontario Championships (ONCMP) would be named `5409_ONCMP2026`, or a profile at home would be `5409_HOME_RM1094`.

</div>

## Exposure (10 µm)

Increasing **exposure** makes the picture brighter (by allowing more light into the camera sensor) but increases the
time between frames, decreasing the camera's overall FPS.
This value should be tuned for a picture that allows the Limelight to capture as many tags as possible, while not being
too high that it significantly increases the frame delay.

## Sensor Gain

Increasing the **sensor gain** digitally increases picture brightness, but increases noise in the picture itself. This
can make it harder for the Limelight to recognize AprilTags or other objects. Use this value in cases where you cannot
change the exposure to make the picture bright enough (i.e. if there is not enough light in the room).

## Black Level Offset

Increasing the **black level offset** increases the cutoff range for total blackness. You can think of this like
increasing the contrast, or playing with the levels of the picture.