import * as React from 'react';

interface IAlphaCountDown {
    getRemainingDuration?: (remainingDuration: number) => void;
    getProgress?: (remainingDuration: number) => void;
    getTotalDuration?: React.Dispatch<React.SetStateAction<number>>;
    getCompleted?: React.Dispatch<React.SetStateAction<boolean>>;
    endTime: Date;
    onComplete?: string;
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
    customTextBeforePercantage?: React.ReactNode;
    customTextBeforeTime?: React.ReactNode;
    customOverlayForCompleted?: React.ReactNode;
    customOverlayForInProgress?: React.ReactNode;
    dateSeperator?: "-" | ":" | "space" | string;
    containerStyles?: React.CSSProperties;
    progressBarStyles?: React.CSSProperties;
    overlayStyles?: React.CSSProperties;
    onCompleteStyles?: React.CSSProperties;
    inProgressStyles?: React.CSSProperties;
    containerClassNames?: React.ComponentProps<"div">["className"];
    progressBarClassNames?: React.ComponentProps<"div">["className"];
    overlayClassNames?: React.ComponentProps<"div">["className"];
    onCompleteClassNames?: React.ComponentProps<"div">["className"];
    inProgressClassNames?: React.ComponentProps<"div">["className"];
}
declare function AlphaCountDown({ getProgress, getCompleted, getRemainingDuration, getTotalDuration, onComplete, endTime, reverse, showLive, smoothProgress, showCountDown, showPercantage, showYears, showMonths, showDays, timeFormat, dateSeperator, percantageDecimals, showMilliSeconds, showOnlyRemainingTime, containerStyles, progressBarStyles, overlayStyles, containerClassNames, progressBarClassNames, overlayClassNames, onCompleteStyles, inProgressStyles, onCompleteClassNames, inProgressClassNames, customOverlayForCompleted, customOverlayForInProgress, customTextBeforePercantage, customTextBeforeTime, }: IAlphaCountDown): React.JSX.Element | null;

export { AlphaCountDown };
