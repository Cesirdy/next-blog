import { useState } from 'react';
import Head from 'next/head';
import Dynamic from 'next/dynamic';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import Date from '../../components/date';
import Content from '../../components/content';
const Comment = Dynamic(() => import('../../components/comment'),{loading: () => <p className='text-center'>加载中</p>});
import { typo } from "../../styles/typo.module.css";
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism'
import 'prism-themes/themes/prism-atom-dark.min.css';
import Toc from '@jsdevtools/rehype-toc';
import Slug from 'rehype-slug';


export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const mdxSource = await serialize(postData.content, {
    mdxOptions: {
      format: 'mdx',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypePrism], 
        [Slug], 
        [Toc, {headings: ["h1", "h2", "h3"]}]
      ]
    },
  });
  return {
    props: {
      postData,
      mdxSource,
    },
  };
}

export default function Post({ postData,mdxSource }) {
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
          <Content mdxSource={...mdxSource}/>
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
