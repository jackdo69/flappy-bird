import { createSlice } from '@reduxjs/toolkit';

const initialBirdState = {
  top: 300,
  isFlying: false,
};

const birdSlice = createSlice({
  name: 'bird',
  initialState: initialBirdState,
  reducers: {
    fly(state, action) {
      if (state.top > 20) {
        state.top -= 25;
        state.isFlying = true;
      }
    },
    fall(state, action) {
      if (state.top < 530) {
        state.top += 6;
        state.isFlying = false;
      }
    },
    reset(state, _) {
      state.top = 300;
    },
  },
});

export const birdActions = birdSlice.actions;

export default birdSlice.reducer;
