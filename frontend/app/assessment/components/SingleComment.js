"use client";
import React from "react";
import { useUser } from "../../context/UserContext";

const SingleComment = ({ commentId, userId, text, onDelete, onEdit }) => {
  const { state } = useUser();
  const deleteActive = state.userInfo.userId === userId || state.userInfo.individualContributor === false;

  return (
    <div key={commentId} className="w-full py-3">
      {/* Comment Container */}
      <div className="flex items-start">
        <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
          {/* Comment Text */}
          <p className="text-sm text-gray-700">{text}</p>

          {/* Action Buttons */}
          <div className="mt-2 flex justify-end space-x-2 text-sm text-gray-500">
            <button className="hover:underline">Edit</button>
            {deleteActive && (
              <>
                <span>·</span>
                <button onClick={() => onDelete(commentId)} className="hover:underline text-red-600">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
