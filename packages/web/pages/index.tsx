import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCodeFork } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Button, Container } from 'react-bootstrap'

import styles from "../styles/home.module.scss"

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" />

      <div className={classNames("bg-info", styles.sectionBanner)}>
        <Container>
          <h1 className="display-3">Follow Us on Twitter!</h1>
          <a className="h1 text-dark" href='https://twitter.com/daily_watori'><FontAwesomeIcon icon={faTwitter} /> @daily_watori</a>
        </Container>
      </div>

      <div className={classNames(styles.sectionBanner)}>
        <Container>
          <h1 className="display-3">Nominate Your Favorite Artist!</h1>
          <h2 className="h1">Add them to our watchlist!</h2>
          
          <Link href="https://github.com/direbus/daily-watori" passHref><Button size='lg' variant="outline-primary"> Request to Include to Retweet List</Button></Link>
        </Container>
      </div>

      <div className={classNames(styles.sectionBanner, styles.sectionBehindTheScene)}>
        <Container>
          <h1 className="display-3">Who's behind the scene?</h1>
          <h2 className="h1">See Our Contributors</h2>
          <Button size='lg' variant="outline-dark" href="https://github.com/direbus/daily-watori/graphs/contributors"><FontAwesomeIcon icon={faGithub} /> direbus/daily-watori's Contributor</Button>
          <h2 className="h1 mt-4">See Our Codebase</h2>
          <Button size='lg' variant="outline-dark" href="https://github.com/direbus/daily-watori"><FontAwesomeIcon icon={faCodeFork} /> direbus/daily-watori</Button>
        </Container>
      </div>
    </>
  )
}

export default Home
