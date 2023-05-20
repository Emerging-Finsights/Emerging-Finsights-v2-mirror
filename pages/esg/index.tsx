import { ArticleListPage, SectionInfo } from "@components/modules/ArticleListPage";
import { GetServerSideProps, NextPage } from "next"

import BannerDesktop from "@public/banners/esg-banner.webp"
import BannerMobile from "@public/banners/esg-banner-phone.webp"
import Head from "next/head";
import { CMS } from "@services/cms";
import { ArticlePeek } from "@services/Schema";

type EsgArticleListProps = {
    articlePeeks: ArticlePeek[],
    numEmployees: number
}

const EsgArticleListPage: NextPage<EsgArticleListProps> = props => {
    const info: SectionInfo = {
        name: "ESG",
        slug: "esg",
        peeks: props.articlePeeks,
        backgroundColour: "bg-efs-green",
        numEmployees: props.numEmployees
    }

    return (
        <>
            <Head>
                <title>ESG Articles | Emerging Finsights</title>
                <meta name="description" key="desc" content="Keep up to date with the latest Environmental, Social and Governance (ESG) news with articles written by students and graduates. " />
                <meta property="og:title" content="ESG Articles | Emerging Finsights" />
                <meta property="og:description" content="Keep up to date with the latest Environmental, Social and Governance (ESG) news with articles written by students and graduates. " />
            </Head>
            <ArticleListPage
                sectionInfo={info}
                bannerDesktop={BannerDesktop}
                bannerMobile={BannerMobile}
                sectionBarClasses="bg-efs-green"
                sectionLineClasses="bg-efs-green border-efs-green" />
        </>

    )
}
export default EsgArticleListPage;

export const getServerSideProps: GetServerSideProps<EsgArticleListProps> = async () => {
    /* Get articles and writers  */
    const provider = CMS.getProvider()
    const articles = await provider.getArticlePeeks("esg")
    const numEmployees = await provider.getNumberOfEmploeesInSection("ESG")

    if (!articles || !numEmployees) return { notFound: true }

    return { props: { articlePeeks: articles, numEmployees: numEmployees } }
}