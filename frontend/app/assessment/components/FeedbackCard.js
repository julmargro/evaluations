"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";

const FeedbackCard = ({ feedbackId, imageData, onDelete }) => {
    const { state } = useUser();
    const buttonsActive = state.assessmentInfo.status !== 'Complete';
    const [imgSize, setImgSize] = useState(null);

    useEffect(() => {
        if (imageData) {
            const img = new Image();
            img.src = `data:${imageData.mimetype};base64,${imageData.data}`;
            img.onload = () => {
                setImgSize({ width: img.naturalWidth, height: img.naturalHeight });
            };
        }
    }, [imageData]);

    return (
        <div 
            className="card bg-base-100 shadow-md rounded-lg overflow-hidden"
            style={{
                width: imgSize?.width || "auto",
                height: "auto",
            }}
        >
            {/* Image should take up most of the space */}
            {imageData && (
                <figure className="flex">
                    <img
                        src={`data:${imageData.mimetype};base64,${imageData.data}`}
                        alt="Feedback Screenshot"
                        className="w-full object-contain rounded-t-lg"
                        style={{
                            maxHeight: "400px",
                            objectFit: "cover"
                        }}
                    />
                </figure>
            )}
            
            <div className="p-2">
                {buttonsActive && (
                    <div className="mt-2 flex justify-end space-x-2 text-xs text-gray-500">
                        <button className="hover:underline">Edit</button>
                        <span>·</span>
                        <button onClick={() => onDelete(feedbackId)} className="hover:underline text-red-600">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackCard;