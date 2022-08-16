const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), '/src/sources/posts');
const fileNames = fs.readdirSync(postsDirectory);
const BLOG_URL = 'https://csd.pub/'

async function generate() {

  const feed = new RSS({
    title: '',
    description: '',
    site_url: BLOG_URL,
    feed_url: `${BLOG_URL}/feed.xml`,
  })

  fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents)
    const description = content.split('\n').slice(0, 4).join(' ');
    const id = fileName.replace(/\.md$/, '');
    feed.item({
      title: data.title,
      url: `${BLOG_URL}posts/${id}`,
      date: data.date,
      description: description,
    })
  })

  fs.writeFileSync('public/feed.xml', feed.xml({ indent: true }))
}

generate()