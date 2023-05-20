import { ArticleView } from "@components/elements/ArticleView";
import { Page } from "@components/modules/Page";
import { CMS } from "@services/cms";
import { ArticleFull } from "@services/Schema";
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";

type PartnerArticlePageProps = {
    article: ArticleFull,
}

const PartnerArticlePage: NextPage<PartnerArticlePageProps> = props => {
    return (
        <Page>
            <Head>
                <title>{props.article.title} | Emerging Finsights</title>
                <meta name="description" key="desc" content={props.article.description} />
                <meta property="og:title" content={`${props.article.title} | Emerging Finsights`} />
                <meta property="og:description" content={props.article.description} />
            </Head>
            <ArticleView article={props.article} />
        </Page>)
}

export const getServerSideProps: GetServerSideProps<PartnerArticlePageProps> = async ({ params }) => {
    if (!params) return { notFound: true }

    /* Read slug from url */
    const { partner_slug } = params

    if (!partner_slug) return { notFound: true }

    /* Get Article content */
    const provider = CMS.getProvider()
    const article = await provider.getArticleFromSlug(partner_slug as string)

    if (!article || !(article.category == "partner_news" || article.category == "partner")) return { notFound: true }

    /* pass props to article page */
    return { props: { article: article } }
}

export default PartnerArticlePage;