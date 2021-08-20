import { createSlice } from '@reduxjs/toolkit';

const initialBirdState = {
  top: 300,
};

const birdSlice = createSlice({
  name: 'bird',
  initialState: initialBirdState,
  reducers: {
    fly(state, action) {
      state.top -= 30;
    },
    fall(state, action) {
      if (state.top < 530) {
        state.top += 5;
      }
    },
  },
});

export const birdActions = birdSlice.actions;

export default birdSlice.reducer;
