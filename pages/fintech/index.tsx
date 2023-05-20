import { ArticleListPage, SectionInfo } from "@components/modules/ArticleListPage";
import { GetServerSideProps, NextPage } from "next"

import BannerDesktop from "@public/banners/fintech-banner.webp"
import BannerMobile from "@public/banners/fintech-banner-phone.webp"
import Head from "next/head";
import { CMS } from "@services/cms";
import { ArticlePeek } from "@services/Schema";

type FintechArticleListProps = {
    articlePeeks: ArticlePeek[],
    numEmployees: number
}

const FintechArticleListPage: NextPage<FintechArticleListProps> = props => {
    const info: SectionInfo = {
        name: "Fintech",
        slug: "fintech",
        peeks: props.articlePeeks,
        backgroundColour: "bg-efs-logo",
        numEmployees: props.numEmployees
    }

    return (
        <>
            <Head>
                <title>Fintech Articles | Emerging Finsights</title>
                <meta name="description" key="desc" content="Keep up to date with the latest FinTech news with articles written by students and graduates. " />
                <meta property="og:title" content="Fintech Articles | Emerging Finsights" />
                <meta property="og:description" content="Keep up to date with the latest FinTech news with articles written by students and graduates. " />
            </Head>
            <ArticleListPage
                sectionInfo={info}
                bannerDesktop={BannerDesktop}
                bannerMobile={BannerMobile}
                sectionBarClasses="bg-efs-logo"
                sectionLineClasses="bg-efs-logo border-efs-logo" />
        </>

    )
}
export default FintechArticleListPage;

export const getServerSideProps: GetServerSideProps<FintechArticleListProps> = async () => {
    /* Get articles and writers  */
    const provider = CMS.getProvider()
    const articles = await provider.getArticlePeeks("fintech")
    const numEmployees = await provider.getNumberOfEmploeesInSection("Fintech")

    if (!articles || !numEmployees) return { notFound: true }

    return { props: { articlePeeks: articles, numEmployees: numEmployees } }
}