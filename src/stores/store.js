import {configureStore} from '@reduxjs/toolkit';
import taskReducer from '../Slice/taskSlice.js';

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        
    },
});

export default store;
