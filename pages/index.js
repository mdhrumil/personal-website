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
          Hi, I'm a general software engineer with core skills in full-stack web development and applied deep learning. Some of my interests include studying cryptocurrencies and blockchain technology, artificial intelligence, and technology startups. I also like to invest in stocks and crypto. Some background on me:
        </p>
        <ul className = {utilStyles.listStyled}>
          <li className = {utilStyles.listItem}>
            MS in Computer Science - Rochester Institute of Technology - Summer 2021
          </li>
          <li className = {utilStyles.listItem}>
            Software Engineer Intern - eBay Inc - Summer 2020
          </li>
        </ul>
        <p>
          Connect with me via {' '}
          <Link href = {"mailto: mehtadhrumil97@gmail.com"}>
            <a>email</a>
          </Link>
          {''} or {' '}
          <Link href = {"https://twitter.com/mmdhrumil"}>
            <a>twitter</a>
          </Link>
          .
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