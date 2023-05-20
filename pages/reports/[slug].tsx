import { ReportView } from "@components/elements/ReportView";
import { Page } from "@components/modules/Page";
import { CMS } from "@services/cms";
import { Report } from "@services/Schema";
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";

type ReportPageProps = {
    report: Report,
}

const ReportPage: NextPage<ReportPageProps> = props => {
    return (
        <Page>
            <Head>
                <title>{props.report.title} | Emerging Finsights</title>
                <meta name="description" key="desc" content={props.report.description} />
                <meta property="og:title" content={`${props.report.title} | Emerging Finsights`} />
                <meta property="og:description" content={props.report.description} />
            </Head>
            <ReportView report={props.report} />
        </Page>)
}

export const getServerSideProps: GetServerSideProps<ReportPageProps> = async ({ params }) => {
    if (!params) return { notFound: true }

    /* Read slug from url */
    const { slug } = params

    if (!slug) return { notFound: true }

    /* Get Report content */

    const provider = CMS.getProvider()
    const report = await provider.getReportFromSlug(slug as string)

    if (!report) return { notFound: true }

    /* pass props to report page */
    return { props: { report: report } }
}

export default ReportPage;