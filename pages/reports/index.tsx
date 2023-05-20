import { ReportCard } from "@components/elements/ReportCard"
import { Banner } from "@components/layouts/Banner"
import { GridLayout } from "@components/layouts/GridLayout"
import { Page } from "@components/modules/Page"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { StaticBannerImage } from "@components/elements/StaticBannerImage"


import bannerDesktop from "@public/banners/reports-banner.webp"
import bannerMobile from "@public/banners/reports-banner-phone.webp"
import { ReactNode } from "react"
import { Section } from "@components/modules/Section"
import { CMS } from "@services/cms"
import { Report } from "@services/Schema"

interface SectionInfo {
    peeks: Report[]
}

const ReportListPage: NextPage<SectionInfo> = props => {
    // helper component for displaying text on the banner
    const BannerElement = (props: { children?: ReactNode }) => {
        return (
            <div className="text-3xl font-bold text-center md:text-4xl lg:text-6xl">
                {props.children}
            </div>)
    }
    return (
        <Page>
            <Head>
                <title>Reports | Emerging Finsights</title>
                <meta name="description" key="desc" content="Find the latest business reports on ESG and FinTech. " />
                <meta property="og:title" content="Reports | Emerging Finsights" />
                <meta property="og:description" content="Find the latest business reports on ESG and FinTech. " />
            </Head>
            <Banner backgroundImage={<StaticBannerImage imageAltText={`reports banner image`}
                desktopImage={bannerDesktop}
                mobileImage={bannerMobile} />}>
                {/* Two flex boxes to contain the first and second row of text */}
                <div className='w-full h-full text-white'>

                    {/* First row for section name */}
                    <div className="flex items-center justify-center h-1/3">
                        <BannerElement>
                            Reports
                        </BannerElement>
                    </div>
                </div>
            </Banner>

            <Section title="All Reports" barClasses="bg-black">
                <div className="container mx-auto">
                    <GridLayout>
                        {props.peeks.map((peek, index) =>
                            <ReportCard key={index} report={peek} />)
                        }
                    </GridLayout>
                </div>
            </Section>
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const provider = CMS.getProvider()

    const reports = await provider.getReportPeeks();
    if (reports == null) {
        return {
            notFound: true
        }
    }
    else {
        return {
            props: {
                name: "Reports",
                peeks: reports
            }
        }
    }
}

export default ReportListPage