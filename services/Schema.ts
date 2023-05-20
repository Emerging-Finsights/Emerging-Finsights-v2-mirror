export type Category = "esg" | "fintech" | "capital-markets" | "partner" | "partner_news"
export type EFSStatus = "active" | "inactive"

export function StringIsCategory(s: string): s is Category {
    return s == "esg" || s == "fintech" || s == "partner" || s == "partner_news" || s == "capital-markets"
}

export function CategoryToString(s: Category) {
    if (s == "partner_news") { return "partner news" }
    else { return s }
}

export function StringIsEFSStatus(s: string): s is EFSStatus {
    return s == "active" || s == "inactive"
}

export interface Employee {
    name: string,
    position: string,
    thumbnail: string,
    degree: string,
    interests: string,
    fact: string,
    linkedin: string,
    efs_status: EFSStatus
}

export interface EmployeeSection {
    title: string
    people: Employee[]
}

export interface Partner {
    id: string
    name: string
    slug: string
    logo: string
    logo_alt: string
    description: string
    description_meta: string
    external_site_link: string
    partnered_heads: Employee[]
    partnered_analysts: Employee[]
}

export interface ArticlePeek {
    title: string
    title_slug: string
    description: string
    category: Category
    date: number
    thumbnail: string,
    thumbnail_alt: string
    thumbnail_caption?: string
    author: Employee
    article_of_the_month: boolean
}

export interface ArticleFull extends ArticlePeek {
    content: string
}

export interface Report {
    title: string
    title_slug: string
    description: string
    date: number
    thumbnail: string
    thumbnail_alt: string
    thumbnail_caption: string | null
    pdf_link: string
    authors: Employee[]
}

export interface BookPeek {
    book_title: string
    review_slug: string
    date: number
    affiliate_link: string
    thumbnail: string
    author_name: string
    review_author: Employee
    rating_readability: number
    rating_research_depth: number
    rating_length: number
    rating_relevance: number
    rating_education: number
    book_of_the_month: boolean
}

export interface BookFull extends BookPeek {
    content: string
}

export type SocialType = "linkedin" | "twitter" | "instagram" | "facebook"

export function StringIsSocialType(s: string): s is SocialType {
    return s == "linkedin" || s == "twitter" || s == "instagram" || s == "facebook"
}

export interface Social {
    type: SocialType
    link: string
}

export interface AlumniCompany {
    name: string
    logo_url: string
    logo_alt: string
    link: string
}

export interface AlumniPerson {
    name: string
    position: string
    company_position: string
    thumbnail: string
    main_text: string
    main_quote: string

    socials: Social[]
    company: AlumniCompany
}

export interface AlumniPage {
    topPerson: AlumniPerson
    bottomPerson: AlumniPerson
}

export function getOverallRating(book: BookPeek): number {
    return (book.rating_readability +
        book.rating_research_depth +
        book.rating_length +
        book.rating_relevance +
        book.rating_education) / 5
}