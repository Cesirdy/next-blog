import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown';
import Toc from '@jsdevtools/rehype-toc';
import Slug from 'rehype-slug';

export default function Content({ children }) {
  const router = useRouter();
	return (
    <ReactMarkdown
      rehypePlugins={[[Slug],[Toc,{headings: ["h1", "h2", "h3"]}]]}
      components={{
        img: ({ src, ...props }) => (
	      <Image
	        src={require(`/public/img${router.asPath.replace(/#.*/, "")}/${src}`)}
	        {...props}
	        placeholder="blur"
	        blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
	      />
	    ),
        a({ node, children, ...props }){
          const match = /#/.exec(props.href || '')
          return !match ? (
            <Link href={props.href} prefetch={false}
              target={
                props.href?.includes("http") ? "_blank" : "_self"
              }
            >
              {children}
            </Link>
          ) : (
            <a {...props}>{children}</a>
          )
        }
      }}
    >
      {children}
    </ReactMarkdown>
	)
}