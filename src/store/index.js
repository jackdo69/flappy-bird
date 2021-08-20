import { configureStore } from '@reduxjs/toolkit';

import pipeReducer from './pipe';
import birdReducer from './bird';

const store = configureStore({
  reducer: {
    pipe: pipeReducer,
    bird: birdReducer,
  },
});

export default store;
