import getAllData from "./launcherApi";

import { combineReducers } from "redux";

const reducers = combineReducers(
    {
        getAllData
    }
);

export default reducers;