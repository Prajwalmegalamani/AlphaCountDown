# Alpha Countdown React Component

A customizable React component for displaying countdowns with various options and styling with types.

## Installation

```bash
npm install alpha-countdown
```

## Usage

```bash
import AlphaCountDown from "alpha-countdown";
import { useEffect, useState } from "react";

export default function Home() {
  const [totalDuration, setTotalDuration] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ completed:", completed);
  }, [completed]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ totalDuration:", totalDuration);
  }, [totalDuration]);

  function getRemainingDurationinSeconds(remainingDurationinSeconds: number) {
    console.log(
      "🚀 ~ getRemainingDurationinSeconds ~ remainingDurationinSeconds:",
      remainingDurationinSeconds
    );
  }

  function getProgress(progress: number) {
    console.log(
      "🚀 ~ getRemainingDurationinSeconds ~ remainingDurationinSeconds:",
      progress
    );
  }

  return (
    <AlphaCountDown
      getTotalDuration={setTotalDuration}
      getRemainingDuration={getRemainingDurationinSeconds}
      getCompleted={setCompleted}
      getProgress={getProgress}
      reverse={true}
      showLive={true}
      // Default smooth Progress true
      smoothProgress={true}
      percantageDecimals={0}
      // Default show Seconds true
      showCountDown={true}
      // Default show Percentage true
      showPercentage={true}
      // Default show Milliseconds false
      showMilliseconds={false}
      // Show only remaining time false
      showOnlyRemainingTime={false}
      // Toggle to show years when showOnlyRemainingTime is false
      showYears={true}
      // Toggle to show months when showOnlyRemainingTime is false
      showMonths={true}
      // Toggle to show days when showOnlyRemainingTime is false
      showDays={true}
      // Only text for now
      onComplete="Hello, Time Up bro"
      timeFormat="short"
      dateSeparator="space"
      endTime={new Date(new Date().setSeconds(new Date().getSeconds() + 10))}
      containerStyles={{}}
      progressBarStyles={{}}
      overlayStyles={{}}
      inProgressStyles={{
        color: "green",
        // background: "black",
      }}
      onCompleteStyles={{}}
      containerClassNames="!h-[800px]"
      progressBarClassNames="!bg-pink-200"
      overlayClassNames="!text-green-300"
      onCompleteClassNames="!text-red-100 !bg-blue-900 font-bold rounded-md"
      inProgressClassNames="text-red"
      customOverlayForCompleted={<>Check</>}
      customOverlayForInProgress={<div className="text-red">hello</div>}
      customTextBeforePercentage={<>Remaining Percentage </>}
      customTextBeforeTime={<>Remaining Time</>}
    />
  );
}

```

## Props
### Required Props

### `endTime`

- **Type**: Date
- **Description**: The end time for the countdown.


### Optional Props
### `getTotalDuration`

- **Type**: Function
- **Description**: Callback function to get the total duration.

### `getRemainingDuration`

- **Type**: Function
- **Description**: Callback function to get the remaining duration in seconds.

### `getCompleted`

- **Type**: Function
- **Description**: Callback function to get the completion status.

### `getProgress`

- **Type**: Function
- **Description**: Callback function to get the progress percentage.

### `onComplete`

- **Type**: String
- **Description**: The message or action to trigger when the countdown is complete.

### `reverse`

- **Type**: Boolean
- **Default**: `true`
- **Description**: Reverse the countdown direction.

### `smoothProgress`

- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable smooth progress animation.

### `showPercentage`

- **Type**: Boolean
- **Default**: `true`
- **Description**: Show or hide the percentage.

### `showCountDown`

- **Type**: Boolean
- **Default**: `true`
- **Description**: Show or hide the countdown timer.

### `showLive`

- **Type**: Boolean
- **Default**: `true`
- **Description**: Show or hide the live countdown updates.

### `showMilliSeconds`

- **Type**: Boolean
- **Default**: `false`
- **Description**: Show or hide milliseconds.

### `showOnlyRemainingTime`

- **Type**: Boolean
- **Default**: `false`
- **Description**: Show only the remaining time.

### `showYears`, `showMonths`, `showDays`

- **Type**: Boolean
- **Default**: `true`
- **Description**: Toggle to show years, months, and days.

### `percantageDecimals`

- **Type**: Number
- **Default**: `0`
- **Description**: Number of decimal places for the percentage.

### `timeFormat`

- **Type**: String
- **Default**: `"short"`
- **Description**: Time format options: `"short"`, `"long"`, or `false`.

### `customTextBeforePercantage`, `customTextBeforeTime`

- **Type**: ReactNode
- **Description**: Custom text or JSX elements to display before the percentage and time.

### `customOverlayForCompleted`, `customOverlayForInProgress`

- **Type**: ReactNode
- **Description**: Custom content to overlay when the countdown is completed or in progress.

### `dateSeparator`

- **Type**: String
- **Default**: `"space"`
- **Description**: Separator for date elements: `"-"`, `":"`, `"space"`, or custom string.

### `containerStyles`, `progressBarStyles`, `overlayStyles`, `onCompleteStyles`, `inProgressStyles`

- **Type**: CSSProperties
- **Description**: Custom styles for different components.

### `containerClassNames`, `progressBarClassNames`, `overlayClassNames`, `onCompleteClassNames`, `inProgressClassNames`

- **Type**: String
- **Description**: Custom CSS class names for different components.
- 

Feel free to experiment with these styling options to achieve the desired look and feel for your countdown component. If you encounter any issues or have suggestions for improvements, please open an issue on [GitHub](https://github.com/Prajwalmegalamani/AlphaCountDown).

Coding is Love❤️