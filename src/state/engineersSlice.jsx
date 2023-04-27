import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const engineers = [
  {
    name: "John Smith",
    phone: "555-1234",
    gender: "Male",
    age: 28,
    department: "Umbra",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      followers: 160,
      following: 82,
      location: "paris",
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project A", rank: 5 },
      { name: "Project B", rank: 3 },
      { name: "Project C", rank: 8 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 80 },
      { data: "02/03/2023", kpi: 95 },
      { data: "02/04/2023", kpi: 110 },
    ],
  },
  {
    name: "Jane Doe",
    phone: "555-5678",
    gender: "Female",
    age: 35,
    department: "Umbra",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      followers: 160,
      following: 82,
      location: "paris",
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project X", rank: 7 },
      { name: "Project Y", rank: 9 },
      { name: "Project Z", rank: 4 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 85 },
      { data: "02/03/2023", kpi: 90 },
      { data: "02/04/2023", kpi: 100 },
    ],
  },
  {
    name: "Alex Johnson",
    phone: "555-2345",
    gender: "Male",
    age: 42,
    department: "Microsoft",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      followers: 160,
      following: 82,
      location: "paris",
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project D", rank: 6 },
      { name: "Project E", rank: 2 },
      { name: "Project F", rank: 9 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 75 },
      { data: "02/03/2023", kpi: 85 },
      { data: "02/04/2023", kpi: 95 },
    ],
  },
  {
    name: "Emily Brown",
    phone: "555-3456",
    gender: "Female",
    age: 31,
    department: "Evastel",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      following: 82,
      location: "paris",
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project G", rank: 8 },
      { name: "Project H", rank: 4 },
      { name: "Project I", rank: 7 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 90 },
      { data: "02/03/2023", kpi: 100 },
      { data: "02/04/2023", kpi: 110 },
    ],
  },
  {
    name: "James Lee",
    phone: "555-4567",
    gender: "Male",
    age: 37,
    department: "Evastel",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      followers: 160,
      location: "paris",
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project J", rank: 9 },
      { name: "Project K", rank: 3 },
      { name: "Project L", rank: 6 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 90 },
      { data: "02/03/2023", kpi: 100 },
      { data: "02/04/2023", kpi: 110 },
    ],
  },
  {
    name: "Samantha Green",
    phone: "555-5678",
    gender: "Female",
    age: 29,
    department: "Evastel",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      location: "paris",
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project M", rank: 8 },
      { name: "Project N", rank: 5 },
      { name: "Project O", rank: 7 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 90 },
      { data: "02/03/2023", kpi: 100 },
      { data: "02/04/2023", kpi: 110 },
    ],
  },
  {
    name: "Jade Bark",
    phone: "555-5678",
    gender: "Female",
    age: 29,
    department: "Microsoft",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      followers: 160,
      following: 82,
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project M", rank: 8 },
      { name: "Project N", rank: 5 },
      { name: "Project O", rank: 7 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 90 },
      { data: "02/03/2023", kpi: 100 },
      { data: "02/04/2023", kpi: 110 },
    ],
  },
  {
    name: "Saly Kyle",
    phone: "555-5678",
    gender: "Female",
    age: 29,
    department: "Ookla",
    github: {
      username: "jadeb",
      url: "https://github.com/samanthag",
      followers: 160,
      following: 82,
      lastcontributions: 1180,
    },
    projects: [
      { name: "Project M", rank: 8 },
      { name: "Project N", rank: 5 },
      { name: "Project O", rank: 7 },
    ],
    timeline: [
      { data: "02/02/2023", kpi: 90 },
      { data: "02/03/2023", kpi: 100 },
      { data: "02/04/2023", kpi: 110 },
    ],
  },
]

export const fetchEngineersData = createAsyncThunk(
  "engineers/fetchEngineersData",
  async () => {
    return engineers;
  }
);

const engineersSlice = createSlice({
  name: "engineers",
  initialState: { Umbra: [], Evastel: [], Microsoft: [], Ookla: [] },
  reducers: {},
  extraReducers: {
    [fetchEngineersData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEngineersData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const engineersToAdd = action.payload.filter((engineer) => {
        return !state[engineer.department].some((existingEngineer) => existingEngineer.id === engineer.id);
      });
      engineersToAdd.forEach((engineer) => {
        state[engineer.department].push(engineer);
      });
    },
    [fetchEngineersData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  }

});

export default engineersSlice.reducer;
