import { configureStore } from '@reduxjs/toolkit';

import pipeReducer from './pipe';
import birdReducer from './bird';
import gameReducer from './game';

const store = configureStore({
  reducer: {
    pipe: pipeReducer,
    bird: birdReducer,
    game: gameReducer,
  },
});

export default store;
