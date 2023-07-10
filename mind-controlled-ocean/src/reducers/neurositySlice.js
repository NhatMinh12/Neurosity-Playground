import { createSlice } from '@reduxjs/toolkit';

export const neurositySlice = createSlice({
  name: 'neurosity',
  initialState: {
    deviceId: null,
    device: null,
    user: null,
    status: null,
  },
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
})

export const { setDeviceId, setDevice, setUser, setStatus } = neurositySlice.actions;

export const selectDeviceId = (state) => state.neurosity.deviceId;
export const selectDevice = (state) => state.neurosity.device;
export const selectUser = (state) => state.neurosity.user;
export const selectStatus = (state) => state.neurosity.status;

export default neurositySlice.reducer;