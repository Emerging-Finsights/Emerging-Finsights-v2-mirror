import { Banner } from "@components/layouts/Banner"
import { GridLayout } from "@components/layouts/GridLayout"

import { StaticBannerImage } from "@components/elements/StaticBannerImage"
import Counter from "@components/elements/Counter"
import { ReactNode } from "react"
import { BookCard } from "@components/elements/BookCard"
import { Section } from "@components/modules/Section"
import { Page } from "@components/modules/Page"
import { GetServerSideProps, NextPage } from "next"

import bannerDesktop from "@public/banners/book-banner.png"
import bannerMobile from "@public/banners/book-banner-phone.png"
import { HighlightedBooks } from "@components/layouts/HighlightedBooks"
import Head from "next/head"
import { BookPeek } from "@services/Schema"
import { CMS, GetBookOfTheMonth } from "@services/cms"

export interface BookListProps {
    peeks: BookPeek[]
}

const BookListPage: NextPage<BookListProps> = props => {

    // helper component for displaying text on the banner
    const BannerElement = (props: { children?: ReactNode }) => {
        return (
            <div className="text-3xl font-bold text-center md:text-4xl lg:text-6xl p-2">
                {props.children}
            </div>)
    }

    const botm = GetBookOfTheMonth(props.peeks)
    const numAnalysts = new Set(props.peeks.map(peek => peek.review_author.name)).size

    return (
        <Page>
            <Head>
                <title>Books | Emerging Finsights</title>
                <meta name="description" key="desc" content="Find our book recommendations for students and graduates looking to break into finance. " />
                <meta property="og:title" content="Books | Emerging Finsights" />
                <meta property="og:description" content="Find our book recommendations for students and graduates looking to break into finance. " />
            </Head>
            <Banner backgroundImage={<StaticBannerImage imageAltText={`books banner image`}
                desktopImage={bannerDesktop}
                mobileImage={bannerMobile} />}>

                {/* Two flex boxes to contain the first and second row of text */}
                <div className='w-full h-full text-white'>

                    {/* First row for section name */}
                    <div className="flex items-center justify-center h-1/3">
                        <BannerElement>
                            Books
                        </BannerElement>
                    </div>

                    {/* Second row for section stats */}
                    <div className="flex items-center justify-around h-1/2">
                        <BannerElement>
                            Books Reviewed
                            <br />
                            <span className="inline-block mt-4">
                                <Counter endNum={props.peeks.length} />
                            </span>
                        </BannerElement>

                        <BannerElement>
                            Reviewers
                            <br />
                            <span className="inline-block mt-4">
                                <Counter endNum={numAnalysts} />
                            </span>
                        </BannerElement>
                    </div>

                </div>
            </Banner>

            <Section title="Highlighted books" barClasses="bg-efs-brown" barContainerClasses="bg-black bg-opacity-60 pb-20 hidden md:block">
                {botm != null ? <HighlightedBooks botm={botm} latest={props.peeks} /> : null}
            </Section>

            <Section title="All Books" barClasses="bg-efs-brown">
                <div className="container mx-auto">
                    <GridLayout>
                        {props.peeks.map((peek, index) =>
                            <BookCard key={index} book={peek} />)
                        }
                    </GridLayout>
                </div>
            </Section>
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps<BookListProps> = async () => {
    const provider = CMS.getProvider()
    const books = await provider.getBookPeeks();

    if (books == null) return { notFound: true }

    return {
        props: {
            peeks: books
        }
    }
}

export default BookListPage