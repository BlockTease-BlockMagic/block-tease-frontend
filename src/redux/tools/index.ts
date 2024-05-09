import { createSlice } from '@reduxjs/toolkit';
interface activeStateInitialsType {
  value: number;
}
const activeStateInitials: activeStateInitialsType = {
  value: 1,
};
const activeState = createSlice({
  name: 'activeState',
  initialState: activeStateInitials,
  reducers: {
    toggleState: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { toggleState } = activeState.actions;
export default activeState;
