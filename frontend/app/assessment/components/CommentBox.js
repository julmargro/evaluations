"use client";

import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const CommentBox = ({ questionKey, onNewComment }) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useUser();

  const handleClick = () => {
    onNewComment(commentText);
    setCommentText("");
  }

  return (
    <div key={questionKey} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mt-2">
        <textarea
          id="comment"
          rows="4"
          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={loading}
        ></textarea>
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          onClick={handleClick}
          disabled={loading || commentText.trim() === ""}
        >
          {loading ? "Submitting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
