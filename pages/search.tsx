import { Page } from "@components/modules/Page"
import { CMS, CreateArticleLink, CreateBookLink, CreateReportLink } from "@services/cms"
import { ArticlePeek, BookPeek, Report } from "@services/Schema"
import Fuse from "fuse.js"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useMemo } from "react"

interface SearchPeek {
    title: string
    author_name: string
    slug: string
    type: "book" | "report" | "article"
    category?: string
    description: string
    thumbnail: string
    thumbnail_alt: string
}

// Get colour from type
const typeGetColour = (type: "book" | "report" | "article") => {
    if (type == "article") {
        return "#6FB2D2"
    }
    else if (type == "book") {
        return "#EBD671"
    }
    else if (type == "report") {
        return "#EEEEEE"
    }

    return ""
}

// Get colour from category
const categoryGetColour = (category: string) => {
    if (category == "esg") {
        return "#C6D57E"
    }
    if (category == "fintech") {
        return "#A2CDCD"
    }

    return ""
}

// Create link for content
const searchPeekMakeLink = (peek: SearchPeek) => {
    if (peek.type == "article" && peek.category != undefined) {
        return CreateArticleLink(peek.category, peek.slug)
    } else if (peek.type == "book") {
        return CreateBookLink(peek.slug)
    } else if (peek.type == "report") {
        return CreateReportLink(peek.slug)
    }

    return ""
}

// Represents a single tag with custom colour and text
const TagBlob = (props: { colour: string, text: string }) => {
    return (<span style={{ backgroundColor: props.colour }} className="inline-block rounded-xl shadow-sm p-2 capitalize">
        {props.text}
    </span>)
}

// Represents a single search result
// Contains a card and divider
// Card is made up of a horizontal flex box where text is allowed to grow and 
// the image is of fixed size
const SearchCard = (props: { peek: SearchPeek }) => {
    return (
        <>
            <Link passHref href={searchPeekMakeLink(props.peek)}>
                <a className="block hover:bg-opacity-5 hover:bg-black rounded-lg">
                    <div className="flex flex-row p-2 md:p-4">
                        {/* Image column, contains vertical centering */}
                        <div className="flex-shrink-0 flex flex-col justify-center items-center">
                            <div className="w-32 h-32 shadow-lg relative">
                                <Image className="rounded-md" src={props.peek.thumbnail} alt={props.peek.thumbnail_alt} layout="fill" objectFit="cover"></Image>
                            </div>
                        </div>

                        {/* Right side content */}
                        <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                            <div className="text-xl">
                                {props.peek.title}
                            </div>
                            <div className="text-sm text-slate-600">
                                {props.peek.author_name}
                            </div>

                            {/* Tags */}
                            <div className="text-sm mt-4 flex flex-cols justify-end gap-1">
                                <TagBlob colour={typeGetColour(props.peek.type)} text={props.peek.type} />
                                {props.peek.category ? (
                                    <TagBlob colour={categoryGetColour(props.peek.category)} text={props.peek.category} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <hr className="mt-2 mb-6 w-full "></hr>
        </>
    )
}

// Translate article to a search peek
const articleToSearchPeek = (peek: ArticlePeek): SearchPeek => {
    return {
        title: peek.title,
        author_name: peek.author.name,
        slug: peek.title_slug,
        type: "article",
        category: peek.category,
        thumbnail: peek.thumbnail,
        thumbnail_alt: peek.thumbnail_alt,
        description: peek.description
    }
}

// Translate book to a search peek
const bookToSearchPeek = (peek: BookPeek): SearchPeek => {
    return {
        title: peek.book_title,
        author_name: peek.review_author.name,
        slug: peek.review_slug,
        type: "book",
        thumbnail: peek.thumbnail,
        thumbnail_alt: peek.book_title,
        description: ""
    }
}

// Translate report to a search peek
const reportToSearchPeek = (peek: Report): SearchPeek => {
    return {
        title: peek.title,
        author_name: peek.authors.reduce((left, right, index) => left + (index != 0 ? ", " : "") + right.name, ""),
        slug: peek.title_slug,
        type: "report",
        thumbnail: peek.thumbnail,
        thumbnail_alt: peek.thumbnail_alt,
        description: peek.description
    }
}

interface SearchProps {
    searchPeeks: SearchPeek[]
}

const SearchPage = (props: SearchProps) => {
    const [queryResults, setQueryResults] = useState<SearchPeek[]>([])
    const searchInputRef = useRef<HTMLInputElement>(null);

    const search = useMemo(() => {
        return new Fuse(props.searchPeeks, { keys: ["title", "description", "type", "category", "author_name"] })
    }, [props.searchPeeks]);

    return (<div className="container px-2 max-w-2xl mx-auto min-h-[70vh]">
        <h1 className="text-center text-3xl mt-10 relative">
            Search
        </h1>
        <input ref={searchInputRef} type="search" className="mt-4 py-2 px-3 w-full border focus:outline-efs-logo"
            placeholder="Enter keyword" onChange={event => {
                event.preventDefault();
                if (searchInputRef.current != null) {
                    setQueryResults(search.search(searchInputRef.current.value).map(result => result.item))
                }
            }
            } />

        <div className="my-6">
            {queryResults.map((peek, index) => <SearchCard key={index} peek={peek}></SearchCard>)}
        </div>
    </div>
    )
}

// Actual search page, dynamic content placed within another component to avoid full page reloads 
// when rerenders are required
const Search: NextPage<SearchProps> = props => {
    return (
        <Page>
            <Head>
                <title>Search | Emerging Finsights</title>
                <meta name="description" key="desc" content="Search through our collection of articles, reports & books reviews" />
                <meta property="og:title" content="Deadlines | Emerging Finsights" />
                <meta property="og:description" content="Search through our collection of articles, reports & books reviews" />
            </Head>

            <SearchPage searchPeeks={props.searchPeeks}></SearchPage>
        </Page>
    )
}
export default Search

export const getServerSideProps: GetServerSideProps<SearchProps> = async ({ params }) => {
    /* Collect all content from site and translate to searchable content */
    const provider = CMS.getProvider()
    const esgArticles = await provider.getArticlePeeks("esg") ?? []
    const fintechArticles = await provider.getArticlePeeks("fintech") ?? []
    const books = await provider.getBookPeeks() ?? []
    const reports = await provider.getReportPeeks() ?? []

    if (esgArticles.length == 0 && fintechArticles.length == 0 && books.length == 0 && reports.length == 0) {
        return { notFound: true }
    }
    return {
        props: {
            searchPeeks: [
                ...esgArticles.map(articleToSearchPeek),
                ...fintechArticles.map(articleToSearchPeek),
                ...books.map(bookToSearchPeek),
                ...reports.map(reportToSearchPeek)
            ]
        }
    }
}


