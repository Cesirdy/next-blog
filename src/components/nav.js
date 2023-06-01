import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);

  // Detect user's OS color preference and store it in localStorage on the first visit
  useEffect(() => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (userPrefersDark) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
    setShowPrompt(true);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="layout border-b items-center text-center lg:text-lg xl:text-xl top-0 sticky backdrop-blur z-50 bg-white/60 dark:bg-[#121212]/60 flex flex-nowrap justify-center transition-all">
      {router.asPath != '/' && router.asPath != '/#' && (
        <Link
          href={`/`}
          className="xl:left-0 xl:absolute inline-block -mb-px p-4 border-b hover:border-blue-600 hover:dark:border-blue-500 transition-all"
        >
          主页
        </Link>
      )}
      {process.env.nav.map(({ id, title }) => (
        <Link
          href={`/pages/${id}`}
          key={id}
          className={`${'inline-block -mb-px p-4 border-b hover:border-blue-600 hover:dark:border-blue-500 transition-all'} ${
            router.asPath === `/pages/${id}` ? 'text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500' : ''
          }`}
        >
          {title}
        </Link>
      ))}
      <a
        className={`${showPrompt && theme === 'light' ? 'text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500' : ''} ${"cursor-pointer xl:right-0 xl:absolute -mb-px p-4 border-b hover:border-blue-600 hover:dark:border-blue-500 transition-all"}`}
        onClick={handleThemeToggle}
      >
        <span>灯泡</span>
      </a>
    </div>
  );
}
