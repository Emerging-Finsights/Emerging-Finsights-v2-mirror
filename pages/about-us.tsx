import { Page } from "@components/modules/Page";
import { CMS } from "@services/cms";
import { GetServerSideProps, NextPage } from "next";
import EmployeeCard from "@components/elements/EmployeeCard";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { EmployeeSection } from "@services/Schema";
import Image from "next/image";
import aboutMan3 from "public/icons8/about-man-3.webp";
import aboutMen1 from "public/icons8/men-1.webp";
import Link from "next/link";

const AboutUsBlock = (props: { extraGradientClasses?: string, children: ReactNode }) => {
  return (
    // Should change this to be rem instead of vh
    <div className="h-[30vh] md:h-[50vh] lg:h-[100vh] relative md:m-5" >
      <div className={`relative h-full lg:h-4/5 bg-gradient-to-b from-efs-beige to-efs-logo rounded-bl-xl md:rounded-b-xl ${props.extraGradientClasses ?? ""}`}>
      </div>

      <div className="absolute left-0 top-0 w-full h-full" >
        {props.children}
      </div>
    </div>)
}

const AboutUsTextBlock = (props: { topText: ReactNode, bottomText: ReactNode }) => {
  return (
    <div className="p-4 md:p-5 lg:p-10 h-full lg:h-4/5 flex flex-col items-center justify-center" >
      <div>
        {/* <p className="text-3xl md:text-6xl 3xl:text-8xl font-bold " > {props.topText} </p> */}
        <div className="text-2xl md:text-5xl lg:text-6xl 3xl:text-8xl font-bold text-[#777777]" > {props.topText} </div>
        <div className="text-xl lg:text-3xl 3xl:text-5xl hidden lg:block text-efs-beige mt-6" > {props.bottomText} </div>
      </div>
    </div>)
}

type AboutUsPageProps = {
  data: EmployeeSection[]
};

const AboutUsPage: NextPage<AboutUsPageProps> = props => {
  useEffect(() => {
    if (window.location.hash != "") {
      document.getElementById(window.location.hash.substring(1))?.focus();
    }
  }, [])

  return (
    <Page extraRightColumn={
      <p className="text-center">
        <span>Illustrations from </span>
        <Link href="https://icons8.com/" passHref>
          <a className="underline">icons8.com</a>
        </Link>
      </p>}>

      <Head>
        <title>About Us | Emerging Finsights</title>
        <meta name="description" key="desc" content="We are a new graduate based financial journal aimed at providing current and recent students with a platform to display their passion for finance. " />
        <meta property="og:title" content="About Us | Emerging Finsights" />
        <meta property="og:description" content="We are a new graduate based financial journal aimed at providing current and recent students with a platform to display their passion for finance." />
      </Head>

      <div className="mt-16 mb-4" >
        <AboutUsBlock>
          <div className="flex w-full h-full p-4 xl:p-8" >
            <div className="relative flex-shrink-0 w-1/2 lg:w-5/12 h-full" >
              <Image priority src={aboutMen1} alt="about man 1" layout="fill" objectFit="contain" objectPosition="bottom right" />
            </div>
            < AboutUsTextBlock
              topText={<div className="italic"> “To get a job you need experience, but to get experience you need a job”  </div>}
              bottomText=
              "Having graduated university, we were overwhelmed by the competition for entry level finance roles. Emerging Finsights is an aspiring financial student hub that offers young people an opportunity to gain relevant experience whilst producing tangible output to showcase to future employers." />
          </div>
        </AboutUsBlock>

        <p className="text-xl mx-4 my-8 block lg:hidden text-gray-600" >Having graduated university, we were overwhelmed by the competition for entry level finance roles. Emerging Finsights is a financial journal that offers young people an opportunity to gain relevant experience whilst producing tangible output to showcase to future employers.</p>

        <AboutUsBlock extraGradientClasses="to-efs-beige from-efs-logo md:from-efs-beige md:to-efs-logo rounded-none rounded-tr-xl md:rounded-tr-none md:rounded-b-xl" >
          <div className="flex justify-center h-full" >
            <AboutUsTextBlock
              topText="Champion the individual"
              bottomText="We believe in empowering young people, thus allowing them to create their own narrative. The focus at Emerging Finsights is on developing young talent as an early-stage platform to accelerate learning and early career success." />
            <div className="relative flex-shrink-0 w-1/2 lg:w-2/5 h-full" >
              <Image priority src={aboutMan3} alt="about man 1" layout="fill" objectFit="contain" objectPosition="center left " />
            </div>
          </div>
        </AboutUsBlock>

        <p className="text-xl mx-4 my-8 block lg:hidden text-gray-600" > We believe in empowering young people, thus allowing them to create their own narrative. The focus at Emerging Finsights is on developing young talent as an early-stage platform to accelerate learning and early career success.</p>
      </div>

      <div className="bg-[#D6E8DE]">
        <h1 className="px-6 pt-6 my-4 text-4xl lg:text-8xl font-bold text-center text-gray-600 bg-efs-beige rounded-b-full pb-4"> The Team </h1>
        <h2 className="role-text"> </h2>
        {props.data.map(emSection => (
          <div key={emSection.title}>
            <h2 className="py-10 text-3xl xl:text-6xl text-efs-beige text-center capitalize">{emSection.title}</h2>

            <div className="hidden lg:flex flex-wrap items-center justify-around gap-6 mx-auto">
              {emSection.people.filter(employee => employee.efs_status == "active").map(employee => (
                <EmployeeCard key={employee.name} analystInfo={employee} />
              ))}
            </div>

            <div className="overflow-x-auto snap-x snap-mandatory flex lg:hidden gap-16 w-fit max-w-full mx-auto h-fit py-9 px-10">
              {emSection.people.filter(employee => employee.efs_status == "active").map((employee, index) => (
                <div className="snap-center h-full" key={index}>
                  <EmployeeCard key={employee.name} analystInfo={employee} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="bg-efs-beige rounded-t-full w-full pt-10">
          <h1 className="text-3xl font-bold text-center">Interested in Joining?</h1>
          <br />
        </div>
        <div className="bg-efs-beige pb-10">
          <p className="text-xl text-center mx-auto w-11/12 md:w-1/2">Are you a current or recent student interested in finance? Does working in a collaborative, graduate ran company sound interesting to you? If so, we would love to hear from you! Please contact us via email with your CV and a short paragraph on why you’d like to work with us. We will respond as soon as possible.</p>
          <p className="text-center mt-10 hidden md:block md:text-2xl">
            <Link href="mailto:admin@emergingfinsights.co.uk" passHref>
              <a className="hover:underline"> admin@emergingfinsights.co.uk </a>
            </Link>
          </p>
        </div>
      </div>
    </Page >);
}
export default AboutUsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const provider = CMS.getProvider()

  const sections = await provider.getEmployeeSections()

  if (!sections) {
    return { notFound: true }
  }

  return {
    props: {
      data: sections
    }
  }
}