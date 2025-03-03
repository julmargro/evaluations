"use client";
import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Questions from "./Questions";
import clsx from "clsx";

const Category = ({ presentationEnabled, categoryName }) => {
  const tabNames = ["Questions", "Comments"];

  return (
    <div className="flex-grow-1 p-3">
      <h2 className="text-lg font-semibold mt-6">{categoryName}</h2>
      <Questions presentationEnabled={presentationEnabled} categoryName={categoryName} />
{/* 
      <TabGroup>
        <TabList className="flex border-b border-gray-300">
            {tabNames.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  clsx(
                    "w-1/2 py-2 px-4 text-sm font-medium text-gray-700 border-b-2 transition",
                    selected
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent hover:border-gray-300 hover:text-gray-900"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </TabList>

        <TabPanels className="mt-4">
          <TabPanel>
            <Questions presentationEnabled={presentationEnabled} categoryName={categoryName} />
          </TabPanel>
          <TabPanel>
            <p>Comments section coming soon!</p>
          </TabPanel>
        </TabPanels>
      </TabGroup> */}
    </div>
  );
};

export default Category;
