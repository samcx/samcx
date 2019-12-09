/**
 * global window, document
 * credits: pacocoursey
 */ 

const isServer = typeof window === 'undefined';

export function getDarkMode() {
  if (!isServer) {
    return window.isDark;
  }
  return false;
}

export function toggleDarkMode() {
  const isDark = getDarkMode();

  if (!isDark) {
    try {
      window.localStorage.setItem('dark-mode', 'Activated!');
      document.documentElement.setAttribute('data-theme', 'dark');
      window.isDark = true;
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      window.localStorage.removeItem('dark-mode');
      document.documentElement.removeAttribute('data-theme', 'light');
      window.isDark = false;
    } catch (err) {
      console.error(err);
    }
  }
}
