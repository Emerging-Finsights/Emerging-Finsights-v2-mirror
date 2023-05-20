import { Banner } from "@components/layouts/Banner"
import Image from "next/image"
import { Page } from "./Page"
import { Section } from "./Section"
import { ReactNode } from "react"
import { StaticBannerImage } from "@components/elements/StaticBannerImage"
import { ArticlePeek, Employee } from "@services/Schema"
import { ArticleHR } from "./ArticleHR"
import FintechLogo from "@public/partner/fintech-soc.png"
import { PartnershipsAnalysts } from "@components/elements/PartnershipsAnalysts"
import { BannerAnalysts } from "@components/elements/BannerAnalysts"
import { PartnershipsCarousel } from "@components/elements/PartnershipsCarousel"
import PartnershipsSocials from "./PartnershipsSocials"

export interface SectionInfo {
    name: string
    slug: string
    description: string
    peeks: ArticlePeek[]
    news: ArticlePeek[]
}

function getTriplets<T>(list: Array<T>) {
    let triplets = []
    for (let i = 0; i < list.length; i += 3) {
        triplets.push([list[i], list[i + 1], list[i + 2]])
    }
    return triplets
}

/**
 * Creates a new article list page with the given article peeks and section info
 * @param props.sectionInfo The section info which contains the information required to construct the page
 * @returns a new article list page displaying the given section info 
 */
export const PartnershipsListPage = (props: {
    sectionInfo: SectionInfo,
    bannerDesktop: StaticImageData,
    bannerMobile: StaticImageData,
    sectionBarClasses?: string,
    heads: Employee[],
    analysts: Employee[]
}) => {

    // helper component for displaying text on the banner
    const BannerElement = (props: { children?: ReactNode }) => {
        return (
            <div className="font-bold text-3xl md:text-4xl lg:text-6xl text-center">
                {props.children}
            </div>)
    }

    const articleTriples = getTriplets(props.sectionInfo.peeks)
    const newsTriples = getTriplets(props.sectionInfo.news)

    return (
        <Page>
            <div className="mx-auto text-center w-auto h-auto">
                <Image src={FintechLogo} alt="Fintech Society" />
            </div>
            <Banner backgroundImage={<StaticBannerImage imageClasses="filter brightness-75" imageAltText={`${props.sectionInfo.name} banner image`}
                desktopImage={props.bannerDesktop}
                mobileImage={props.bannerMobile} />}>

                {/* Two flex boxes to contain the first and second row of text */}
                <div className='w-full h-full text-white'>

                    {/* First row for section name */}
                    <div className="flex items-center justify-center h-1/3">
                        <BannerElement>
                            <BannerAnalysts analysts={props.heads} />
                        </BannerElement>
                    </div>

                    {/* Second row for section stats */}
                    <div className="bottom-0 2xl:bottom-10 absolute w-full mb-0 3xl:mb-20 hidden lg:block">
                        <div className="text-base xl:text-lg 2xl:text-xl 3xl:text-3xl text-center bg-black bg-opacity-30">
                            {props.sectionInfo.description}
                        </div>
                    </div>

                </div>
            </Banner>

            <div className="text-3xl text-center mt-5">Meet The Analysts</div>

            <PartnershipsAnalysts analysts={props.analysts} />

            {/* Display list of article peeks for this section */}
            <Section title="Latest Posts" barContainerClasses="bg-black bg-opacity-60 pb-16" barClasses={props.sectionBarClasses}>
                {articleTriples.length > 0 ? <PartnershipsCarousel title="Articles" articleTriples={articleTriples} partnerSlug={props.sectionInfo.slug} /> : null}
                {newsTriples.length > 0 ?
                    <>
                        <ArticleHR lineClasses="border-black bg-black mx-auto w-11/12 mb-8" />
                        <PartnershipsCarousel title="News" articleTriples={newsTriples} partnerSlug={props.sectionInfo.slug} />
                    </> : null}
            </Section>

            <Section title="Learn More About Us" barClasses={props.sectionBarClasses}>
                <PartnershipsSocials></PartnershipsSocials>
            </Section>
        </Page>
    )
}

