import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Dynamic from 'next/dynamic';
import { getAllPageIds, getPageData } from '../../lib/posts';
import Layout from '../../components/layout';
import Content from '../../components/content';
const Comment = Dynamic(() => import('../../components/comment'),{loading: () => <p className='text-center'>加载中</p>});
import { typo } from "../../styles/typo.module.css";

export async function getStaticProps({ params }) {
  const pageData = await getPageData(params.id);
  return {
    props: {
      pageData,
    },
  };
}

export default function Page({ pageData }) {
  const [showComment, setShowComment] = useState(false)
  return (
    <Layout>
      <Head>
        <title>{`${pageData.title} - ${process.env.name}`}</title>
      </Head>
        <h1 className='text-center text-3xl mb-2 transition-all'>{pageData.title}</h1>
        <div className={`${typo} ${'py-6'}`}>
          <Content>{pageData.content}</Content>
        </div>
        <section className='my-8'>
          {!showComment ? (
            <button
              className='p-4 border block mx-auto hover:border-blue-600 hover:dark:border-blue-500 transition-all'
              onClick={() => setShowComment(!showComment)}
            >
              加载评论
            </button>
          ) : (
            <Comment />
          )}
        </section>
    </Layout>
  );
}


export async function getStaticPaths() {
  const paths = getAllPageIds();
  return {
    paths,
    fallback: false,
  };
}
