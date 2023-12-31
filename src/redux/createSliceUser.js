import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialStates } from './initialState';
import { logIn, logOut, signUp, update } from './thunc';

const hendlePending = state => {
  state.isLoading = true;
};

const hendleUpdatePending = state => {
  state.isRerendung = true;
};

const hendleSignUpFulfilled = state => {
  state.isLoading = false;
};

const hendleLogInFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.isLoading = false;
  state.token = payload.token;
};

const hendleUpdateFulfilled = (state, { payload }) => {
  state.isRerendung = false;
  state.user = payload;
};
const hendleLogOutFulfilled = state => {
  state.user = { name: '', email: '' };
  state.token = null;
};
const hendleRejected = (state, action) => {
  state.isLoading = false;
  console.log('user', action);
};

export const usersOperation = createSlice({
  name: 'user',
  initialState: initialStates.users,
  extraReducers: builder => {
    builder
      .addCase(update.pending, hendleUpdatePending)
      .addCase(update.fulfilled, hendleUpdateFulfilled)
      .addCase(logOut.fulfilled, hendleLogOutFulfilled)
      .addCase(logIn.fulfilled, hendleLogInFulfilled)
      .addCase(signUp.fulfilled, hendleSignUpFulfilled)
      .addMatcher(isAnyOf(signUp.pending, logIn.pending), hendlePending)
      .addMatcher(
        isAnyOf(
          signUp.rejected,
          logIn.rejected,
          update.rejected,
          logOut.rejected
        ),
        hendleRejected
      );
  },
});
