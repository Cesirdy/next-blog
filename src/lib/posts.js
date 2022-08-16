import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import removeMd from 'remove-markdown'

const postsDirectory = path.join(process.cwd(), '/src/sources/posts');
const pagesDirectory = path.join(process.cwd(), '/src/sources/pages');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents,{ excerpt: true });
    const excerptMD = matterResult.excerpt;
    const excerpt = removeMd(excerptMD)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      excerpt,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getAllPageIds() {
  const fileNames = fs.readdirSync(pagesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}


export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const content = matterResult.content;

  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    ...matterResult.data,
  };
}

export async function getPageData(id) {
  const fullPath = path.join(pagesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the page metadata section
  const matterResult = matter(fileContents);
  const content = matterResult.content;


  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    ...matterResult.data,
  };
}