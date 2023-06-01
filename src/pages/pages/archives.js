import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const years = Array.from(new Set(allPostsData.map((post) => post.date.slice(0, 4))));
  const postsByYear = years.map((year) => ({
    year: year,
    posts: allPostsData.filter((post) => post.date.slice(0, 4) === year),
  }));
  return {
    props: {
      postsByYear,
      allPostsData,
    },
  };
}

export default function Archives({ postsByYear, allPostsData }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredPostsByYear = postsByYear
    .map((year) => ({
      year: year.year,
      posts: year.posts.filter((post) =>
        selectedCategory ? post.categories.includes(selectedCategory) : true
      ),
    }))
    .filter((year) => year.posts.length > 0);

    const allCategories = Array.from(
      new Set(allPostsData.flatMap((post) => post.categories))
    );

  const handleResetCategory = () => {
    setSelectedCategory('');
  };

  return (
    <Layout>
      <Head>
        <title>{`归档 - ${process.env.name}`}</title>
        <meta name="description" content={process.env.description} />
      </Head>
      <p className="text-lg text-neutral-500 dark:text-neutral-400">
        {selectedCategory
          ? `当前分类下共有 ${allPostsData.filter((post) =>
              post.categories.includes(selectedCategory)
            ).length} 篇文章。`
          : `目前共有 ${allPostsData.length} 篇文章。`}
      </p>
      <div className="flex justify-center space-x-2 mt-4">
        <button
          className={`backdrop-blur bg-white/60 dark:bg-[#121212]/60 py-2 px-4 border hover:border-blue-600 hover:dark:border-blue-500 transition-all ${
            selectedCategory === '' ? 'text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500' : ''
          }`}
          onClick={handleResetCategory}
        >
          全部
        </button>
        {/* 添加其他分类按钮 */}
        {allCategories.map((category) => (
          <button
            key={category}
            className={`backdrop-blur bg-white/60 dark:bg-[#121212]/60 py-2 px-4 border hover:border-blue-600 hover:dark:border-blue-500 transition-all ${
              selectedCategory === category ? 'text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {filteredPostsByYear.map((year) => (
        <div key={year.year} className="py-6">
          <h3 className="text-xl text-right mb-2">{year.year}</h3>
          <ul className="space-y-2 lg:text-lg">
            {year.posts.map(({ id, date, title, categories }) => (
              <li className="flex flex-col lg:flex-row place-content-between" key={id}>
                <Link href={`/posts/${id}`} prefetch={false} className="hover:text-blue-600 dark:hover:text-blue-500 transition-all">
                  {title}
                </Link>
                <small className="space-x-2 text-neutral-500 dark:text-neutral-400">
                <Date dateString={date} formatString={'LLL dd'} />
                <span>{categories}</span>
              </small>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </Layout>
);
}