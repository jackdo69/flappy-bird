import { createSlice } from '@reduxjs/toolkit';

const initialGameState = {
  status: 'IDLE',
  highestScore: 0,
  currentScore: 0,
  scoreId: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    increaseCurrentScore(state, action) {
      state.currentScore += action.payload;
    },
    setHighestScore(state, action) {
      if (state.highestScore < action.payload) {
        state.highestScore = action.payload;
      }
    },
    resetScore(state, _) {
      state.currentScore = 0;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
