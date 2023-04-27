import React from "react";
import { Tabs, Tab } from "@mui/material";

const DepartmentTabs = ({ value, engineersData, handleChange }) => {
  const departments = ["Umbra", "Evastel", "Microsoft", "Ookla"];
  return (
    <Tabs value={value} onChange={handleChange}>
      {departments.map((department, index) => (
        <Tab
          key={index}
          label={`${department} (${
            engineersData[department]?.length ?? 0
          })`}
        />
      ))}
    </Tabs>
  );
};

export default DepartmentTabs;
