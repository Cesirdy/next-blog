import { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const init = useEffect(()=>{
    const root = window.document.documentElement;
    if (localStorage.theme == 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches){
      localStorage.setItem('theme', 'dark');
      root.classList.remove('undefined');
      root.classList.add('dark');
    }else if(localStorage.theme == 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches){
      localStorage.setItem('theme', 'light');
      root.classList.remove('undefined');
      root.classList.add('light');
    }
  })

  return [colorTheme, setTheme, init];
}

export default useDarkMode;