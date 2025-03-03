"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useUser } from '../../context/UserContext';

const SingleAssessment = ({ assessmentId, status, level, firstname, lastname, date, role, onDelete }) => {

  const { state, dispatch } = useUser()
  const openButtonActivated = (state.userInfo.individualContributor === false && 
    (status === 'In Review' || status === 'Complete')) 
  || (state.userInfo.individualContributor === true && status === 'In Progress')
  const deleteButtonActivated = (state.userInfo.individualContributor === true && status === 'In Progress')
  || (state.userInfo.individualContributor === false && status === 'In Review')
  
  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openAssessment = () => {
    dispatch({ type: "SET_ASSESSMENT_INFO", 
      payload: { 
        "id": assessmentId, 
        "status": status,
        "firstname": firstname,
        "lastname": lastname,
        "level": level,
        "date":  formatDate(date),
        "role": role
      }});
    router.push(`/assessment`);
  }

  return (
    <li key={assessmentId} className="flex items-center justify-between gap-x-6 p-4 rounded-lg">
      {/* Left Section: Name & Status */}
      <div className="flex min-w-0 items-center gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold text-gray-900 flex items-center gap-x-2">
            {firstname} {lastname}'s {level} Performance Evaluation
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
              {status}
            </span>
          </p>
          <p className="mt-1 truncate text-xs text-gray-500">Created on {formatDate(date)}</p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-x-3">
        { openButtonActivated &&
          <button onClick={openAssessment} className="btn btn-sm">
            Open
          </button>
        }
        { deleteButtonActivated && 
          <button onClick={() => onDelete(assessmentId)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        }
      </div>
    </li>

  );
};

export default SingleAssessment;
