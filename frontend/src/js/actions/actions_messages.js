import WebService from "../../services/WebService";
import AppActions from "../constants/AppActions";
import {
  GET_CONVERSATION,
  POST_MESSAGE,
  // STUDENT_RESUME_FILEPATH
} from "./types";
import axios from "axios";
// import { history } from "../router/history";

const backend ="http://localhost:3001";

export function fetchConversations(payload) {
  console.log("In avtion fetchConversations", payload);
  return async (dispatch) => {
    function onSuccess(success) {
      dispatch({ type: GET_CONVERSATION, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: GET_CONVERSATION, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/message-mongo/getConversations",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function postMessage(payload) {
  console.log("In avtion postMessage", payload.userEmail);
  return async (dispatch) => {
    function onSuccess(success) {
      dispatch({ type: POST_MESSAGE, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: POST_MESSAGE, payload: error });
      return error;
    }
    try {
      var res = await axios.post(
        backend + "/message-mongo/postMessage",
        payload
      );
      if (res) {
        console.log("First res is", res);
        await axios
          .post(backend + "/message-mongo/getConversations", payload.userEmail)
          .then((res2) => {
            console.log("Second res is", res2);
            return onSuccess(res2);
          });
      }
    } catch (error) {
      return onError("error");
    }
  };
}