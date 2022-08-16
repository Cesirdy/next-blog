export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className='content py-6 text-center text-sm text-neutral-500 dark:text-neutral-400 space-x-2 transition-all'>
      <span>© {year} {process.env.name}</span>

      <a
        target="_blank"
        rel="noopener"
        href="/feed.xml"
      >
        RSS
      </a>
    </footer>
  )
}