import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Confirm from "../../components/Vacation/NarrowColumn/Confirm/Confirm";
import {
  logVacation,
  saveEditVacation,
  selectedLeaveChange,
} from "../../toolkitSlice/vacationSlice";
import Modal from "../Modal/Modal";
import "./Form.scss";

const Form = ({ isModalView, elem, setActive }, ref) => {
  const defaultVacationData = {
    id: Date.now(),
    selectedLeave: "vacationLeave",
    start: "",
    end: "",
    comment: "",
    diffDays: 0,
    status: "Approved",
  };

  const stateLog = useSelector((state) => state.vacation.log);
  const [isCreating, setCreating] = useState();
  const [confirmType, setConfirmType] = useState("default");
  const [modalConfirmActive, setModalConfirmActive] = useState();
  const [vacationData, setVacationData] = useState({ ...defaultVacationData });
  const dispatch = useDispatch();

  const changeSelectedLeave = (value) => {
    if (!isModalView) {
      dispatch(selectedLeaveChange(value));
    }
  };

  const findSamePeriod = (elem) => {
    return !!stateLog.find((e) => e.start === elem.start && e.end === elem.end);
  };

  const findHolidays = (elem) => {
    let diff = getDiffDays(elem.start, elem.end);
    let weekEndDays = 0;
    const prevDay = new Date(elem.end);

    for (let i = 0; i < diff; i++) {
      const endDay = prevDay.getDay();
      if (endDay === 6 || endDay === 0) {
        weekEndDays += 1;
      }
      prevDay.setDate(prevDay.getDate() - 1);
    }
    return weekEndDays === diff;
  };

  const validateVacation = () => {
    const twoWeeksBefore = getDiffDays(new Date(), vacationData.start);
    const shorterVacation = getDiffDays(vacationData.start, vacationData.end);

    setConfirmType("default");

    if (findSamePeriod(vacationData)) {
      setConfirmType("samePeriod");
    } else if (twoWeeksBefore < 14) {
      setConfirmType("twoWeeksBefore");
    } else if (
      shorterVacation > 14 &&
      vacationData.selectedLeave !== "sickLeave"
    ) {
      setConfirmType("shorterVacation");
    } else if (findHolidays(vacationData)) {
      setConfirmType("onlyHolidays");
    }

    setCreating(true);
    setModalConfirmActive(true);
  };

  const saveVacation = () => {
    const changedVacationData = {
      ...vacationData,
      changeStatus: "Created",
      changedDate: getDateString(new Date()),
    };

    dispatch(logVacation(changedVacationData));

    setVacationData({
      ...defaultVacationData,
      id: Date.now(),
      selectedLeave: vacationData.selectedLeave,
    });
  };

  useEffect(() => {
    if (elem) {
      setVacationData({
        ...elem,
        start: elem.start,
        end: elem.end,
        diffDays: elem.diffDays,
      });
    }
  }, [elem]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useImperativeHandle(
    ref,
    () => ({
      openModal() {
        setCreating(false);
        setModalConfirmActive(true);
      },
    }),
    []
  );

  const editVacation = () => {
    const editVacationData = {
      ...vacationData,
      changeStatus: "Changed",
      changedDate: getDateString(new Date()),
    };
    setActive(false);
    dispatch(saveEditVacation(editVacationData));
  };

  return (
    <form id="data" onSubmit={handleSubmit(validateVacation)}>
      <select
        name="new-request"
        value={vacationData.selectedLeave}
        onChange={(event) => {
          setVacationData({
            ...vacationData,
            selectedLeave: event.target.value,
          });
          changeSelectedLeave(event.target.value);
        }}>
        <option value="vacationLeave">Vacation leave</option>
        <option value="sickLeave">Sick leave</option>
        <option value="ownExpenseLeave">Own expense leave</option>
      </select>
      {sickLeaveAddition(vacationData.selectedLeave)}
      <div className="all-request-sections">
        <div className="new-request-section">
          <div className="subtitle">
            Start Date
            <div className="addition">(inclusive)</div>
          </div>
          <div className={errors.start ? "error-input date" : "date"}>
            <input
              type="date"
              required
              {...register("start", {
                validate: (v) => getDiffDays(new Date(), v) >= 0,
              })}
              value={vacationData.start}
              onChange={(event) => {
                setVacationData({
                  ...vacationData,
                  start: event.target.value,
                  diffDays:
                    getDiffDays(event.target.value, vacationData.end) + 1,
                });
              }}
            />
          </div>
          {errors.start && <p className="error">Incorrect date </p>}
        </div>
        <div className="new-request-section">
          <div className="subtitle">
            End Date
            <div className="addition">(inclusive)</div>
          </div>
          <div className={errors.end ? "error-input date" : "date"}>
            <input
              type="date"
              required
              {...register("end", {
                validate: (v) =>
                  getDiffDays(vacationData.start, v) >= 0 &&
                  getDiffDays(new Date(), v) >= 0,
              })}
              value={vacationData.end}
              onChange={(event) => {
                setVacationData({
                  ...vacationData,
                  end: event.target.value,
                  diffDays:
                    getDiffDays(vacationData.start, event.target.value) + 1,
                });
              }}
            />
          </div>
          {errors.end && <p className="error">Incorrect date </p>}
        </div>
        <div className="new-section-days">
          <div className="subtitle">
            Day(s)
            <img
              className="help"
              src="assets/question.svg"
              alt="icon: question"
            />
            <div className="tooltip">
              <div>The days calculated here are calendar days:</div>
              <strong>Calendar days = Work days + Weekends</strong>
              <div>
                Number of days can be adjusted by Personnel Officer (Katsiaryna
                Barysik) in accordance with the current legislation.
              </div>
            </div>
          </div>
          <input
            type="text"
            value={calculateDiffDays(vacationData.start, vacationData.end)}
            disabled
          />
        </div>
      </div>
      <div className="new-section-comment">
        <div className="subtitle">Comment</div>
        <textarea
          type="text"
          name="comment"
          className="comment"
          value={vacationData.comment}
          onChange={(event) => {
            setVacationData({
              ...vacationData,
              comment: event.target.value,
            });
          }}
        />
      </div>
      <Modal active={modalConfirmActive}>
        <Confirm
          elem={vacationData}
          confirmType={confirmType}
          setConfirm={setModalConfirmActive}
          isCreating={isCreating}
          saveConfirm={saveVacation}
          editConfirm={editVacation}></Confirm>
      </Modal>
    </form>
  );
};

export function getDateString(data) {
  const date = new Date(data);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("en-EN", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return `${day} ${month} ${year}`;
}

const sickLeaveAddition = (props) => {
  if (props === "sickLeave") {
    return (
      <div className="SickLeaveAddition">
        <strong> Important: </strong>
        Please bring the official confirmation of your sick leave from a medical
        establishment to Personnel Officer (Katsiaryna Barysik) as soon as you
        get it.
      </div>
    );
  }
};

const calculateDiffDays = (start, end) => {
  const diffDays = getDiffDays(start, end) + (start && end ? 1 : 0);

  if (diffDays < 0) {
    return 0;
  }
  return diffDays;
};

const getDiffDays = (start, end) => {
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } else {
    return 0;
  }
};

export default forwardRef(Form);
