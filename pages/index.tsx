import Counter from '@components/elements/Counter'
import { Banner } from '@components/layouts/Banner'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import BannerDesktop from '@public/banners/welcomeBanner.webp'
import BannerMobile from '@public/banners/welcomeBannerPhone.webp'
import { Page } from '@components/modules/Page'
import { Section } from '@components/modules/Section'
import { ArticleCard } from '@components/elements/ArticleCard'
import { StaticBannerImage } from '@components/elements/StaticBannerImage'
import Link from 'next/link'
import Rating from '@components/elements/Rating'
import AmazonLogo from "@public/logos/amazon.jpg"
import Image from "next/image"
import SocialsSection from '@components/modules/SocialsSection'
import { ArticlePeek, BookFull, Report } from '@services/Schema'
import { CMS, CreateAnalystLink, CreateArticleLink, CreateBookLink, CreateCategoryLink, GetArticleOfTheMonth, GetBookOfTheMonth } from '@services/cms'
import { ReportCard } from '@components/elements/ReportCard'

interface HomePageProps {
  fintechArticlePeeks: ArticlePeek[],
  esgArticlePeeks: ArticlePeek[],
  capitalMarketsArticlePeeks: ArticlePeek[],
  reports: Report[],
  bookOfTheMonth: BookFull,
  employeeCount: number,
}

const Home: NextPage<HomePageProps> = (props) => {
  const aotm = GetArticleOfTheMonth([...props.fintechArticlePeeks, ...props.esgArticlePeeks]);

  return (
    <>
      <Page>
        <Head>
          <title>Emerging Finsights</title>
          <meta name="description" key="desc" content="Find the latest reports, news and financial insights from emerging talent. " />
          <meta property="og:title" content="Emerging Finsights" />
          <meta property="og:description" content="Find the latest reports, news and financial insights from emerging talent. " />
        </Head>
        {/* Display homepage banner */}
        <Banner backgroundImage={<StaticBannerImage imageClasses="opacity-75" imageAltText='welcome banner' desktopImage={BannerDesktop} mobileImage={BannerMobile} />}>
          <div className='relative w-full h-full'>
            <div className='absolute left-0 w-full font-bold text-center transform -translate-y-1/2 top-1/2'>
              <div className='grid grid-cols-3'>
                <div className='grid grid-rows-3 justify-self-end'>
                  <div className='relative text-xs md:text-xl'>
                    <div className='absolute bottom-0 left-0 w-full text-xs md:text-xl'>
                      <span className='p-1'>
                        Launched
                      </span>
                    </div>
                  </div>

                  <div className='text-efs-logo text-7xl md:text-9xl'>
                    20
                  </div>
                  <div className='text-xs md:text-xl'>
                    <span className='p-1'>
                      September
                    </span>
                  </div>
                </div>

                <div className='grid grid-rows-3'>
                  <div className='invisible' />
                  <div role='employee counter' className='text-efs-logo text-7xl md:text-9xl'>
                    <Counter endNum={props.employeeCount} />
                  </div>
                  <div className='text-xs md:text-xl'>
                    <span className='p-1'>
                      employees
                    </span>
                  </div>
                </div>

                <div className='grid grid-rows-3 justify-self-start'>
                  <div className='invisible' />
                  <div role='jobs secured counter' className=' text-efs-logo text-7xl md:text-9xl'>
                    <Counter endNum={3} />
                  </div>
                  <div className='text-xs md:text-xl'>
                    <span className='p-1'>
                      Jobs secured<br />since joining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Banner>

        {/* Display sections */}

        <Section title='Latest Posts' barContainerClasses='bg-black bg-opacity-60 pb-20' barClasses='bg-efs-logo'>
          <div className="flex flex-row flex-wrap justify-center mx-auto md:flex-nowrap test">
            <div className="flex flex-col flex-grow gap-8 pr-5 ml-5 md:flex-grow-0">
              {aotm != null ? <AOTMCard article={aotm} /> : null}
              {props.bookOfTheMonth != null ? <BOTMCard book={props.bookOfTheMonth} /> : null}
            </div>

            <div className=''>
              <p className="py-3 mb-2 ml-8 text-3xl font-bold text-left text-white hover:text-black hover:underline">
                <Link href={"/esg"} passHref>
                  <a>
                    Environment, Social & Governance
                  </a>
                </Link>
              </p>

              <div className='flex flex-wrap justify-center gap-4 p-3'>
                {props.esgArticlePeeks.slice(0, 3).map((peek, key) => <ArticleCard key={key} article={peek} />)}
              </div>
              <hr className="w-11/12 mx-auto mt-5 bg-black border-2 border-black" />

              <p className="py-3 mb-2 ml-8 text-3xl font-bold text-left text-white hover:text-black hover:underline">
                <Link href={"/fintech"} passHref>
                  <a>
                    Financial Technology
                  </a>
                </Link>
              </p>

              <div className='flex flex-wrap justify-center gap-4 p-3'>
                {props.fintechArticlePeeks.slice(0, 3).map((peek, key) => <ArticleCard key={key} article={peek} />)}
              </div>
              <hr className="w-11/12 mx-auto mt-5 bg-black border-2 border-black" />

              <p className="py-3 mb-2 ml-8 text-3xl font-bold text-left text-white hover:text-black hover:underline">
                <Link href={"/capital-markets"} passHref>
                  <a>
                    Capital Markets
                  </a>
                </Link>
              </p>

              <div className='flex flex-wrap justify-center gap-4 p-3'>
                {props.capitalMarketsArticlePeeks.slice(0, 3).map((peek, key) => <ArticleCard key={key} article={peek} />)}
              </div>
              <hr className="w-11/12 mx-auto mt-5 bg-black border-2 border-black" />

              <p className="py-3 mb-2 ml-8 text-3xl font-bold text-left text-white hover:text-black hover:underline">
                <Link href={"/reports"} passHref>
                  <a>
                    Reports
                  </a>
                </Link>
              </p>

              <div className='flex flex-wrap justify-center gap-4 p-3'>
                {props.reports.slice(0, 3).map((peek, key) => <ReportCard key={key} report={peek} />)}
              </div>
            </div>
          </div>
        </Section>
        <SocialsSection />
      </Page>
    </>
  )
}

export const AOTMCard = (props: {
  article: ArticlePeek
}) => {

  const articleLink = CreateArticleLink(props.article.category, props.article.title_slug)
  const analystLink = CreateAnalystLink(props.article.author.name, props.article.author.efs_status == "active")
  const categoryLink = CreateCategoryLink(props.article.category)

  return (
    <div className="grid justify-items-center">
      <div className="bg-efs-logo w-72 md:w-[20rem] lg:w-[24rem] p-5 rounded-3xl text-center text-white z-5">
        <Link href={articleLink} passHref>
          <a className="block">
            <h2 className="text-3xl pb-5 3xl:text-[3rem] 3xl:leading-[3rem]">Article of the Month</h2>
            <div className="pb-5 opacity-50 3xl:text-[1.25rem] 3xl:leading-[1.75rem]">{/*Need to add month to article*/}</div>
            <div className="text-2xl pb-5 3xl:text-[1.5rem] 3xl:leading-[2rem]">{props.article.title} </div>
          </a>
        </Link>
        <div className="relative w-60 3xl:w-[20rem] mx-auto group">
          <Link href={articleLink} passHref>
            <a className="block">
              <img className="block w-full object-cover" src={props.article.thumbnail} alt={props.article.thumbnail_alt} />
            </a>
          </Link>
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-all bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-30 group-hover:opacity-100">
            <Link href={analystLink} passHref>
              <a>
                <div className="mx-auto">
                  <img className="block object-cover w-24 h-24 mx-auto transition-all transform rounded-full ring-0 hover:ring-2 ring-red-50 hover:shadow-2xl hover:scale-110" src={props.article.author.thumbnail} />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="pb-5 mt-5 font-xxl 3xl:text-[1.5rem] 3xl:leading-[2rem]">
          Analyst:{" "}
          <Link href={analystLink}>
            <a className="hover:underline">
              {props.article.author.name}
            </a>
          </Link>
        </div>

        <div className="pb-8 3xl:text-[1.5rem] 3xl:leading-[2rem] text-center">
          {props.article.description}
        </div>
      </div>
    </div>
  )
}

export const BOTMCard = (props: {
  book: BookFull
}) => {
  const overallRating = Math.round(((props.book.rating_education + props.book.rating_length + props.book.rating_readability + props.book.rating_relevance + props.book.rating_research_depth) / 5) * 10) / 10;
  return (
    <Link href={CreateBookLink(props.book.review_slug)} passHref>
      <div className="grid justify-items-center">
        <div className="group mx-auto bg-efs-logo w-72 md:w-[20rem] lg:w-[24rem] p-5 rounded-3xl text-center text-white z-5">
          <h2 className="text-3xl pb-2 3xl:text-[3rem] 3xl:leading-[3rem] 3xl:pb-[2rem]">Book of the Month</h2>
          <div className="pb-2 font-bold 3xl:text-[1.25rem] 3xl:leading-[1.75]">{/* Week Needs adding */}</div>
          <div className="pb-2 scale-150">EFS rating: {" "}
            <div className="mb-2 mx-auto w-fit flex flex-row">
              <Rating numStars={overallRating} maxStars={5} containerClass="flex flex-row items-center justify-center px-1" starClasses="block" ></Rating> {overallRating}
            </div>
          </div>
          <div className="grid">
            <img className="col-start-1 row-start-1 w-52 3xl:w-[15rem] pb-10 mx-auto group-hover:scale-105" src={props.book.thumbnail} alt={props.book.book_title} />
            {/* <img className="col-start-1 row-start-1 w-52 3xl:w-[15rem] pb-10 mx-auto sm:group-hover:invisible " src={props.book.thumbnail} alt={props.book.book_title} /> */}
            {/* <div className="col-start-1 row-start-1 invisible pb-8 pr-5 text-md hidden sm:block group-hover:visible overflow-ellipsis h-full" dangerouslySetInnerHTML={{ __html: santisedContent }}></div> */}
          </div >

          <div className="relative pb-4 group">
            <Link href={props.book.affiliate_link} passHref>
              <a className="block pt-3 pb-3 pl-4 pr-10 bg-black group-hover:underline rounded-xl w-70" target="_blank">
                Purchase from
              </a>
            </Link>
            <Link href={props.book.affiliate_link} passHref>
              <a target="_blank">
                <div className="absolute right-0 w-16 h-16 transition -translate-y-1/2 top-1/3 group-hover:scale-110">
                  <Image src={AmazonLogo} alt="Amazon" layout="responsive" width={64} height={64} objectFit="fill" className="rounded-full" />
                </div>
              </a>
            </Link>
          </div>
        </div >
      </div >
    </Link >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  /* Fetch esg, fintech and employees from cms */
  const provider = CMS.getProvider()

  const esgArticles = await provider.getArticlePeeks("esg")
  const fintechArticles = await provider.getArticlePeeks("fintech")
  const capitalMarketsArticles = await provider.getArticlePeeks("capital-markets")
  const books = await provider.getBookPeeks()
  const reports = await provider.getReportPeeks()
  const employeeCount = await provider.getNumberOfEmploees();

  if (!esgArticles || !fintechArticles || !capitalMarketsArticles || !books || !reports || !employeeCount) return { notFound: true }

  const bookOfTheMonth = await provider.getBookFromSlug(GetBookOfTheMonth(books).review_slug)

  if (!bookOfTheMonth) {
    return { notFound: true }
  }

  return {
    props: {
      esgArticlePeeks: esgArticles,
      fintechArticlePeeks: fintechArticles,
      capitalMarketsArticlePeeks: capitalMarketsArticles,
      bookOfTheMonth: bookOfTheMonth,
      reports: reports,
      employeeCount: employeeCount
    }
  }
}

export default Home
