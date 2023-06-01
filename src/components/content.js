import { MDXRemote } from "next-mdx-remote";
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'));
const Link = dynamic(() => import('next/link'));



export default function Content({ mdxSource }) {
  const router = useRouter();
  const components = {
    img: ({ src, alt, ...props }) => (
      <>
        <Image
          src={require(`/public/img${router.asPath.replace(/#.*/, "")}/${src}`)}
          {...props}
          title={alt}
          alt={alt}
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1280px) 75vw,
            50vw"
        />
        <span className='text-neutral-500 dark:text-neutral-400 text-right block'>{alt}</span>
      </>
    ),
    a({ node, children, ...props }) {
      const match = /#/.exec(props.href || '');
      return !match ? (
        <Link
          href={props.href}
          prefetch={false}
          target={props.href?.includes("http") ? "_blank" : "_self"}
        >
          {children}
        </Link>
      ) : (
        <a {...props}>{children}</a>
      );
    },
  };
  return <MDXRemote {...mdxSource} components={components}/>;
}
