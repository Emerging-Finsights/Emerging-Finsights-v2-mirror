import { Banner } from "@components/layouts/Banner"
import { GridLayout } from "@components/layouts/GridLayout"
import { Page } from "./Page"
import { Section } from "./Section"

import Counter from "@components/elements/Counter"
import { ReactNode } from "react"
import { StaticBannerImage } from "@components/elements/StaticBannerImage"
import { ArticleCard } from "@components/elements/ArticleCard"
import { TriLayout } from "@components/layouts/HighlightedArticles"
import { GetArticleOfTheMonth } from "@services/cms"
import { ArticlePeek } from "@services/Schema"
import { ArticleHR } from "./ArticleHR"

export type SectionBackgroundColour = "bg-efs-green" | "bg-efs-brown" | "bg-efs-logo" | "bg-efs-gray" | "bg-efs-orange" | "bg-efs-salmon"

export interface SectionInfo {
    name: string
    slug: string
    peeks: ArticlePeek[]
    backgroundColour: SectionBackgroundColour
    numEmployees: number
}

/**
 * Creates a new article list page with the given article peeks and section info
 * @param props.sectionInfo The section info which contains the information required to construct the page
 * @returns a new article list page displaying the given section info 
 */
export const ArticleListPage = (props: { sectionInfo: SectionInfo, bannerDesktop: StaticImageData, bannerMobile: StaticImageData, sectionBarClasses?: string, sectionLineClasses?: string }) => {

    // helper component for displaying text on the banner
    const BannerElement = (props: { children?: ReactNode }) => {
        return (
            <div className="font-bold text-3xl md:text-4xl lg:text-6xl text-center p-2">
                {props.children}
            </div>)
    }

    const aotm = GetArticleOfTheMonth(props.sectionInfo.peeks);
    const articlesOfTheMonth = props.sectionInfo.peeks.filter(article => article.article_of_the_month).slice(1);

    return (
        <Page>
            <Banner backgroundImage={<StaticBannerImage imageAltText={`${props.sectionInfo.name} banner image`}
                desktopImage={props.bannerDesktop}
                mobileImage={props.bannerMobile} />}>

                {/* Two flex boxes to contain the first and second row of text */}
                <div className='w-full h-full text-white'>

                    {/* First row for section name */}
                    <div className="flex items-center justify-center h-1/3">
                        <BannerElement>
                            {props.sectionInfo.name}
                        </BannerElement>
                    </div>

                    {/* Second row for section stats */}
                    <div className="flex items-center justify-around h-1/2">
                        <BannerElement>
                            Articles written
                            <br />
                            <span className="inline-block mt-4">
                                <Counter endNum={props.sectionInfo.peeks.length} />
                            </span>
                        </BannerElement>

                        <BannerElement>
                            Analysts hired
                            <br />
                            <span className="inline-block mt-4">
                                <Counter endNum={props.sectionInfo.numEmployees} />
                            </span>
                        </BannerElement>
                    </div>

                </div>
            </Banner>

            <Section title="Highlighted Articles" barContainerClasses="bg-black bg-opacity-60 hidden md:block" barClasses={props.sectionBarClasses}>
                <TriLayout cardBackgroundColour={props.sectionInfo.backgroundColour}
                    aotm={aotm!}
                    latestArticle={props.sectionInfo.peeks[0]}
                    prevAotm={articlesOfTheMonth} />
            </Section>

            {/* Display list of article peeks for this section */}
            <Section title="All Articles" barClasses={props.sectionBarClasses}>
                <div className="container mx-auto">
                    <GridLayout>
                        {props.sectionInfo.peeks.map((peek, index) =>
                            <div key={index}>
                                <ArticleCard analystBarColour={props.sectionInfo.backgroundColour} key={index} article={peek} />
                                <ArticleHR lineClasses={props.sectionLineClasses} />
                            </div>
                        )
                        }
                    </GridLayout>
                </div>
            </Section>
        </Page>
    )
}

