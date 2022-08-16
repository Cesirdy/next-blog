import { DisqusJS } from 'disqusjs/react';
import 'disqusjs/react/styles/disqusjs.css';
import { useRouter } from 'next/router'

export default function Comment() {
  const pathname = useRouter().asPath;
  return (
    <>
      <DisqusJS
        shortname=''
        siteName=''
        identifier= {pathname}
        api=''
        apikey=''
      />
      <style>{`#dsqjs:focus,#dsqjs:hover{color:inherit!important}.dark #dsqjs .dsqjs-post-body { color: #eee; }.dark #dsqjs .dsqjs-no-comment { color: #ccc; }.dark #dsqjs .dsqjs-order-label { background-color: #343434; }.dark #dsqjs .dsqjs-post-list .dsqjs-post-header .dsqjs-meta { color: #ccc; }.dark #dsqjs .dsqjs-nav-tab { color: #ccc; }.dark #dsqjs .dsqjs-tab-active { color: #eee; }.dark #dsqjs .dsqjs-nav, .dark #dsqjs .dsqjs-footer-container{border-color: rgba(255,255,255,.2);}.dark #dsqjs .dsqjs-post-list .dsqjs-post-item .dsqjs-post-header .dsqjs-meta,.dark #dsqjs .dsqjs-footer{color: rgba(255,255,255,.6)}`}</style>
    </>
  )
}