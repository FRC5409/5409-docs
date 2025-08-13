---
id: Layers
title: Subsytem Layers
sidebar_position: 2
---

## The IO Layer
This layer is the transition layer between logic and Input/Output (IO). This layer will contain **all** variables that are used for logic and other variables that should be logged. **As of the 2025 season**, this is an example of what this layer might look like:

```java
public interface ElevatorIO {
    @AutoLog
    public class ElevatorInputs {
        public boolean motorConnected    = false;
        public double  appliedVoltage    = 0.0;
        public double  appliedCurrent    = 0.0;
        public double  motorTemperature  = 0.0;
        public double  motorPosition     = 0.0;
        public double  motorVelocity     = 0.0;
    }

    public default void updateInputs(ElevatorInputs inputs) {}

    public default void setSetpoint(Distance setpoint) {}

    public default Distance getPosition() {return Meters.of(0.0);}
}
```

:::tip
The file is recommended to be named ```ElevatorIO.java```
:::

:::warning
This code is accurate as of 2025. More up-to-date information can be found [here](https://docs.advantagekit.org/)
:::

As you can see, this file contains no logic, not even motors or simulated devices. This should **only contain** the variables to log. We then have one method called ```updateInputs(...)``` - this method should be present in **all** IO layers. This method will update all of the variables in the inputs to their latest values. The other methods are used to directly interact with simulated devices or motors: set voltage, set a PID position, coast/brake mode, etc.

## Real/Simulated IO Layer
A real IO layer should implement the IO layer interface. This means it will take all of the methods from the IO layer and can then be modified to include simulated devices or motor devices. The naming convention for this file should be ```ElevatorIO{motorController}```. Here's an example of what a **real** IO layer could look like:

```java
public class ElevatorIOTalonFX implements ElevatorIO {

    private final TalonFX motor;

    private PositionVoltageRequest positionRequest;

    public ElevatorIOTalonFX(int ID) {
        motor = new TalonFX(ID);

        positionRequest = new PositionVoltage(0);

        /*
            Motor configs here...
        */
    }

    @Override
    public void setSetpoint(Distance setpoint) {
        motor.setControl(positionRequest.withPosition(setpoint.in(Meters)));
    }

    /*
        Other Override methods here...
    */

    @Override
    public void updateInputs(ElevatorInputs inputs) {
        // NOTE: This is an example, these methods do not exist. Check docs to find the correct methods

        inputs.motorConnected   = motor.isConnected();
        inputs.appliedVoltage   = motor.getAppliedVoltage();
        inputs.appliedCurrent   = motor.getAppliedCurrent();
        inputs.motorTemperature = motor.getTemperature();
        inputs.motorPosition    = motor.getPosition();
        inputs.motorVelocity    = motor.getVelocity();
    }
}
```
:::warning
This motor controller API was last validated in 2025 please read the docs to the motor controller you are using
:::

## The Logic Layer
The logic layer does exactly what the name says, it handles **all** logic of the subsystem. This logic layer will take in the IO layer in the constructor, this is how different IOs get sent to it while still using the **same logic**. Then update inputs and logging inputs can be called in periodic. Here's an example of what a subsystem might look like

```java
public class Elevator extends SubsystemBase {

    private final ElevatorIO io;
    private final ElevatorIOInputs inputs = new ElevatorIOInputs();

    public Elevator(ElevatorIO io) {
        this.io = io;
    }

    public Command exampleCommand() {
        return Commands.runOnce(() -> io.setSetpoint(Meters.of(0.1)), this); // Command Factory
    }

    @Override
    public void periodic() {
        io.updateInputs(inputs);
        Logger.processInputs("Elevator", inputs);
    }
}
```

:::tip
Create command factory methods for basic functions in your subsystem
:::
:::warning
This code is accurate as of 2025. More up-to-date information can be found [here](https://docs.advantagekit.org/)
:::