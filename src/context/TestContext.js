import React, { createContext, useState, useContext } from "react";

const TestContext = createContext();

export const useTest = () => useContext(TestContext);

export const TestProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    employeeCode: "",
    testDate: new Date(),
    photo: null,
    photoUrl: null,
  });

  const [testData, setTestData] = useState({
    score: 0,
    totalAttempts: 3,
    attempts: [], // [{ hazard, nearestExit, selectedExit, points }]
  });

  const updateEmployeeData = (data) => {
    setEmployeeData({ ...employeeData, ...data });
  };

  const addAttempt = (attempt) => {
    setTestData((prev) => {
      const updatedAttempts = [...prev.attempts, attempt];
      const updatedScore = prev.score + attempt.points;
      return {
        ...prev,
        attempts: updatedAttempts,
        score: updatedScore,
      };
    });
  };

  const resetTest = () => {
    setTestData({
      score: 0,
      totalAttempts: 3,
      attempts: [],
    });
  };

  return (
    <TestContext.Provider
      value={{
        employeeData,
        updateEmployeeData,
        testData,
        addAttempt,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
