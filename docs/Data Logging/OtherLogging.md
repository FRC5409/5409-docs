---
id: OtherLogging
title: Extra Logging
sidebar_position: 3
---

## Single Variable Logging
Some situations make it beneficial to log data outside of subsystems. An example would be logging how long auto takes to complete - this could be useful to find how much time you need to save or how much time is left after auto completes. This can be done using ```Logger.recordOutput(name, data)``` as of **2025**.

:::tip
Check [AdvantageKit docs](https://docs.advantagekit.org/data-flow/supported-types) for supported data types.
:::

## Method Logging
Logging the output of a method can be done in many ways. You can do it through ```Logger.recordOutput(name, data)```, however you would have to periodically call the method. An easier way built into AdvantageKit is through a decorator ```@AutoLogOutput(key = name)``` which you can put before a method to periodically call the method and log the output.

:::caution
Last updated in 2025 - please check [AdvantageKit docs](https://docs.advantagekit.org) for the latest API
:::