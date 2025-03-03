"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useRouter } from "next/navigation";
import SingleAssessment from './SingleAssessment';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import NavBar from '../../utils/NavBar';

const Home = ({ currentUserId }) => {
  const { state, dispatch } = useUser();
  const router = useRouter();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inProgressAssmts, setInProgressAssmts] = useState([]);
  const [inReviewAssmts, setInReviewAssmts] = useState([]);
  const [completeAssmts, setCompleteAssmts] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  useEffect(() => {
    const fetchAssessments = async () => {
      if (!currentUserId) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/assessments`, {
          params: { userId: currentUserId },
        });
        setAssessments(data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  useEffect(() => {
    dispatch({
      type: "CLEAR_ASSESSMENT_INFO"
    });
    dispatch({
      type: "CLEAR_ANSWERS"
    });
    dispatch({
      type: "CLEAR_RESULTSTORE"
    });
  }, [])

  useEffect(() => {
    if (assessments.length > 0) {
      setInProgressAssmts(assessments.filter((assessment) => assessment.status === 'In Progress'));
      setInReviewAssmts(assessments.filter((assessment) => assessment.status === 'In Review'));
      setCompleteAssmts(assessments.filter((assessment) => assessment.status === 'Complete'));
    }
  }, [assessments]);

  useEffect(() => {
    const getEmployeeInfo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/info/${currentUserId}`);
        setEmployeeInfo(response.data[0]);
      }
      catch {
        console.error("Error retrieving user info:", error);
        setError(error.response?.data?.message || "An error occurred");
      }

    }
    getEmployeeInfo();
  }, [])

  const createAndOpenAssessment = async (level) => {
    if (!currentUserId) return;
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/assessments`, {
        userId: currentUserId,
        level: level,
      });
      dispatch({ type: "SET_ASSESSMENT_INFO", 
        payload: { 
          "id": data.assessmentid, 
          "status": "In Progress",
          "firstname": employeeInfo.firstname,
          "lastname": employeeInfo.lastname,
          "level": level,
          "date":  formatDate(Date()),
          "role": employeeInfo.role
        }});
      router.push(`/assessment`);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteAssessment = async (assessmentId) => {
    const deletedAssessment = assessments.find(a => a.assessmentid === assessmentId);
    
    setAssessments((prev) => prev.filter((a) => a.assessmentid !== assessmentId));
    if (deletedAssessment.status === "In Progress") {
      setInProgressAssmts((prev) => prev.filter((a) => a.assessmentid !== assessmentId));
    } else if (deletedAssessment.status === "In Review") {
      setInReviewAssmts((prev) => prev.filter((a) => a.assessmentid !== assessmentId));
    } else if (deletedAssessment.status === "Complete") {
      setCompleteAssmts((prev) => prev.filter((a) => a.assessmentid !== assessmentId));
    }
  
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/assessments/${assessmentId}`);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
  
      setAssessments((prev) => [...prev, deletedAssessment]);
  
      if (deletedAssessment.status === "In Progress") {
        setInProgressAssmts((prev) => [...prev, deletedAssessment]);
      } else if (deletedAssessment.status === "In Review") {
        setInReviewAssmts((prev) => [...prev, deletedAssessment]);
      } else if (deletedAssessment.status === "Complete") {
        setCompleteAssmts((prev) => [...prev, deletedAssessment]);
      }
    }
  };
  

  const renderAssessmentsList = (title, assessmentsList) => {
    if (assessmentsList.length === 0) return null;
    return (
      <>
        <h2 className="text-lg font-semibold mt-6">{title}</h2>
        <ul role="list" className="divide-y divide-gray-100">
          {assessmentsList.map(({ assessmentid, status, level, firstname, lastname, date, role }) => (
            <SingleAssessment
              key={assessmentid}
              assessmentId={assessmentid}
              status={status}
              level={level}
              firstname={firstname}
              lastname={lastname}
              date={date}
              role={role}
              onDelete={handleDeleteAssessment}
            />
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
    <NavBar/>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="font-semibold text-gray-900 sm:text-5xl">
          {employeeInfo.individualcontributor
            ? `${employeeInfo.firstname} ${employeeInfo.lastname}'s Performance Evaluations`
            : "Performance Evaluations"}
        </h1>
        <p className="mt-2 text-gray-600">This is an app for PCC performance evaluations.</p>

        {state.userInfo?.individualContributor && (
          <Menu as="div" className="relative inline-block text-left mt-4">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                Create Assessment
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none transition-transform scale-95 opacity-0 data-[headlessui-state=open]:scale-100 data-[headlessui-state=open]:opacity-100">
              <div className="py-1">
                {["Intermediate", "Senior", "Principal"].map((level) => (
                  <MenuItem key={level}>
                    {({ active }) => (
                      <button
                        onClick={() => createAndOpenAssessment(level)}
                        className={`block w-full px-4 py-2 text-sm text-gray-700 text-left ${
                          active ? "bg-gray-100 text-gray-900" : ""
                        }`}
                      >
                        {level}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        )}

        {renderAssessmentsList("In Review", inReviewAssmts)}
        {renderAssessmentsList("In Progress", inProgressAssmts)}
        {renderAssessmentsList("Complete", completeAssmts)}
      </div>
    </>
  );
};

export default Home;
