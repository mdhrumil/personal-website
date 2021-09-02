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
          Hi, I'm a general software engineer with core skills in full-stack web development, applied deep learning, and Solidity programming. Some of my interests include studying cryptocurrencies and blockchain technology, artificial intelligence, and technology startups. I also like to invest in stocks and crypto. Some background on me:
        </p>
        <ul className = {utilStyles.listStyled}>
          <li className = {utilStyles.listItem}>
            Building <Link href = {"https://solventprotocol.com/"}>
                      <a>Solvent Protocol</a>
                    </Link>
          </li>
          <li className = {utilStyles.listItem}>
            Software Engineer 2 @ eBay, developing backend web services using Spring MVC
          </li>
          <li className = {utilStyles.listItem}>
            Previously - Software Engineer Intern @ eBay, Developing frontend web apps usign React and backend web services using Spring MVC
          </li>
          <li className = {utilStyles.listItem}>
            Education - Rochester Institute of Technology, MS in Computer Science - May 2021
          </li>
          <li className = {utilStyles.listItem}>
            <Link href = {"https://github.com/mdhrumil"}>
              <a>GitHub</a>
            </Link>
          </li>
        </ul>
        <p>
          Contact me via {' '}
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