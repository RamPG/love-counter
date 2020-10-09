import React, { useContext } from 'react';

export const FirestoreContext = React.createContext();

export function useFirestoreContext() {
  return useContext(FirestoreContext);
}
