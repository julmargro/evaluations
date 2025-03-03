"use client";
import React from "react";
import { useUser } from "../../context/UserContext";

const ResultRow = ({ category }) => {
  const { state } = useUser();
  const resultStore = state.resultStore || {};

  const levels = ["category", "Intermediate", "Senior", "Principal"];

  const getAverage = (cat, level) => {
    if (!resultStore[cat] || !resultStore[cat][level]) return "N/A";
    const { total = 0, count = 1 } = resultStore[cat][level];
    return count > 0 ? (total / count).toFixed(2) : "N/A";
  };

  const getCellColor = (score) => {
    if (score === "N/A") return "bg-gray-100 text-gray-800";
    const numericScore = parseFloat(score);
    if (numericScore >= 2) return "bg-green-100 text-green-800";
    if (numericScore >= 1) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <tr>
      <th scope="row" className="px-4 py-2 font-medium text-left text-gray-900">
        {category}
      </th>
      {levels.map((level) => {
        const avgScore = getAverage(category, level);
        return (
          <td
            key={level}
            className={`px-4 py-2 font-semibold text-center ${getCellColor(avgScore)}`}>
            {avgScore}
          </td>
        );
      })}
    </tr>
  );
};

export default ResultRow;
