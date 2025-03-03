export const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (error) {
      console.error('Could not save state to local storage:', error);
    }
  };
  
  export const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Could not load state from local storage:', error);
      return undefined;
    }
  };
  