import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <div className="layout border-b items-center text-center lg:text-lg xl:text-xl top-0 sticky backdrop-blur z-50 bg-white/60 dark:bg-[#121212]/60 translate-x-0 flex flex-nowrap justify-center transition-all">
      {router.asPath != '/' && router.asPath != '/#' && (
        <Link href={`/`} prefetch={false} className='xl:left-0 xl:absolute inline-block -mb-px p-4 border-b hover:border-blue-600 hover:dark:border-blue-500 transition-all'>
          主页
        </Link>
      )}
      {process.env.nav.map(({ id, title }) => (
        <Link href={`/pages/${id}`} prefetch={false} key={id} className={`${'inline-block -mb-px p-4 border-b hover:border-blue-600 hover:dark:border-blue-500 transition-all'} ${router.asPath === `/pages/${id}` ? 'text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500' : ''}`}>
          {title}
        </Link>
      ))}
      <a
        className='cursor-pointer xl:right-0 xl:absolute -mb-px p-4 border-b hover:border-blue-600 hover:dark:border-blue-500 transition-all' 
        onClick={theme === "dark" ? (() => setTheme("light")):(() => setTheme("dark"))}
      >
        灯泡
      </a>
    </div>
  )
}