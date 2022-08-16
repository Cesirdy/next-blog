const fs = require('fs');

const args = process.argv.slice(2);

function generatePost(title) {

  function capitalizeFirstWordLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const sentenceCaseTitle = capitalizeFirstWordLetter(title);
  const formattedTitle = sentenceCaseTitle.split('-').join(' ');

  const date = new Date();
  const Y = date.getFullYear();
  const M = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()} ` : date.getMinutes();
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  const time = `${Y}-${M}-${D} ${h}:${m}:${s}`;

  const frontMatter = `---
title: "${formattedTitle}"
date: "${time}"
categories:
  - 
---
`

  fs.writeFile(`./src/sources/posts/${title}.md`, frontMatter, (err) => {
    if (err) throw err;
    console.log(`Created ${title}.md!`);
  });
}

generatePost(args[0]);