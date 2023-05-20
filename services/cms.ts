import slugify from "slugify"
import { ContentProvider } from "./ContentProvider"
import { DirectusProvider } from "./DirectusProvider"
import { ArticlePeek, BookPeek } from "./Schema"

const USE_LIVE_CMS: boolean = !(process.env.USE_MOCK_CMS != undefined ? process.env.USE_MOCK_CMS == "true" : false)

export class CMS {

    private static contentProvider?: ContentProvider

    static getProvider(): ContentProvider {
        if (!CMS.contentProvider) {
            CMS.contentProvider = new DirectusProvider()
        }

        return CMS.contentProvider
    }
}


export function GetBookOfTheMonth(books: BookPeek[]): BookPeek {
    let bookOfTheMonth: BookPeek | null = null

    /* Get most recent article of the month */
    for (const book of books) {
        if (book.book_of_the_month) {
            if (bookOfTheMonth == null || (bookOfTheMonth.date < book.date)) {
                bookOfTheMonth = book
            }
        }
    }

    /* Choose first article if non found */
    if (bookOfTheMonth == null) {
        bookOfTheMonth = books[0]
    }

    return bookOfTheMonth
}



/**
 * Get the article of the month from a given list of articles
 * @param articles The articles to search
 * @returns The latest article of the month or any article if no articles of the month are found
 */
export function GetArticleOfTheMonth(articles: ArticlePeek[]): ArticlePeek | null {
    let articleOfTheMonth: ArticlePeek | null = null

    /* Get most recent article of the month */
    for (const article of articles) {
        if (article.article_of_the_month) {
            if (articleOfTheMonth == null || (articleOfTheMonth.date < article.date)) {
                articleOfTheMonth = article
            }
        }
    }

    /* Choose first article if non found */
    if (articleOfTheMonth == null && articles.length > 0) {
        //articleOfTheMonth = articles[0]
        articleOfTheMonth = null;
    }

    return articleOfTheMonth
}

/**
 * Creates a link for a given article 
 * @param category The articles category
 * @param slug The articles slug
 * @returns The new link
 * @todo Sanitize input 
 */
export function CreateArticleLink(category: string, slug: string): string {
    return `/${category}/${slug}`
}

/**
 * @param author_name Name of the author
 * @returns Creates a link to the about-us entry to the 
 */
export function CreateAnalystLink(author_name: string, isActive: boolean): string {
    if (isActive) {
        return `/about-us/#${slugify(author_name, { lower: true })}`

    }
    return "/about-us/"
}

/**
 * @param category Name of the category
 * @returns A link to the category
 */
export function CreateCategoryLink(category: string): string {
    return `/${category}`
}

/**
 * Creates a link for a given report 
 * @param slug The reports slug
 * @returns The new link
 * @todo Sanitize input 
 */
export function CreateReportLink(slug: string): string {
    return `/reports/${slug}`
}

export function CreateBookLink(slug: string): string {
    return `/books/${slug}`
}