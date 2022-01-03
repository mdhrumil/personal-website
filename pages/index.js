import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className = {utilStyles.textJustifier}>
                  Hi!

          Welcome to my website/blog. I write about my experiences and thoughts on ideas and concepts, including but not limited to web3, tech companies and startups, software engineering, and crypto.

          I'm a generalist software engineer, have previous experience with full-stack web dev, applied deep learning, and web3 DApp development.
          My core interests these days lie in NFTs, decentralized finance, protocol design, and research.
        </p>
        <ul className = {utilStyles.listStyled}>
          <li className = {utilStyles.listItem}>
            Currently building the NFT liquidity platform on Solana - <Link target="_blank" href = {"https://solvent.xyz/"}>
                      <a target="_blank">Solvent</a>
                    </Link>
          </li>
          <li className = {utilStyles.listItem}>
            Previously: Software Engg @ eBay
          </li>
          <li className = {utilStyles.listItem}>
            RIT CS Grad May 2021
          </li>
          <li className = {utilStyles.listItem}>
            <Link href = {"https://github.com/mdhrumil"}>
              <a target="_blank">GitHub</a>
            </Link>
          </li>
        </ul>
        <p>
          DM me on {' '}
          <Link href = {"https://twitter.com/mmdhrumil"}>
            <a target="_blank">twitter</a>
          </Link>
        </p>
        

      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className= {utilStyles.headingLg}>Blog</h2>
        <ul className = {utilStyles.listUnstyled}>
          {allPostsData.map(({ id, date, title}) => (
            <li className = {utilStyles.listItem} key = {id}>
              <Link href = {`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}