import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import Date from'../../components/date';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}


export default function Archive({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{`归档 - ${process.env.name}`}</title>
      </Head>
        <p className='text-lg text-neutral-500 dark:text-neutral-400'>目前共有 {allPostsData.length} 篇文章。</p>
        <ul className='py-6 space-y-2 lg:text-lg'>
          {allPostsData.map(({ id, date, title, tags, categories }) => (
          <li className='flex flex-col lg:flex-row place-content-between' key={id}>
            <Link href={`/posts/${id}`} prefetch={false} className='hover:text-blue-600 dark:hover:text-blue-500 transition-all'>
              {title}
            </Link>
            <small className='space-x-2 text-neutral-500 dark:text-neutral-400'>
              <Date dateString={date} />
              <span>{categories}</span>
            </small>
          </li>
          ))}
        </ul>
      
    </Layout>
  );
}