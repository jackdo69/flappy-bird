import { createSlice } from '@reduxjs/toolkit';

const initialPipeState = {
  difficulty: 4,
  pipes: [],
};

const pipeSlice = createSlice({
  name: 'pipe',
  initialState: initialPipeState,
  reducers: {
    addPipe(state, action) {
      state.pipes.push(action.payload);
    },
    shiftPipes(state, _) {
      if (state.pipes && state.pipes.length) {
        for (let pipe of state.pipes) {
          pipe.left -= state.difficulty;
        }

        if (state.pipes[0].left <= 0) {
          state.pipes.shift();
        }
      }
    },
    clearPipes(state, _) {
      state.pipes = [];
    },
    increaseDifficulty(state, _) {
      state.difficulty++;
    },
    resetDifficulty(state, _) {
      state.difficulty = 2;
    },
  },
});

export const pipeActions = pipeSlice.actions;

export default pipeSlice.reducer;
