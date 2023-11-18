// redux-localstorage.js


export const saveStateToLocalStorage = (name,state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (error) {
    console.error('LocalStorage kaydetme hatası:', error);
  }
};

export const loadStateFromLocalStorage = (name) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('LocalStorage yükleme hatası:', error);
    return undefined;
  }
};

export const clearStateFromLocalStorage = (name) => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error('LocalStorage temizleme hatası:', error);
  }
};
