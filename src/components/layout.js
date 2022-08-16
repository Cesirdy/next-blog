import Nav from "./nav";
import Footer from "./footer";

export default function Layout({ children, home }) {
  return (
    <>
      <header className='text-center transition-all'>
        {home &&(
        <div className='py-6 transition-all space-y-2'>
          <h2 className='text-6xl'>
            {process.env.name}
          </h2>
          <span className='inline-block'>{process.env.description}</span>
        </div>
        )}
      </header>
      <Nav />
      <main className='max-w-3xl mx-auto block p-6'>{children}</main>
      <a className='layout fixed bottom-4 right-4 border p-4 block backdrop-blur z-50 bg-white/60 dark:bg-[#121212]/60 translate-x-0  hover:border-blue-600 hover:dark:border-blue-500 transition-all' href='#'>↑</a>
      <Footer />
    </>
  )
}