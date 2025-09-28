---
id: EffectiveUsage
title: How to Effectively Use Simulation
sidebar_position: 2
---

# How to Effectively Use Robot Simulation

Robot simulation is a powerful development tool that allows you to test code safely, debug issues, and develop strategies before touching physical hardware. This guide will walk you through our recommended approach to simulation, from basic drivetrain testing to full robot CAD integration.

## Overview of the Process

Our simulation workflow follows a structured approach:

1. **Start Simple** - Begin with basic drivetrain simulation
2. **Add Subsystems** - Integrate individual mechanisms
3. **Full Integration** - Import complete robot CAD models

## Step 1: Drivetrain Simulation

### Basic Swerve Drive Setup

Start with the most fundamental aspect of your robot - the drivetrain. Swerve drive simulation provides immediate feedback for path following, control tuning, and automatic driving verification.

<div style={{padding: '1rem', backgroundColor: 'rgba(46, 133, 85, 0.08)', borderRadius: '6px', marginBottom: '1.5rem', borderLeft: '3px solid var(--ifm-color-primary)'}}>

**Why Start Here?** Drivetrain simulation is the foundation of robot control. Getting this right first ensures that all your autonomous routines, path following, and basic movement will work correctly when you move to hardware.

</div>

You can also look into adding a physics sim using MapleSim. MapleSim will allow you to interact with the field, gamepieces, and allow you to score simulated game pieces.

**Benefits of MapleSim Integration:**
- Realistic physics modeling involving friction, current limits, and brownouts
- Validation of control algorithms under realistic conditions

## Step 2: Individual Subsystem Integration

### Setting Up Subsystems

Once your drivetrain is working reliably, begin integrating individual subsystems using Simulated hardware for realistic physics simulation.

<div style={{padding: '1rem', backgroundColor: 'rgba(255, 179, 67, 0.08)', borderRadius: '6px', marginBottom: '1.5rem', borderLeft: '3px solid #ffb343'}}>

**Tip:** You can create simulated arms and elevators using WPILib's Mechanism2D (as of 2025). This can be visualized in AdvantageScope.

</div>

**Integration Process:**

1. **Export Mechanism Models** - Export individual subsystems (elevator, pivot, intake, etc.) from your CAD design
2. **Import to MapleSim** - Configure realistic physics properties (mass, inertia, friction)
3. **WPILib Integration** - Use WPILib integration to simulate hardware.
4. **Test Individually** - Verify each subsystem behaves correctly in isolation.
4. **MapleSim (Optional)** - MapleSim also allows you to simulate hardware, might be more accurate than WPILib's.

### Example: Elevator Subsystem

```java
// Example Subsystem using WPILibs simulation
public class ElevatorIOSim implements ElevatorIO {

    private ElevatorSim elevatorSim;
    private PIDController PID;

    public ElevatorIOSim() {

        //Creating sim elevator object
        elevatorSim = new ElevatorSim(
            DCMotor.getFalcon500(2), 
            kElevator.kGearing, 
            kElevator.ELEVATOR_MASS.in(Kilograms), 
            kElevator.ELEVATOR_DRUMRADIUS.in(Meters), 
            kElevator.ELEVATOR_MIN_HEIGHT, 
            kElevator.ELEVATOR_MAX_HEIGHT, 
            true, 
            kElevator.ELEVATOR_MIN_HEIGHT
        );
        PID = new PIDController(kElevator.SIM_PID.kP, kElevator.SIM_PID.kI, kElevator.SIM_PID.kD);
    }
```

## Step 3: Full Robot CAD Integration

### Importing Your Complete Robot Model

<div style={{padding: '1rem', backgroundColor: 'rgba(255, 179, 67, 0.08)', borderRadius: '6px', marginBottom: '1.5rem', borderLeft: '3px solid #ffb343'}}>

**Pro Tip:** Start with a old version of your CAD model, even using a previous years CAD model for testing. 

</div>

**CAD Integration Steps:**

1. **Prepare CAD Model**
   - Assign semi-realistic masses and other properties for simulation
   - Must be exported/converted to a .glb format

2. **Export and Import**
   - Export from CAD software
   - Import into AdvantageScope custom assets
   - Verify all moving parts are seperated into their respective files

3. **Configure Physics Properties**
   - Set accurate mass properties for each component
   - Configure motor mounting and gear ratios