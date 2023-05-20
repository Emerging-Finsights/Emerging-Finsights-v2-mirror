import { PartnershipsListPage, SectionInfo } from "@components/modules/PartnershipsListPage";
import { GetServerSideProps, NextPage } from "next"

import BannerDesktop from "@public/partner/partner-banner.webp"
import BannerMobile from "@public/partner/partner-banner-phone.webp"
import Head from "next/head";
import { CMS } from "@services/cms";
import { ArticlePeek, Partner } from "@services/Schema";

type PartnershipsArticleListProps = {
    partner: Partner
    articles: ArticlePeek[]
    news: ArticlePeek[]
}

const PartnershipsArticleListPage: NextPage<PartnershipsArticleListProps> = props => {
    const info: SectionInfo = {
        name: props.partner.name,
        slug: props.partner.slug,
        peeks: props.articles,
        news: props.news,
        description: props.partner.description,
    }

    return (
        <>
            <Head>
                <title>Partnerships | Emerging Finsights</title>
                <meta name="description" key="desc" content={props.partner.description_meta} />
                <meta property="og:title" content="Partnerships | Emerging Finsights" />
                <meta property="og:description" content={props.partner.description_meta} />
            </Head>
            <PartnershipsListPage
                sectionInfo={info}
                bannerDesktop={BannerDesktop}
                bannerMobile={BannerMobile}
                sectionBarClasses="bg-efs-orange"
                heads={props.partner.partnered_heads}
                analysts={props.partner.partnered_analysts} />
        </>

    )
}
export default PartnershipsArticleListPage;

export const getServerSideProps: GetServerSideProps<PartnershipsArticleListProps> = async ({ params }) => {
    if (!params) return { notFound: true }

    /* Read slug from url */
    const { slug } = params

    if (!slug) return { notFound: true }

    /* Get articles and writers  */
    const provider = CMS.getProvider()

    const partner = await provider.getPartnerFromSlug(slug as string)
    if (!partner) {
        return { notFound: true }
    }

    const articles = await provider.getPartneredArticles(partner.id, "partner")
    const news = await provider.getPartneredNews(partner.id, "partner_news")

    if (!articles || !news) return { notFound: true }

    return { props: { partner: partner, articles: articles, news: news } }
}