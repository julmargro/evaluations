"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useRouter } from "next/navigation";
import SingleEmployee from './SingleEmployee';
import NavBar from '../../utils/NavBar';

const EmployeeDirectory = () => {
  const { state, dispatch } = useUser();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!state.userInfo?.userId) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees`, {
          params: { userId: state.userInfo.userId },
        });
        setEmployees(data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [state.userInfo?.userId]);

  useEffect(() => {
    dispatch({ type: "CLEAR_EMPLOYEE_INFO" });
  }, [])

  return (
    <>
    <NavBar/>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="font-semibold text-gray-900 sm:text-3xl">Employees</h1>

        <ul role="list" className="divide-y divide-gray-100">
          {employees.map(({ userid, firstname, lastname, managerfirstname, managerlastname }) => (
            <SingleEmployee
              key={userid}
              userid={userid}
              firstname={firstname}
              lastname={lastname}
              managerfirstname={managerfirstname}
              managerlastname={managerlastname}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default EmployeeDirectory;
