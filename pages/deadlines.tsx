import { Page } from "@components/modules/Page";
import SocialsSection from "@components/modules/SocialsSection";
import { NextPage } from "next";
import Head from "next/head";

const DeadlinesPage: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>Deadlines | Emerging Finsights</title>
        <meta name="description" key="desc" content="This feature is coming soon! Follow us on Instagram and LinkedIn to be the first to find out." />
        <meta property="og:title" content="Deadlines | Emerging Finsights" />
        <meta property="og:description" content="This feature is coming soon! Follow us on Instagram and LinkedIn to be the first to find out." />
      </Head>
      <h1 className="my-4 text-5xl font-bold text-center">Deadlines</h1>
      <div className="flex flex-col items-center justify-center h-100 my-52">
        <h2 className="text-4xl">COMING SOON!</h2>
      </div>
      {/* <SocialsSection title="Check our socials to find out first"></SocialsSection> */}
    </Page>)
}

export default DeadlinesPage;