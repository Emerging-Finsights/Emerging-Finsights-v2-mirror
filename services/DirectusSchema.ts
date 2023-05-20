import { ID, PartialItem, TypeMap } from "@directus/sdk";
import { CreateDirectusBookThumbnailURL, CreateDirectusImageURL, CreateDirectusThumbnailURL } from "./DirectusUtils";
import { AlumniCompany, AlumniPage, AlumniPerson, ArticleFull, ArticlePeek, BookFull, BookPeek, Employee, EmployeeSection, Partner, Report, Social, StringIsCategory, StringIsEFSStatus, StringIsSocialType } from "./Schema";

export interface DirectusPartnedFk {
    // directus_users_id: DirectusUser
    partner_id: ID
}

export interface DirectusUser {
    first_name: string
    last_name: string
    avatar: ID
    position: string
    degree: string
    interests: string
    fact: string
    linkedin: string
    efs_status: string
    partnered_fk: DirectusPartnedFk
}

export interface DirectusUserSectionUser {
    directus_users_id: DirectusUser
}

export interface DirectusUserSection {
    title: string
    people: DirectusUserSectionUser[]
}

export interface DirectusPartnerHead {
    directus_users_id: DirectusUser
}

export interface DirectusPartnerAnalyst {
    directus_users_id: DirectusUser
}

export interface DirectusPartner {
    id: ID
    name: string
    slug: string
    logo: ID
    description: string
    description_meta: string
    external_site: string
    partnered_heads: DirectusPartnerHead[]
    partnered_analysts: DirectusPartnerAnalyst[]
}

export interface DirectusImage {
    id: ID
    description: string
}

export interface DirectusArticle {
    title: string
    title_slug: string
    category: string
    description: string

    thumbnail: DirectusImage
    thumbnail_caption: string
    publish_date: string
    approved: boolean
    status: string

    content: string

    writer: DirectusUser

    article_of_the_month: boolean
}

export interface DirectusReportAuthor {
    id: ID
    reports_id: ID
    directus_users_id: DirectusUser
}

export interface DirectusReport {
    title: string
    title_slug: string
    description: string

    thumbnail: ID
    thumbnail_alt: string
    thumbnail_caption: string

    publish_date: string
    authors: DirectusReportAuthor[]

    pdf_link: string
}

export interface DirectusBook {
    book_title: string
    book_title_slug: string
    status: string
    publish_date: string
    approved: boolean
    author_name: string
    book_cover: ID


    affiliate_link: string
    tags: string[]

    readability: number
    depth_of_research: number
    length: number
    relevance: number
    educational: number

    book_of_the_month: boolean
    review_writer: DirectusUser
    review_content: string
}


/* Alumni */

export interface DirectusAlumniCompany {
    name: string
    logo: DirectusImage
    link: string
}

export interface DirectusAlumniSocial {
    social_type: string
    social_link: string
}

export interface DirectusAlumniPerson {
    person: DirectusUser
    company_position: string
    main_text: string
    main_quote: string
    company: DirectusAlumniCompany
    socials: DirectusAlumniSocial[]
}

export interface DirectusAlumniPage {
    first_alumni_section: DirectusAlumniPerson
    second_alumni_section: DirectusAlumniPerson
}

export interface DirectusCollections extends TypeMap {
    articles: DirectusArticle
    book_reviews: DirectusBook
    reports: DirectusReport
    directus_users: DirectusUser
    reports_directus_users: DirectusReportAuthor
    about_us_sections: DirectusUserSection
    partner: DirectusPartner
    partner_directus_users: DirectusPartnerHead
    partner_directus_users_2: DirectusPartnerAnalyst

    Alumni: DirectusAlumniPage
    almnui_entry: DirectusAlumniPerson
    almnui_company: DirectusAlumniCompany
}

export function DirectusUserToEmployee(user: PartialItem<DirectusUser>): Employee | null {
    if (user.first_name == undefined ||
        user.last_name == undefined ||
        user.avatar == undefined ||
        user.position == undefined ||
        user.degree == undefined ||
        user.interests == undefined ||
        user.fact == undefined ||
        user.efs_status == undefined ||
        user.linkedin == undefined
    ) {
        return null
    }

    if (!StringIsEFSStatus(user.efs_status)) {
        return null
    }

    return {
        name: user.first_name + " " + user.last_name,
        degree: user.degree,
        interests: user.interests,
        thumbnail: CreateDirectusImageURL(user.avatar),
        position: user.position,
        fact: user.fact,
        linkedin: user.linkedin,
        efs_status: user.efs_status
    }
}


export function DirectusUserSectionToEmployeeSection(section: PartialItem<DirectusUserSection>): EmployeeSection | null {

    if (section.title == undefined ||
        section.people == undefined) {
        return null
    }

    return {
        title: section.title,
        people: section.people
            .map(person => (person && person.directus_users_id) ? DirectusUserToEmployee(person.directus_users_id) : null)
            .filter((person): person is Employee => person != null)
    }
}

export function DirectusArticleToArticlePeek(article: PartialItem<DirectusArticle>): ArticlePeek | null {

    /* Check requirements are fullfiled */
    if (article.title == undefined ||
        article.title_slug == undefined ||
        article.category == undefined ||
        // article.description == undefined ||
        article.thumbnail == undefined ||
        article.thumbnail.id == undefined ||
        // article.thumbnail_caption == undefined ||
        article.publish_date == undefined ||
        article.article_of_the_month == undefined ||
        article.writer == undefined) {
        return null
    }

    /* Check that the article has a valid category */
    if (!StringIsCategory(article.category)) {
        return null
    }

    /* Fetch writer */
    const writer = DirectusUserToEmployee(article.writer)

    if (!writer) {
        return null
    }

    /* Perform conversion */
    return {
        title: article.title,
        title_slug: article.title_slug,
        description: article.description ?? "",
        category: article.category,
        date: new Date(article.publish_date).valueOf(),
        thumbnail: CreateDirectusThumbnailURL(article.thumbnail.id, "cover", 256, 256, 30),
        thumbnail_alt: article.thumbnail.description ?? "",
        thumbnail_caption: article.thumbnail_caption,
        author: writer,
        article_of_the_month: article.article_of_the_month
    }
}

export function DirectusArticleToArticleFull(article: PartialItem<DirectusArticle>): ArticleFull | null {
    /* Check requirements are fullfiled */
    if (article.title == undefined ||
        article.title_slug == undefined ||
        article.category == undefined ||
        // article.description == undefined ||
        article.thumbnail == undefined ||
        article.thumbnail.id == undefined ||
        // article.thumbnail_caption == undefined ||
        article.publish_date == undefined ||
        article.content == undefined ||
        article.article_of_the_month == undefined ||
        article.writer == undefined) {
        return null
    }

    if (!StringIsCategory(article.category)) {
        return null
    }

    const writer = DirectusUserToEmployee(article.writer)

    if (!writer) {
        return null
    }

    /* Perform conversion */
    return {
        title: article.title,
        title_slug: article.title_slug,
        description: article.description ?? "",
        category: article.category,
        date: new Date(article.publish_date).valueOf(),
        thumbnail: CreateDirectusImageURL(article.thumbnail.id),
        thumbnail_alt: article.thumbnail.description ?? "",
        thumbnail_caption: article.thumbnail_caption,
        author: writer,
        article_of_the_month: article.article_of_the_month,
        content: article.content
    }
}

export function DirectusBookToBookPeek(book: PartialItem<DirectusBook>): BookPeek | null {
    /* Check requirements are fullfiled */
    if (book.book_title == undefined ||
        book.book_title_slug == undefined ||
        book.status == undefined ||
        book.publish_date == undefined ||
        book.author_name == undefined ||
        book.book_cover == undefined ||
        book.affiliate_link == undefined ||
        // book.tags == undefined ||
        book.readability == undefined ||
        book.depth_of_research == undefined ||
        book.length == undefined ||
        book.relevance == undefined ||
        book.educational == undefined ||
        book.book_of_the_month == undefined ||
        book.review_writer == undefined) {
        return null
    }

    const writer = DirectusUserToEmployee(book.review_writer)

    if (!writer) {
        return null
    }

    /* Perform conversion */
    return {
        book_title: book.book_title,
        review_slug: book.book_title_slug,
        date: new Date(book.publish_date).valueOf(),
        affiliate_link: book.affiliate_link,
        thumbnail: CreateDirectusBookThumbnailURL(book.book_cover),
        author_name: book.author_name,
        review_author: writer,
        rating_readability: book.readability,
        rating_research_depth: book.depth_of_research,
        rating_length: book.length,
        rating_relevance: book.relevance,
        rating_education: book.educational,
        book_of_the_month: book.book_of_the_month,
    }
}


export function DirectusBookToBookFull(book: PartialItem<DirectusBook>): BookFull | null {
    /* Check requirements are fullfiled */
    if (book.book_title == undefined ||
        book.book_title_slug == undefined ||
        book.status == undefined ||
        book.publish_date == undefined ||
        book.author_name == undefined ||
        book.book_cover == undefined ||
        book.affiliate_link == undefined ||
        // book.tags == undefined ||
        book.readability == undefined ||
        book.depth_of_research == undefined ||
        book.length == undefined ||
        book.relevance == undefined ||
        book.educational == undefined ||
        book.book_of_the_month == undefined ||
        book.review_writer == undefined ||
        book.review_content == undefined) {
        return null
    }

    const writer = DirectusUserToEmployee(book.review_writer)

    if (!writer) {
        return null
    }

    /* Perform conversion */
    return {
        book_title: book.book_title,
        review_slug: book.book_title_slug,
        date: new Date(book.publish_date).valueOf(),
        affiliate_link: book.affiliate_link,
        thumbnail: CreateDirectusBookThumbnailURL(book.book_cover),
        author_name: book.author_name,
        review_author: writer,
        rating_readability: book.readability,
        rating_research_depth: book.depth_of_research,
        rating_length: book.length,
        rating_relevance: book.relevance,
        rating_education: book.educational,
        book_of_the_month: book.book_of_the_month,
        content: book.review_content
    }
}


export function DirectusReportToReport(report: PartialItem<DirectusReport>): Report | null {
    /* Check requirements are fullfiled */
    if (report.title == undefined ||
        report.title_slug == undefined ||
        // report.description == undefined ||
        report.thumbnail == undefined ||
        // report.thumbnail_alt == undefined ||
        // report.thumbnail_caption == undefined ||
        report.publish_date == undefined ||
        report.authors == undefined ||
        report.pdf_link == undefined)
        return null

    const writers = report.authors
        .map(author => (author && author.directus_users_id) ? DirectusUserToEmployee(author.directus_users_id) : null)
        .filter((author): author is Employee => author != null)

    /* Perform conversion */
    return {
        title: report.title,
        title_slug: report.title_slug,
        description: report.description ?? "",
        date: new Date(report.publish_date).valueOf(),
        thumbnail: CreateDirectusThumbnailURL(report.thumbnail, "cover", 256, 256, 30),
        thumbnail_alt: report.thumbnail_alt ?? report.title,
        thumbnail_caption: report.thumbnail_caption ?? null,
        pdf_link: report.pdf_link,
        authors: writers,
    }
}


export function DirectusPartnerToPartner(partner: PartialItem<DirectusPartner>): Partner | null {

    /* Check requirements are fullfiled */
    if (partner.name == undefined ||
        partner.description == undefined ||
        partner.description_meta == undefined ||
        partner.slug == undefined ||
        partner.logo == undefined ||
        partner.external_site == undefined ||
        partner.partnered_heads == undefined ||
        partner.id == undefined ||
        partner.partnered_analysts == undefined
    ) {

        return null
    }

    const heads = partner.partnered_heads
        .map(head => (head && head.directus_users_id) ? DirectusUserToEmployee(head.directus_users_id) : null)
        .filter((head): head is Employee => head != null)


    if (heads.length == 0) {
        return null
    }

    const analysts = partner.partnered_analysts
        .map(analyst => (analyst && analyst.directus_users_id) ? DirectusUserToEmployee(analyst.directus_users_id) : null)
        .filter((analyst): analyst is Employee => analyst != null)

    if (analysts.length == 0) {
        return null
    }

    /* Perform conversion */
    return {
        id: partner.id.toString(),
        name: partner.name,
        slug: partner.slug,
        logo: partner.logo.toString(),
        logo_alt: partner.name,
        description: partner.description,
        description_meta: partner.description_meta,
        external_site_link: partner.external_site,
        partnered_heads: heads,
        partnered_analysts: analysts
    }
}

export function DirectusAlumniCompanyToAlumniCompany(company: PartialItem<DirectusAlumniCompany>): AlumniCompany | null {
    if (company.name == undefined ||
        company.logo == undefined ||
        company.logo.id == undefined ||
        company.link == undefined) {
        return null
    }

    return {
        name: company.name,
        logo_url: CreateDirectusImageURL(company.logo.id),
        logo_alt: company.logo.description ?? company.name,
        link: company.link
    }
}

export function DirectusAlumniPersonToAlumniPerson(alumni: PartialItem<DirectusAlumniPerson>): AlumniPerson | null {
    if (alumni.person == undefined ||
        alumni.person.first_name == undefined ||
        alumni.person.last_name == undefined ||
        alumni.person.avatar == undefined ||
        alumni.person.position == undefined ||
        alumni.main_text == undefined ||
        alumni.main_quote == undefined ||
        alumni.company == undefined) {
        return null
    }

    const company = DirectusAlumniCompanyToAlumniCompany(alumni.company)
    if (company == null) {
        return null
    }

    return {
        name: alumni.person.first_name + " " + alumni.person.last_name,
        position: alumni.person.position,
        company_position: alumni.company_position ?? "",
        main_text: alumni.main_text,
        main_quote: alumni.main_quote,
        socials: !alumni.socials ? [] : alumni.socials.map<Social | undefined>(social => (social?.social_type && social?.social_link && StringIsSocialType(social?.social_type)) ? { type: social.social_type, link: social.social_link } : undefined).filter((social): social is Social => social != undefined),
        company: company,
        thumbnail: CreateDirectusImageURL(alumni.person.avatar),
    }
}

export function DirectusAlumniPageToAlumniPage(alumni: PartialItem<DirectusAlumniPage>): AlumniPage | null {
    if (alumni.first_alumni_section == undefined || alumni.second_alumni_section == undefined) {
        return null
    }

    const first_person = DirectusAlumniPersonToAlumniPerson(alumni.first_alumni_section)
    if (first_person == null) {
        return null
    }

    const second_person = DirectusAlumniPersonToAlumniPerson(alumni.second_alumni_section)
    if (second_person == null) {
        return null
    }

    return {
        topPerson: first_person,
        bottomPerson: second_person
    }
}