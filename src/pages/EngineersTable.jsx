import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";
import { fetchEngineersData } from './../state/engineersSlice';
import DepartmentTabs from "./../components/DepartmentTabs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const engineersData = useSelector(state => state.engineers);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      setIsLoading(true);
      await dispatch(fetchEngineersData());
      setIsLoading(false);
    };
    fetchEngineers();
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderEngineerRows = (engineers) => (
    engineers.map((engineer, index) => (
      <TableRow key={index}>
        <TableCell>
          <Link to={`/analytics/${engineer.name.replace(/ /g, '_')}`} state={{ engineerData: engineer }}>
          {engineer.name}
          </Link>
        </TableCell>
        <TableCell>{engineer.phone}</TableCell>
        <TableCell>{engineer.gender}</TableCell>
        <TableCell>{engineer.age}</TableCell>
      </TableRow>
    ))
  ); 

  const departmentEngineers = engineersData?.[["Umbra", "Evastel", "Microsoft", "Ookla"][value]] || [];

  return (
    <div>
      <DepartmentTabs
        value={value}
        engineersData={engineersData}
        handleChange={handleChange}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderEngineerRows(departmentEngineers)}</TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Index;
