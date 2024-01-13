"use client";
import React, {
  useState,
  useEffect,
  CSSProperties,
  ReactNode,
  ComponentProps,
} from "react";

export interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

//Input Props
export interface IAlphaCountDown {
  //data outputs
  getRemainingDuration?: (remainingDuration: number) => void;
  getProgress?: (remainingDuration: number) => void;
  getTotalDuration?: React.Dispatch<React.SetStateAction<number>>;
  getCompleted?: React.Dispatch<React.SetStateAction<boolean>>;
  //Date Inputs
  endTime: Date;
  onComplete?: string;
  //boolean Inputs
  reverse?: boolean;
  smoothProgress?: boolean;
  showPercantage?: boolean;
  showCountDown?: boolean;
  showLive?: boolean;
  showMilliSeconds?: boolean;
  showOnlyRemainingTime?: boolean;
  showYears?: boolean;
  showMonths?: boolean;
  showDays?: boolean;
  percantageDecimals?: number;
  timeFormat?: "short" | "long" | false;
  //html Inputs
  customTextBeforePercantage?: ReactNode;
  customTextBeforeTime?: ReactNode;
  customOverlayForCompleted?: ReactNode;
  customOverlayForInProgress?: ReactNode;
  //css styles Inputs
  dateSeperator?: "-" | ":" | "space" | string;
  containerStyles?: CSSProperties;
  progressBarStyles?: CSSProperties;
  overlayStyles?: CSSProperties;
  onCompleteStyles?: CSSProperties;
  inProgressStyles?: CSSProperties;
  //css classnames Inputs
  containerClassNames?: ComponentProps<"div">["className"];
  progressBarClassNames?: ComponentProps<"div">["className"];
  overlayClassNames?: ComponentProps<"div">["className"];
  onCompleteClassNames?: ComponentProps<"div">["className"];
  inProgressClassNames?: ComponentProps<"div">["className"];
}

export default function AlphaCountDown({
  getProgress,
  getCompleted,
  getRemainingDuration,
  getTotalDuration,
  //Default on Complete is string
  onComplete = "Timer Completed",
  endTime,
  reverse = false,
  showLive = true,
  //Default smooth Progress true
  smoothProgress = true,
  //Default show Seconds true
  showCountDown = true,
  //Default show Percantage true
  showPercantage = true,
  showYears = true,
  showMonths = true,
  showDays = true,
  timeFormat = "short",
  dateSeperator = "space",
  percantageDecimals = 0,
  //Default show Milli Seconds false
  showMilliSeconds = false,
  showOnlyRemainingTime = true,
  containerStyles,
  progressBarStyles,
  overlayStyles,
  containerClassNames,
  progressBarClassNames,
  overlayClassNames,
  onCompleteStyles,
  inProgressStyles,
  onCompleteClassNames,
  inProgressClassNames,
  customOverlayForCompleted,
  customOverlayForInProgress,
  customTextBeforePercantage,
  customTextBeforeTime,
}: IAlphaCountDown) {
  const [inputTime, setInputTime] = useState(endTime);
  const [completed, setCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<number>(
    calculateTimeRemaining()
  );
  const [percentageRemaining, setPercentageRemaining] = useState<number>(
    calculatePercentageRemaining(reverse)
  );
  function calculateTimeRemaining(): number {
    const now = new Date();
    const difference = inputTime.getTime() - now.getTime();
    return Math.max(0, difference); // Ensure time remaining is non-negative
  }

  useEffect(() => {
    getRemainingDuration && getRemainingDuration(timeRemaining);
    getProgress && getProgress(percentageRemaining);
  }, [timeRemaining, percentageRemaining]);

  function calculatePercentageRemaining(reverse: boolean): number {
    const now = new Date();
    const elapsedMilliseconds = now.getTime() - startTime.getTime();
    const totalTime = inputTime.getTime() - startTime.getTime();
    getTotalDuration && getTotalDuration(totalTime);
    // Ensure the percentage is between 0 and 100
    const rawPercentage = (elapsedMilliseconds / totalTime) * 100;
    let percentage = Math.max(0, Math.min(100, rawPercentage));
    if (reverse) percentage = 100 - percentage;
    // If elapsed time exceeds totalTime, set percentage to 0
    if (elapsedMilliseconds >= totalTime) {
      return 0;
    }
    return percentage;
  }

  useEffect(() => {
    if (smoothProgress) {
      let animationFrameId: number;

      const updateTimer = () => {
        const remaining = calculateTimeRemaining();
        setTimeRemaining(remaining);
        setPercentageRemaining(calculatePercentageRemaining(reverse));

        if (remaining === 0) {
          setCompleted(true);
          getCompleted && getCompleted(true);
          cancelAnimationFrame(animationFrameId);
        } else {
          animationFrameId = requestAnimationFrame(updateTimer);
        }
      };

      updateTimer();
      return () => cancelAnimationFrame(animationFrameId);
    } else {
      const interval = setInterval(() => {
        const remaining = calculateTimeRemaining();
        setTimeRemaining(remaining);
        setPercentageRemaining(calculatePercentageRemaining(reverse));
        if (remaining === 0) {
          setCompleted(true);
          getCompleted && getCompleted(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endTime, smoothProgress, reverse]);

  function getTimeFormat(timeFormat: "short" | "long" | false, text: string) {
    if (!timeFormat) {
      return "";
    }
    const formats: Record<string, Record<"short" | "long", string>> = {
      years: { short: "y", long: " years" },
      months: { short: "mo", long: " months" },
      days: { short: "d", long: " days" },
      hours: { short: "h", long: " hours" },
      minutes: { short: "m", long: " minutes" },
      seconds: { short: "s", long: " seconds" },
      milliSeconds: { short: "ms", long: " milliseconds" },
    };

    return formats[text] ? formats[text][timeFormat] || "" : "";
  }

  function formatTimeUnit(
    value: number,
    unit: string,
    timeFormat: "short" | "long" | false,
    showOnlyRemainingTime: boolean
  ): string {
    if (value > 0) {
      return `${value}${getTimeFormat(timeFormat, unit)}`;
    } else {
      return checkShowOnlyRemainingTime(showOnlyRemainingTime);
    }

    function checkShowOnlyRemainingTime(
      showOnlyRemainingTime: boolean
    ): string {
      if (!showOnlyRemainingTime) {
        return `00 ${getTimeFormat(timeFormat, unit)}`;
      }
      return "";
    }
  }

  const formatTime = (
    time: number,
    showMilliSeconds: boolean,
    showOnlyRemainingTime: boolean,
    dateSeparator: "-" | ":" | "space" | string,
    timeFormat: "short" | "long" | false,
    showYears: boolean,
    showMonths: boolean,
    showDays: boolean
  ): string => {
    const roundedMilliseconds = Math.round(time % 1000);
    const roundedSeconds = Math.round(time / 1000); // Round to the nearest second
    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const seconds = roundedSeconds % 60;

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const months = Math.floor(days / 30); // Assuming an average month length of 30 days
    const remainingDays = days % 30;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const separator =
      typeof dateSeparator === "string" && dateSeparator != "space"
        ? dateSeparator
        : " ";

    const parts = [
      showYears &&
        formatTimeUnit(years, "years", timeFormat, showOnlyRemainingTime),
      showMonths &&
        formatTimeUnit(
          remainingMonths,
          "months",
          timeFormat,
          showOnlyRemainingTime
        ),
      showDays &&
        formatTimeUnit(
          remainingDays,
          "days",
          timeFormat,
          showOnlyRemainingTime
        ),
      formatTimeUnit(
        remainingHours,
        "hours",
        timeFormat,
        showOnlyRemainingTime
      ),
      formatTimeUnit(minutes, "minutes", timeFormat, showOnlyRemainingTime),
      formatTimeUnit(seconds, "seconds", timeFormat, showOnlyRemainingTime),
      showMilliSeconds &&
        formatTimeUnit(
          roundedMilliseconds,
          "milliSeconds",
          timeFormat,
          showOnlyRemainingTime
        ),
    ].filter(Boolean);

    return parts.join(separator);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "45px",
        // height: "100%",
        position: "absolute",
        borderRadius: "8px",
        backgroundColor: "lightgreen",
        textAlign: "center",
        justifyContent: "center",
        ...containerStyles,
      }}
      className={containerClassNames}
    >
      <div
        style={{
          width: `${percentageRemaining.toFixed(2)}%`,
          display: "flex",
          height: "100%",
          transition: "width 0.5s steps",
          ...progressBarStyles,
          zIndex: 5,
          borderRadius: 5,
          backgroundColor: "#EB6A6E",
        }}
        className={progressBarClassNames}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "8px",
            display: "flex",
            ...overlayStyles,
            color: "white",
          }}
          className={overlayClassNames}
        >
          {/* Completed Container */}

          {completed ? (
            customOverlayForCompleted ? (
              <div
                style={{
                  transition: "all 3s linear",
                }}
              >
                {customOverlayForCompleted}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  ...onCompleteStyles,
                  color: "yellow",
                  background: "brown",
                }}
                className={onCompleteClassNames}
              >
                {typeof onComplete === "string" && onComplete}
              </div>
            )
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                textAlign: "center",
                justifyContent: showLive ? "space-between" : "end",
                margin: "0 10px",
                alignItems: "center",
                ...inProgressStyles,
              }}
              className={inProgressClassNames}
            >
              {customOverlayForInProgress ? (
                <>{customOverlayForInProgress}</>
              ) : (
                <>
                  {/* Left Container */}
                  {showLive && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        textAlign: "center",
                        verticalAlign: "middle",
                        margin: "auto 5px",
                      }}
                    >
                      {/* Live Container */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          borderRadius: "4px",
                          width: "fit-content",
                          height: "fit-content",
                          fontSize: "12px",
                          textAlign: "center",
                          background: "black",
                          color: "white",
                          padding: "2px 5px",
                        }}
                      >
                        {/* Live Icon */}
                        <div
                          style={{
                            display: "flex",
                            margin: "auto 2px auto 0",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "9999px",
                            verticalAlign: "middle",
                            backgroundColor: "white",
                            height: "6px",
                            width: "6px",
                          }}
                        ></div>
                        {/* Live Text */}
                        <span
                          style={{
                            display: "flex",
                            padding: "0 2px",
                            justifyContent: "center",
                            fontWeight: 400,
                            verticalAlign: "middle",
                            color: "10px",
                          }}
                        >
                          LIVE
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Right Container */}
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {/* CountDown */}
                    {showCountDown && (
                      <div
                        style={{
                          width: showLive ? "fit-content" : "100%",
                          display: "flex",
                          margin: "auto 5px",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          verticalAlign: "middle",
                          color: "black",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        {customTextBeforeTime && customTextBeforeTime}
                        &nbsp;
                        {formatTime(
                          timeRemaining,
                          showMilliSeconds,
                          showOnlyRemainingTime,
                          dateSeperator,
                          timeFormat,
                          showYears,
                          showMonths,
                          showDays
                        )}
                      </div>
                    )}
                    {/* Percantage */}
                    {showPercantage && (
                      <div
                        style={{
                          width: showLive ? "fit-content" : "100%",
                          display: "flex",
                          margin: "auto 5px",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          verticalAlign: "middle",
                          color: "black",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        <span>
                          {customTextBeforePercantage &&
                            customTextBeforePercantage}
                          {percentageRemaining.toFixed(percantageDecimals)}%
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
