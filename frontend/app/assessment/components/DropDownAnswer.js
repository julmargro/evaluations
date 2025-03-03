"use client";
import React from "react";
import { useUser } from "../../context/UserContext";
import { Field, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const DropDownAnswer = ({ questionKey }) => {
  const { state, dispatch } = useUser();
  const isDisabled = state.assessmentInfo?.status === "Complete";

  const scoreMapping = {
    "Not Observed": 0,
    "Not Applicable": 0,
    "Never": 0,
    "Occasionally": 1,
    "Frequently": 2,
    "Always": 3,
  };

  const reverseScoreMapping = {
    0: "Not Observed",
    1: "Occasionally",
    2: "Frequently",
    3: "Always",
  };

  const currentAnswer = reverseScoreMapping[state.answers?.[questionKey]] || "Not Observed";

  const handleAnswerChange = (event) => {
    const selectedAnswer = event.target.value;
    const selectedScore = scoreMapping[selectedAnswer];
    dispatch({
      type: "UPDATE_ANSWERS",
      payload: { [questionKey]: selectedScore },
    });
  };

  return (
    <div className="w-full max-w-xs px-4">
      <Field>
        <div className="relative">
          <Select
            id={questionKey}
            value={currentAnswer}
            onChange={handleAnswerChange}
            disabled={isDisabled}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border border-gray-300 bg-white/5 py-1.5 pl-3 pr-10 text-sm text-gray-900",
              "focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600",
              "*:text-black ",
              isDisabled && "cursor-not-allowed opacity-50 bg-gray-200"
            )}
          >
            {Object.keys(scoreMapping).map((answer) => (
              <option key={answer} value={answer}>
                {answer}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 fill-gray-500"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
};

export default DropDownAnswer;