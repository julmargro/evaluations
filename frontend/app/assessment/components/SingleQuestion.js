"use client";
import React from "react";
import DropDownAnswer from "./DropDownAnswer";
import { useUser } from '../../context/UserContext';
import DisplayedComments from "./DisplayedComments";

const SingleQuestion = ({ questionKey, text, level, relatedPEOCapabilities = "", relatedPEOBehaviours = "", presentationEnabled }) => {
  const { state } = useUser();
  return (
    <li className="flex flex-col gap-y-4 p-4">
      {/* Question Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-6 w-full">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{text}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-md bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-300">
              {level}
            </span>
            {relatedPEOCapabilities.length > 0 && (
              <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-blue-300">
                {relatedPEOCapabilities}
              </span>
            )}
            {relatedPEOBehaviours.length > 0 && (
              <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-600 ring-1 ring-green-300">
                {relatedPEOBehaviours}
              </span>
            )}
          </div>
        </div>

        {/* Dropdown & Comments Section */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto flex-shrink-0">
          <DropDownAnswer questionKey={questionKey} />
        </div>
      </div>
      <DisplayedComments presentationEnabled={presentationEnabled} questionKey={questionKey} />
    </li>
  );
};

export default SingleQuestion;
