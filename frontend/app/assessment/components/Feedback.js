"use client"
import React, { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';
import FeedbackForm from './FeedbackForm';
import axios from "axios";
import { useUser } from "../../context/UserContext";

const Feedback = () => {
    const { state } = useUser();
    const [feedbackList, setFeedbackList] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${state.assessmentInfo.id}`);
                setFeedbackList(response.data);
            } catch (error) {
                console.error("Error retrieving feedback:", error);
                setError(error.response?.data?.message || "An error occurred");
            }
        };

        getFeedback();
    }, [state.assessmentInfo.id]);

    console.log(feedbackList);

    const onDelete = async (feedbackId) => {
        const previousFeedbackList = [...feedbackList];
        setFeedbackList((prev) =>
            prev.filter((feedback) => feedback.feedbackId !== feedbackId)
          );
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${feedbackId}`);
        } catch (error) {
            console.error("Error deleting feedback:", error);
            setError(error.response?.data?.message || "An error occurred");
            setFeedbackList(previousFeedbackList);
        }
    };

    const onSubmit = async ({ file, preview }) => {
        const tempId = `temp-${Date.now()}`;
        const base64Data = preview ? preview.split(",")[1] : null;
        const newFeedback = {
            feedbackId: tempId,
            assessmentId: state.assessmentInfo.id,
            image: file
              ? { 
                  imageId: tempId,
                  mimetype: file.type,
                  data: base64Data
                }
              : null
          };
      
        setFeedbackList((prev) => [...prev, newFeedback]);

        const formData = new FormData();
        formData.append("assessmentId", state.assessmentInfo.id);
        if (file) {
          formData.append("file", file);
        }

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/`, 
            formData,
            { headers: { "Content-Type": "multipart/form-data" }}
          );
          console.log("Upload successful:", response.data);
          setFeedbackList((prev) =>
            prev.map((feedback) =>
              feedback.feedbackId === tempId ? response.data : feedback
            )
          );
        } catch (error) {
        setFeedbackList((prev) =>
            prev.filter((feedback) => feedback.feedbackId !== tempId)
            );
          console.error("Error submitting feedback:", error);
          setError(error.response?.data?.message || "An error occurred");
        }
      }

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-4 justify-start">
                {feedbackList.map((feedback) => (
                    <div key={feedback.feedbackId} className="flex-grow">
                        <FeedbackCard 
                            key={feedback.feedbackId}
                            feedbackId={feedback.feedbackId} 
                            imageData={feedback.image} 
                            onDelete={onDelete} 
                        />
                    </div>
                ))}
            </div>

            {state.assessmentInfo.status !== 'Complete' &&
                <div className="mt-6">
                    <FeedbackForm handleSubmit={onSubmit} />
                </div>
            }
        </div>
    );
}

export default Feedback;