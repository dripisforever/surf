export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('viewsly', serializedState);
  } catch (err) {
    // die
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('viewsly');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);

  } catch (err) {
    return undefined;
  }
};
