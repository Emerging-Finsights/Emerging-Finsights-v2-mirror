import { Page } from "@components/modules/Page"
import Image from "next/image"

import womenTop from "@public/icons8/woman.webp"
import womenTopMobile from "@public/icons8/woman-top-mobile.webp"
import womenBottom from "@public/icons8/woman-bottom.webp"
import arrow from "@public/alumni/arrow.png"
import arrow2 from "@public/alumni/arrow-2.png"
import { AlumniCompany, AlumniPage, AlumniPerson } from "@services/Schema"
import { CMS } from "@services/cms"
import { GetServerSideProps } from "next"
import { santizeContent } from "@utils/sanitize"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { AlumniCarousel } from "@components/elements/AlumniCarousel"
import { SocialPanel, SocialsArrayToOptions } from "@components/elements/SocialPanel"
import Head from "next/head"

const AlumniBanner = () => {
  const [refMobile, inViewMobile] = useInView({ triggerOnce: true })
  const [refDesktop, inViewDesktop] = useInView({ triggerOnce: true })

  return (
    <>
      {/* Mobile */}
      <div ref={refMobile} className="sm:hidden">
        {/* Title */}
        <h1 className="text-4xl text-efs-logo font-bold mx-3 mt-10">
          Emerging Finsights
          <br />
          <span className="text-black">Alumni</span>
        </h1>

        {/* Woman sitting */}
        <div className="relative bg-[#D6E8DE] w-auto h-100 ml-10 mt-10 rounded-l-xl">
          <Image src={womenTopMobile} layout="fill" objectFit="contain" objectPosition="right center" alt="alumni woman" />
        </div>

        {/* Page Description */}
        <p className="text-2xl text-[#777777] font-semibold mx-3 mt-5 alumni-passage">
          Our aim is to provide experience to <strong> enhance future employment opportunities. </strong>
          <br />
          Here’s where our <strong> emerging talent </strong> has gone…
        </p>
      </div>

      {/* Desktop */}
      <div ref={refDesktop} className="hidden sm:block">

        {/* Title */}
        <h1 className="text-5xl xl:text-7xl 2xl:text-9xl text-efs-logo font-bold mx-3 mt-10 2xl:mb-5">
          Emerging Finsights
        </h1>

        <div className="flex flex-row items-stretch mt-3 min-h-[100vh]">
          {/* Left panel */}
          <div className="mx-3 mt-2 flex flex-col">
            <h2 className="text-5xl xl:text-7xl 2xl:text-9xl font-bold"> Alumni </h2>
            <p className="font-semibold text-xl xl:text-3xl 2xl:text-5xl text-[#777777] alumni-passage">
              Our aim is to provide experience to <strong> enhance future employment opportunities. </strong>
              <br />
              Here’s where our <strong> emerging talent </strong> has gone…
            </p>
            <div className="relative flex-grow mx-auto w-1/4 m-5">
              <Image src={arrow} layout="fill" objectFit="contain" alt="arrow" />
            </div>
          </div>

          {/* Right panel */}
          <div className="relative w-[60%] flex-shrink-0 bg-[#D6E8DE] rounded-tl-xl pt-[50%]">
            <Image src={womenTop} layout="fill" objectFit="contain" alt="alumni woman" />
          </div>
        </div>

      </div>
    </>)
}

const AlumniNameTagTop = (props: { person: AlumniPerson }) => {
  return (
    <div className="flex h-full pt-4 items-end">
      <div className="relative bg-efs-beige h-3/4 w-3/4 lg:w-5/6 -ml-4 ring-8 ring-efs-beige">
        <div className="ml-4 py-6">
          <p className="text-xl lg:text-3xl 3xl:text-5xl font-bold text-efs-gray bottom-0"> {props.person.name} </p>
          <p className="text-lg lg:text-2xl 3xl:text-4xl font-bold text-efs-gray bottom-0"> {props.person.company.name} </p>
          <p className="text-lg lg:text-2xl 3xl:text-4xl font-bold text-efs-logo bottom-0"> {props.person.company_position}</p>
        </div>
      </div>
      <div className="flex-shrink-0 relative w-60 h-60 3xl:w-80 3xl:h-80 ring-8 ring-efs-beige rounded-full -ml-20 lg:-ml-28 3xl:-ml-36">
        <Image src={props.person.thumbnail} alt={props.person.name} layout="fill" objectFit="cover" className="rounded-full" />
      </div>
    </div>
  )
}

const AlumniNameTagBottom = (props: { person: AlumniPerson }) => {
  return (
    <div className="flex h-full w-full items-start pt-20 justify-end">
      <div className="z-5 flex-shrink-0 relative w-60 h-60 3xl:w-80 3xl:h-80 ring-8 ring-efs-beige rounded-full -mr-20 lg:-mr-28 3xl:-mr-36">
        <Image src={props.person.thumbnail} alt={props.person.name} layout="fill" objectFit="cover" className="rounded-full" />
      </div>
      <div className="bg-efs-beige h-3/4 w-3/4 lg:w-5/6 -mr-4 ring-8 ring-efs-beige">
        <div className="mr-8 text-right py-6">
          <p className="text-xl lg:text-3xl 3xl:text-5xl font-bold text-efs-gray bottom-0"> {props.person.name} </p>
          <p className="text-lg lg:text-2xl 3xl:text-4xl font-bold text-efs-gray bottom-0"> {props.person.company.name} </p>
          <p className="text-lg lg:text-2xl 3xl:text-4xl font-bold text-efs-logo bottom-0"> {props.person.company_position}</p>
        </div>
      </div>
    </div>
  )
}

const AlumniSection = (props: { person: AlumniPerson, index: number }) => {
  const main_text = santizeContent(props.person.main_text)
  const main_quote = santizeContent(props.person.main_quote)

  const [refMobile, inViewMobile] = useInView({ triggerOnce: true })
  const [refDesktop, inViewDesktop] = useInView({ triggerOnce: true })

  return (
    <>
      {/* Mobile */}
      <div ref={refMobile} className={`sm:hidden bg-[#D6E8DE] pt-6 ${props.index == 0 ? "mt-10 rounded-t-xl" : "pt-12"} ${inViewMobile ? "visible duration-75 animate-fade-in" : "invisible"}`}>
        {/* Person header */}
        <div className={`mx-2 flex flex-wrap gap-2 ${props.index % 2 != 0 ? "flex-row-reverse" : ""}`}>
          {/* person name and position */}
          <h2 className="text-3xl font-bold whitespace-nowrap pt-2">
            {props.person.name}
            <br />
            <span className="font-thin text-[#9f9f9f] capitalize"> {props.person.position} </span>
          </h2>

          {/* person thumbnail */}
          <div className="m-2 relative w-16 h-16 rounded-full ring-2 ring-white">
            <Image src={props.person.thumbnail} alt={props.person.name} layout="fill" objectFit="cover" className="rounded-full" />
          </div>
        </div>

        {/* main quote */}
        <div className={`mx-2 mt-5 text-xl font-thin text-efs-beige ${props.index % 2 != 0 ? "pl-20" : "pr-20"}`} dangerouslySetInnerHTML={{ __html: main_quote }} />

        {/* Company logo */}
        <div className="relative mx-auto mt-5 w-5/6 p-4">
          {/* Green background halfway down the image */}
          <div className="w-full h-1/2 absolute right-0 left-0 bottom-0 rounded-t-xl bg-efs-green" />
          <div className="relative w-full h-64">
            <Image src={props.person.company.logo_url} alt={props.person.company.logo_alt} layout="fill" objectFit="contain" />
          </div>
        </div>

        {/* Main text */}
        <div className="text-2xl text-thin rounded-b-xl bg-efs-green mx-auto w-5/6 p-4">
          <span className="text-efs-beige alumni-passage-white" dangerouslySetInnerHTML={{ __html: main_text }} />

          <SocialPanel options={SocialsArrayToOptions(props.person.socials)} containerClass="py-4" iconFrameClass="fill-white" />
        </div>

        {/* Arrow */}
        <div className="relative mt-10 mx-6 h-16">
          <Image src={arrow2} alt="arrow" layout="fill" objectFit="contain" />
        </div>
      </div>

      {/* Desktop / tablet */}
      <div ref={refDesktop} className={`min-h-[100vh] hidden sm:flex ${props.index % 2 == 0 ? "flex-row" : "flex-row-reverse"} items-stretch bg-[#D6E8DE] ${props.index == 0 ? "rounded-tl-xl" : ""} ${inViewDesktop ? "visible duration-75 animate-fade-in" : "invisible"}`}>
        {/* Left panel */}
        <div className="p-4 w-1/2">
          <h2 className="text-5xl lg:text-7xl 2xl:text-8xl text-efs-logo font-bold">
            {props.person.name}
          </h2>

          <SocialPanel options={SocialsArrayToOptions(props.person.socials)} containerClass={`py-4  ${props.index % 2 == 0 ? "" : "justify-end"} `} />

          <div className="text-2xl lg:text-4xl 3xl:text-6xl max-w-fit text-[#777777] whitespace-normal alumni-passage mt-3 pr-12" dangerouslySetInnerHTML={{ __html: main_text }} />

          {/* person thumbnail */}
          <div>
            {props.index % 2 == 0 ?
              <AlumniNameTagTop person={props.person} /> : <AlumniNameTagBottom person={props.person} />}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-1/2">
          {/* Green company logo */}
          <div className="relative h-96 2xl:h-[38rem] 3xl:h-[48rem]">
            <div className={`absolute bg-efs-green ${props.index % 2 == 0 ? "rounded-l-xl right-0" : "rounded-r-xl left-0"} w-[80%] shadow-xl top-0 bottom-0 `}>
            </div>
            <div className={`absolute ${props.index % 2 == 0 ? "left-[5%]" : "right-[5%]"} top-1/2 -translate-y-1/2 w-[70%] h-[90%]`}>
              < div className="relative h-full">
                <Image src={props.person.company.logo_url} alt={props.person.company.logo_alt} layout="fill" objectFit="contain" />
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="m-8 text-xl md:text-2xl 2xl:text-4xl 3xl:text-6xl italic text-efs-beige" dangerouslySetInnerHTML={{ __html: main_quote }} />
        </div>
      </div>
    </>
  )
}

const CompanyCarousel = (props: { companies: AlumniCompany[] }) => {

  return (
    <div className="bg-[#D6E8DE] pb-4 py-20 3xl:py-28">
      <div className="bg-efs-beige rounded-xl mx-auto max-w-7xl 3xl:max-w-screen-3xl">
        <h2 className="text-2xl md:text-3xl xl:text-4xl 3xl:text-6xl font-semibold text-[#9f9f9f] pt-5 mx-2 text-center">
          Companies our <span className="text-efs-logo">Alumni</span> have gone on to <span className="text-efs-logo">work for</span>
        </h2>

        {/* Company card container */}
        <div className="flex gap-16 overflow-x-auto snap-x p-8">
          {props.companies.map(company => (
            <Link key={company.name} href={company.link} passHref>
              <a className="block flex-shrink-0 relative snap-center w-64 h-64 first:ml-auto last:mr-auto" target={"_blank"} >
                <Image src={company.logo_url} alt={company.logo_alt} layout="fill" objectFit="cover" className="rounded-2xl " />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const BottomSection = () => {
  return (
    <div className="h-auto xl:min-h-[100vh] flex flex-col mx-4 xl:mx-0 mt-10 ">
      <h2 className="text-efs-logo font-bold text-4xl sm:text-5xl xl:text-7xl 2xl:text-9xl xl:m-4">
        You&apos;ve gotten this far.
      </h2>

      <div className="flex flex-grow flex-row items-stretch">
        <div className="w-full xl:w-1/2 p-4 min-h-full flex flex-col justify-between">
          <div>
            <h3 className="text-3xl sm:text-3xl xl:text-4xl 2xl:text-6xl font-thin text-[#777777]">
              Find out emerging finsights can offer you
            </h3>

            <ul className="list-disc list-inside text-black mt-5 2xl:mt-12 3xl:mt-24 sm:text-2xl xl:text-3xl 2xl:text-4xl 2xl:ml-10 3xl:text-6xl py-5">
              <li> CV Advice </li>
              <li> Cover Letter Help </li>
              <li> Find the Latest Jobs </li>
              <li> Interview Preparation </li>
              <li> News on the Hottest Finance Topics </li>
            </ul>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl xl:text-4xl 3xl:text-6xl max-w-fit my-5 bottom-0">
              Need experience? Please contact us via email with a copy of your CV.
              <br />
              <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
                <SocialPanel options={{
                  linkedinLink: "https://www.linkedin.com/company/emergingfinsights/",
                  instagramLink: "https://www.instagram.com/emergingfinsights/"
                }}
                  iconFrameClass="xl:w-8 xl:h-8 3xl:w-16 3xl:h-16" containerClass="px-1 py-2 xl:gap-2 3xl:gap-4"></SocialPanel>
                <Link href={"mailto:admin@emergingfinsights.co.uk"}>
                  <a className="text-efs-logo text-xl xl:text-2xl 3xl:text-4xl break-words hover:underline">admin@emergingfinsights.co.uk</a>
                </Link>
              </div>
            </div>
          </div>


        </div>

        <div className="hidden xl:block relative flex-grow bg-[#D6E8DE] rounded-t-xl">
          <Image src={womenBottom} alt="woman" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  )
}

const AlumniPage = (props: { companies: AlumniCompany[], pageInfo: AlumniPage, alumni: AlumniPerson[] }) => {
  return (
    <Page>
      <Head>
        <title>Alumni | Emerging Finsights</title>
        <meta name="description" key="desc" content="" />
        <meta property="og:title" content="Alumni | Emerging Finsights" />
        <meta property="og:description" content="" />
      </Head>

      <AlumniBanner />
      <AlumniSection index={0} person={props.pageInfo.topPerson} />
      <AlumniSection index={1} person={props.pageInfo.bottomPerson} />
      <CompanyCarousel companies={props.companies} />
      <AlumniCarousel alumni={props.alumni} />
      <BottomSection />
    </Page>)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const provider = CMS.getProvider()
  const companies = await provider.getAllCompanies()
  const alumniPage = await provider.getAlumniPage()
  const alumni = await provider.getAllAlumni()

  if (!companies || !alumniPage || !alumni) return { notFound: true }

  return {
    props: {
      companies: companies,
      pageInfo: alumniPage,
      alumni: alumni
    }
  }
}

export default AlumniPage

