import { createSlice } from '@reduxjs/toolkit';

const initialPipeState = {
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
          pipe.left -= 2;
        }

        if (state.pipes[0].left <= 0) {
          state.pipes.shift();
        }
      }
    },
    clearPipes(state, _) {
      state.pipes = [];
    },
  },
});

export const pipeActions = pipeSlice.actions;

export default pipeSlice.reducer;
