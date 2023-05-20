import { GetServerSideProps } from "next"

import Head from "next/head";
import { CMS } from "@services/cms";
import { Partner } from "@services/Schema";

const PartnershipsArticleListPage = (props: { partners: Partner[] }) => {

    return (
        <>
            <Head>
                <title>Partnerships | Emerging Finsights</title>
                <meta name="description" key="desc" content="" />
                <meta property="og:title" content="Partnerships | Emerging Finsights" />
                <meta property="og:description" content="" />
            </Head>
            <div>
                Partners
                {props.partners.map((partner, index) => (<div key={index}>{partner.name}</div>))}
            </div>
        </>

    )
}
export default PartnershipsArticleListPage;

export const getServerSideProps: GetServerSideProps = async () => {
    /* Get articles and writers  */
    const provider = CMS.getProvider()
    const partners = await provider.getPartners()

    if (partners == null) { notFound: true }

    return { props: { partners } }
    // const articles = await provider.getArticlePeeks("fintech")
    // const a = await provider.getEmployeeSections()
    // if (!articles || !a) return { notFound: true }

    // return { props: { articlePeeks: articles, heads: a[0].people, analysts: a[1].people } }
}