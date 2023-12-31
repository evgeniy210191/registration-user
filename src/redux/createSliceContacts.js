import { createSlice } from '@reduxjs/toolkit';
import { initialStates } from './initialState';
import { addContact, delContact, getContact } from './thunc';

const hendleGetContactThuncFulfilled = (state, { payload }) => {
  return (state = payload);
};
const hendleAddContactThuncFulfilled = (state, { payload }) => {
  return [payload, ...state];
};

const hendleDeleteContactThuncFulfilled = (state, { payload }) => {
  return state.filter(({ id }) => id !== payload.id);
};

const hendleGetThuncRejected = (state, { payload }) => {
  console.log('contact/Getreject', payload);
  return state;
};

const hendleAddThuncRejected = (_, { payload }) => {
  console.log(console.log('contact/Addreject', payload));
};

const hendleDelThuncRejected = (_, { payload }) => {
  console.log(console.log('contact/delreject', payload));
};

export const contactSlise = createSlice({
  name: 'contacts',
  initialState: initialStates.contacts,
  extraReducers: builder => {
    builder
      .addCase(getContact.fulfilled, hendleGetContactThuncFulfilled)
      .addCase(addContact.fulfilled, hendleAddContactThuncFulfilled)
      .addCase(delContact.fulfilled, hendleDeleteContactThuncFulfilled)
      .addCase(getContact.rejected, hendleGetThuncRejected)
      .addCase(addContact.rejected, hendleAddThuncRejected)
      .addCase(delContact.rejected, hendleDelThuncRejected);
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStates.filter,
  reducers: {
    filtered: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { addNewContact, deleteContact } = contactSlise.actions;
export const { filtered } = filterSlice.actions;
