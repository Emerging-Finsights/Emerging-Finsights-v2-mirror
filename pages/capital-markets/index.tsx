import { ArticleListPage, SectionInfo } from "@components/modules/ArticleListPage";
import { GetServerSideProps, NextPage } from "next"

import BannerDesktop from "@public/stock-market.jpg"
import BannerMobile from "@public/stock-market.jpg"
import Head from "next/head";
import { CMS } from "@services/cms";
import { ArticlePeek } from "@services/Schema";

type CapitalMarketsArticleListProps = {
    articlePeeks: ArticlePeek[],
    numEmployees: number
}

const CapitalMarketsArticleListPage: NextPage<CapitalMarketsArticleListProps> = props => {
    const info: SectionInfo = {
        name: "Capital Markets",
        slug: "capital-markets",
        peeks: props.articlePeeks,
        backgroundColour: "bg-efs-salmon",
        numEmployees: props.numEmployees
    }

    return (
        <>
            <Head>
                <title>Capital Markets Articles | Emerging Finsights</title>
                <meta name="description" key="desc" content=" " />
                <meta property="og:title" content="Capital Markets Articles | Emerging Finsights" />
                <meta property="og:description" content="" />
            </Head>
            <ArticleListPage
                sectionInfo={info}
                bannerDesktop={BannerDesktop}
                bannerMobile={BannerMobile}
                sectionBarClasses="bg-[#F3686A]"
                sectionLineClasses="bg-[#F3686A] border-[#F3686A]   " />
        </>

    )
}
export default CapitalMarketsArticleListPage;

export const getServerSideProps: GetServerSideProps<CapitalMarketsArticleListProps> = async () => {
    /* Get articles and writers  */
    const provider = CMS.getProvider()
    const articles = await provider.getArticlePeeks("capital-markets")
    const numEmployees = await provider.getNumberOfEmploeesInSection("Capital Markets");

    if (!articles || !numEmployees) return { notFound: true }

    return { props: { articlePeeks: articles, numEmployees: numEmployees } }
}