import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../../components/layout';


export default function Link() {
  return (
    <Layout>
      <Head>
        <title>{`链接 - ${process.env.name}`}</title>
      </Head>
        <p className='text-lg text-neutral-500 dark:text-neutral-400'>前有朋友。</p>
        <ul className='flex flex-wrap py-6'>
          {process.env.links.map(({ name, url, img, text }) => (
          <li className='group basis-1/2 md:basis-1/3 text-center my-4 p-2' key={name}>
            <a href={url} target="_blank" rel="noopener">
              <Image
                className='group-hover:scale-110 group-hover:shadow-xl group-hover:border-blue-600 group-hover:dark:border-blue-500 group-hover:group bg-neutral-500 dark:bg-neutral-400 border-2 mx-auto transition-all'
                src={img}
                height={108}
                width={108}
                alt={name}
              />
              <h2 className='text-lg transition-all'>{name}</h2>
              <span className='text-neutral-500 dark:text-neutral-400 transition-all'>{text}</span>
            </a>
          </li>
          ))}
        </ul>
      
    </Layout>
  );
}