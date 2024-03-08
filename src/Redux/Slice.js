import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        loggedInUser: [],
        groupChat: [],
        Upload: [],
        sharedFiles: []
    },

    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
        setGroupChat: (state, action) => {
            state.groupChat = action.payload;
        },
        setUpload: (state, action) => {
            state.Upload = action.payload;
        },
        setSharedFiles: (state, action) => {
            state.sharedFiles = action.payload;
        },
    },
});

export const { setUserData, setLoggedInUser, setGroupChat, setUpload, setSharedFiles } = userSlice.actions;
export default userSlice.reducer;