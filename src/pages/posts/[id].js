import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Dynamic from 'next/dynamic';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import Date from '../../components/date';
import Content from '../../components/content';
const Comment = Dynamic(() => import('../../components/comment'),{loading: () => <p className='text-center'>加载中</p>});
import { typo } from "../../styles/typo.module.css";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  const [showComment, setShowComment] = useState(false)
  return (
    <Layout>
      <Head>
        <title>{`${postData.title} - ${process.env.name}`}</title>
        <meta
          name="description"
          content={postData.excerpt}
        />
      </Head>
        <h1 className='text-center text-3xl mb-2 transition-all'>{postData.title}</h1>
        <div className='text-neutral-500 dark:text-neutral-400 space-x-2 text-center'>
          <Date dateString={postData.date} />
          <span>{postData.categories}</span>
        </div>
        <div className={`${typo} ${'py-6'}`}>
          <Content>{postData.content}</Content>
        </div>
        <h2 className='text-center text-3xl text-neutral-500 dark:text-neutral-400 py-6'>the end.</h2>
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
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
