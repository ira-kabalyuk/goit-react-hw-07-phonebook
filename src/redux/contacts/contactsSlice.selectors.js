import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.contacts.items;
export const selectContactsStatus = state => state.contacts.contacts.status;
export const selectContactsFilter = state => state.contacts.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectContactsFilter],
  (contacts, filter) => {
     return contacts?.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  )}
);
