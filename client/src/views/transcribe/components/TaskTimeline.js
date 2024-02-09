import React from "react";
import {
    Flex,
} from "@chakra-ui/react";
import { IoEllipseOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import Card from "components/card/Card";
import TimelineRow from "./TimelineRow";

function TaskTimeline(props) {

    const { currentStepIndex, completedSteps, disabledSteps, handleCurrentStepChange } = { ...props };

    const textColor = "#ffffff"
    const highlightColor = "#F64A8A";
    const iconColor = "#ffffffa1";

    // TODO: add dynamic descriptions from backend api calls
    const timelineSteps = [
        {
            title: "Select Audio File",
            description: "",
        },
        {
            title: "Configure Options",
            description: "",
        },
        {
            title: "Transcibe",
            description: "",
        },
    ];

    const isNextStepAvailable = (stepIndex) => {
        return stepIndex < completedSteps.length - 1;
    };

    const isStepComplete = (stepIndex) => {
        return completedSteps[stepIndex];
    };

    const isStepDisabled = (stepIndex) => {
        return disabledSteps[stepIndex];
    };

    const getStepIcon = (stepIndex) => {
        return isStepComplete(stepIndex) ? IoCheckmarkCircleSharp : IoEllipseOutline;
    }

    const getStepIconColor = (stepIndex) => {
        if (completedSteps[stepIndex] === true) {
            return highlightColor;
        } else if (stepIndex === currentStepIndex) {
            return textColor;
        } else {
            return iconColor;
        }
    };

    const getStepConnectorColor = (stepIndex) => {
        if (isNextStepAvailable(stepIndex) && completedSteps[stepIndex]
            && completedSteps[stepIndex + 1]) {
            return highlightColor;
        } else {
            return iconColor;
        }
    };

    const getStepTextColor = (stepIndex) => {
        return stepIndex === currentStepIndex ? textColor : iconColor;
    };

    const handleTimelineRowClick = (step) => {
        handleCurrentStepChange(step);
    };

    return (
        <Card className="card">
            <Flex className="timeline-container">
                {timelineSteps.map((row, index, arr) => {
                    return (
                        <TimelineRow
                            key={index}
                            logo={getStepIcon(index)}
                            title={row.title}
                            date={row.description}
                            color={getStepIconColor(index)}
                            textColor={getStepTextColor(index)}
                            stepConnectorColor={getStepConnectorColor(index)}
                            index={index}
                            arrLength={arr.length}
                            handleTimelineRowClick={() => handleTimelineRowClick(index)}
                            isDisabled={isStepDisabled(index)}
                            isFinal={!isNextStepAvailable(index)}
                        />
                    );
                })}
            </Flex>
        </Card>
    );
}

export default TaskTimeline;