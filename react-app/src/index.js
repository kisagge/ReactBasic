import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
function reducer(oldState, action) {
  if (oldState === undefined) {
    return {
      mode: "WELCOME",
      topics: [
        { id: 1, title: "html", body: "html is .." },
        { id: 2, title: "css", body: "css is .." },
      ],
      nextId: 3,
    };
  }
  const newState = { ...oldState };
  if (action.type === "CHANGE_MODE") {
    newState.mode = action.mode;
  } else if (action.type === "CHANGE_ID") {
    newState.id = action.id;
  } else if (action.type === "CREATE") {
    const newTopics = [...newState.topics];
    newTopics.push({
      id: newState.nextId,
      title: action.title,
      body: action.body,
    });
    newState.topics = newTopics;
  } else if (action.type === "UPDATE") {
    const newTopics = [...newState.topics];
    for (let i = 0; i < newTopics.length; i++) {
      let t = newTopics[i];
      if (t.id === action.id) {
        t.title = action.title;
        t.body = action.body;
      }
    }
    newState.topics = newTopics;
  } else if (action.type === "DELETE") {
    let newTopics = [];
    for (let i = 0; i < newState.topics.length; i++) {
      let t = newState.topics[i];
      if (t.id !== action.id) {
        newTopics.push(t);
      }
    }
    newState.topics = newTopics;
  } else if (action.type === "INCREASE_NEXT_ID") {
    newState.nextId++;
  }

  return newState;
}
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
