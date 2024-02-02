import React from "react";
import {
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import { IoEllipseOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import Card from "components/card/Card";
import TimelineRow from "./TimelineRow";
import { TEXT_COLOR_LIGHT, TEXT_COLOR_DARK, HIGHLIGHT_COLOR_LIGHT, HIGHLIGHT_COLOR_DARK, ICON_COLOR_LIGHT, ICON_COLOR_DARK } from "constants/ThemeConstants";

function TaskTimeline(props) {

    const { currentStepIndex, completedSteps, disabledSteps, handleCurrentStepChange } = { ...props };

    const textColor = useColorModeValue(TEXT_COLOR_LIGHT, TEXT_COLOR_DARK);
    const highlightColor = useColorModeValue(HIGHLIGHT_COLOR_LIGHT, HIGHLIGHT_COLOR_DARK);
    const iconColor = useColorModeValue(ICON_COLOR_LIGHT, ICON_COLOR_DARK);

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
        <Card p="1rem" height="100%" width="100%">
            <Flex direction="column" p="1rem" mt="1rem">
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