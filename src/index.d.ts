import { ComponentProps } from "react";
import { CSSProperties } from "react";
import { ReactNode } from "react";

//Input Props
export default interface IAlphaCountDown {
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
  