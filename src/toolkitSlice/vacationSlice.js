import { createSlice } from "@reduxjs/toolkit";

const vacationsSlice = createSlice({
  name: "vacation",
  initialState: {
    vacationAvailable: 150,
    selectedLeave: "vacationLeave",
    isModalView: false,
    log: [
      {
        id: Date.now() + 1,
        selectedLeave: "vacationLeave",
        start: "2021-10-05",
        end: "2021-10-07",
        comment: "It's my next vacation",
        status: "Approved",
        diffDays: 3,
        changeStatus: "Created",
        creationDate: "2021-10-05",
        changedDate: "",
      },
      {
        id: Date.now() + 2,
        comment: "text",
        diffDays: 1,
        start: "2021-08-01",
        end: "2021-08-02",
        selectedLeave: "vacationLeave",
        status: "Approved",
        changeStatus: "Created",
        creationDate: "2021-07-25",
        changedDate: "",
      },
      {
        id: Date.now() + 3,
        selectedLeave: "ownExpenseLeave",
        start: "2019-09-05",
        end: "2019-09-06",
        comment: "It's my first vacation",
        status: "Approved",
        diffDays: 2,
        changeStatus: "Created",
        creationDate: "2019-09-01",
        changedDate: "",
      },
      {
        id: Date.now() + 4,
        selectedLeave: "sickLeave",
        start: "2020-09-04",
        end: "2020-09-08",
        comment: "It's my first vacation",
        status: "Approved",
        diffDays: 5,
        changeStatus: "Created",
        creationDate: "2020-09-03",
        changedDate: "",
      },
      {
        id: Date.now() + 5,
        selectedLeave: "sickLeave",
        start: "2016-09-01",
        end: "2016-09-06",
        comment: "It's my first vacation",
        status: "Approved",
        diffDays: 6,
        changeStatus: "Created",
        creationDate: "2016-09-01",
        changedDate: "",
      },
    ],
  },
  reducers: {
    logVacation(state, action) {
      state.vacationAvailable =
        state.vacationAvailable -
        (action.payload.selectedLeave === "sickLeave"
          ? 0
          : action.payload.diffDays);
      state.log.push(action.payload);
    },
    selectedLeaveChange(state, action) {
      state.selectedLeave = action.payload;
    },

    saveEditVacation(state, action) {
      state.log.forEach((e, index) => {
        if (e.id === action.payload.id) {
          state.vacationAvailable =
            state.vacationAvailable - getChangeDiffDays(e, action.payload);
          state.log[index] = action.payload;
        }
      });
    },
  },
});

const getChangeDiffDays = (previous, current) => {
  if (
    previous.selectedLeave === "sickLeave" &&
    current.selectedLeave !== "sickLeave"
  ) {
    return current.diffDays;
  } else if (
    previous.selectedLeave !== "sickLeave" &&
    current.selectedLeave === "sickLeave"
  ) {
    return previous.diffDays * -1;
  }
  return current.diffDays - previous.diffDays;
};

export default vacationsSlice.reducer;
export const { logVacation, selectedLeaveChange, saveEditVacation } =
  vacationsSlice.actions;
