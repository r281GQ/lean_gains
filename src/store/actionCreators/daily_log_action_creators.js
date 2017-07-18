import axios from "axios";
const SIGNUP = "http://localhost:4000/api/dailylogs";
import {
  WRITE_DAILY_LOG,
  WRITE_DAILY_LOGS,
  WRITE_DAILY_LOG_DATES
} from "./../actions/daily_log_actions";

const createLog = dailyLog => (dispatch, getState) => {
  axios
    .post(SIGNUP, dailyLog)
    .then(response => {
      dispatch({ type: WRITE_DAILY_LOG, payload: response.data });
      return axios
        .get("http://localhost:4000/api/dailylogs");
    })
    .then(response => {
      dispatch({ type: WRITE_DAILY_LOGS, payload: response.data });
      return axios
        .get("http://localhost:4000/api/dailylogs/dates");
    })
    .then(response => {
      dispatch({ type: WRITE_DAILY_LOG_DATES, payload: response.data });
    })
    .catch(error => {});
  console.log(dailyLog);
};

const getLogsForSelectedMonth = month => (dispatch, getState) => {
  axios
    .get("http://localhost:4000/api/dailylogs")
    .then(response => {
      dispatch({ type: WRITE_DAILY_LOGS, payload: response.data });
    })
    .catch(error => {});
};

const getDailyLogDates = () => (dispatch, getState) => {
  axios
    .get("http://localhost:4000/api/dailylogs/dates")
    .then(response => {
      console.log(response.data);
      dispatch({ type: WRITE_DAILY_LOG_DATES, payload: response.data });
    })
    .catch(error => {});
};

const updateDailyLog = dailyLog => dispatch => {}

const deleteDailyLog = dailyLog => dispatch => {}

export { createLog, getLogsForSelectedMonth, getDailyLogDates, updateDailyLog, deleteDailyLog };
