import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('adminToken') || null,
  username: localStorage.getItem('adminUsername') || '',
  isLoggedIn: !!localStorage.getItem('adminToken'),
};

const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem('adminToken', state.token);
      localStorage.setItem('adminUsername', state.email);
    },

    logout(state) {
      state.token = null;
      state.username = '';
      state.isLoggedIn = false;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUsername');
    },
  },
});

export const { login, logout } = authAdminSlice.actions;

export default authAdminSlice.reducer;
