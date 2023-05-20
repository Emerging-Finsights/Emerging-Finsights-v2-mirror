import { DIRECTUS_ACCESS_TOKEN, DIRECTUS_API_ENDPOINT } from "@constants/CMSConstants";
import { Directus } from "@directus/sdk";
import { ContentProvider } from "./ContentProvider";
import { DirectusAlumniCompanyToAlumniCompany, DirectusAlumniPageToAlumniPage, DirectusAlumniPersonToAlumniPerson, DirectusArticleToArticleFull, DirectusArticleToArticlePeek, DirectusBookToBookFull, DirectusBookToBookPeek, DirectusCollections, DirectusPartnerToPartner, DirectusReportToReport, DirectusUserSectionToEmployeeSection } from "./DirectusSchema";
import { AlumniCompany, AlumniPage, AlumniPerson, ArticleFull, ArticlePeek, BookFull, BookPeek, Category, EmployeeSection, Partner, Report } from "./Schema";

export class DirectusProvider implements ContentProvider {
    private directus = new Directus<DirectusCollections>(DIRECTUS_API_ENDPOINT, { auth: { staticToken: DIRECTUS_ACCESS_TOKEN } })

    async getArticlePeeks(category: Category): Promise<ArticlePeek[] | null> {
        const articles = await this.directus.items("articles").readByQuery({
            filter: {
                category: { _eq: category },
                publish_date: { _lt: "$NOW" },
                approved: { _eq: true },
                status: { _eq: "review" }
            },
            fields: ["*", "writer.*", "thumbnail.description", "thumbnail.id"],
            sort: ["-publish_date"]
        })

        if (!articles.data) {
            return null
        }

        return articles.data
            .map(article => DirectusArticleToArticlePeek(article))
            .filter((article): article is ArticlePeek => article != null)
    }

    async getArticleFromSlug(slug: string): Promise<ArticleFull | null> {
        const articles = await this.directus.items("articles").readByQuery({
            filter: {
                title_slug: { _eq: slug },
                publish_date: { _lt: "$NOW" },
                approved: { _eq: true },
                status: { _eq: "review" }
            },
            fields: ["*", "writer.*", "thumbnail.description", "thumbnail.id"],
            limit: 1
        })

        if (!articles.data || articles.data.length != 1) {
            return null
        }

        return DirectusArticleToArticleFull(articles.data[0])
    }

    async getReportPeeks(): Promise<Report[] | null> {
        const reports = await this.directus.items("reports").readByQuery({
            fields: ["*", "authors.*.*"],
        })

        if (!reports.data) {
            return null
        }

        return reports.data
            .map(report => DirectusReportToReport(report))
            .filter((report): report is Report => report != null)
    }

    async getReportFromSlug(slug: string): Promise<Report | null> {
        const reports = await this.directus.items("reports").readByQuery({
            filter: { title_slug: { _eq: slug } }, limit: 1,
            fields: ["*", "authors.*.*"]
        })

        if (!reports.data || reports.data.length != 1) {
            return null
        }

        return DirectusReportToReport(reports.data[0])
    }

    async getBookPeeks(): Promise<BookPeek[] | null> {
        const books = await this.directus.items("book_reviews").readByQuery({
            filter: {
                publish_date: { _lt: "$NOW" },
                status: { _eq: "review" },
                approved: { _eq: true }
            },
            fields: ["*", "review_writer.*"],
            sort: ["-publish_date"]
        })

        if (!books.data) {
            return null
        }

        return books.data
            .map(book => DirectusBookToBookPeek(book))
            .filter((book): book is BookPeek => book != null)
    }

    async getBookFromSlug(slug: string): Promise<BookFull | null> {
        const books = await this.directus.items("book_reviews").readByQuery({
            filter: {
                book_title_slug: { _eq: slug },
                publish_date: { _lt: "$NOW" },
                status: { _eq: "review" },
                approved: { _eq: true }
            },
            fields: ["*", "review_writer.*"],
            limit: 1
        })

        if (!books.data || books.data.length != 1) {
            return null
        }

        return DirectusBookToBookFull(books.data[0])
    }


    async getEmployeeSections(): Promise<EmployeeSection[] | null> {
        const sections = await this.directus.items("about_us_sections").readByQuery({ fields: ["*", "people.*.*"] })

        if (!sections.data) {
            return null
        }

        return sections.data
            .map(section => DirectusUserSectionToEmployeeSection(section))
            .filter((section): section is EmployeeSection => section != null)
    }

    async getPartners(): Promise<Partner[] | null> {
        const partners = await this.directus.items("partner").readByQuery({
            fields: ["*", "partnered_heads.*.*", "partnered_analysts.*.*"],
        })

        if (!partners.data) {
            return null
        }

        return partners.data
            .map(partner => DirectusPartnerToPartner(partner))
            .filter((partner): partner is Partner => partner != null)

    }
    async getPartnerFromSlug(slug: string): Promise<Partner | null> {
        const partners = await this.directus.items("partner").readByQuery({
            fields: ["*", "partnered_heads.*.*", "partnered_analysts.*.*"],
            filter: { slug: { _eq: slug } }, limit: 1,
        })

        if (!partners.data || partners.data.length != 1) {
            return null
        }

        return DirectusPartnerToPartner(partners.data[0])
    }

    async getPartneredArticles(partnerID: string, category?: Category): Promise<ArticlePeek[] | null> {
        const articles = await this.directus.items("articles").readByQuery({
            filter: {
                category: (category != undefined ? { _eq: category } : undefined),
                publish_date: { _lt: "$NOW" },
                approved: { _eq: true },
                status: { _eq: "review" },
                writer: { partnered_fk: { partner_id: { _eq: partnerID } } }
            },
            fields: ["*", "writer.*", "writer.partnered_fk.id", "thumbnail.description", "thumbnail.id"],
            sort: ["-publish_date"]
        })

        if (!articles.data) {
            return null
        }

        return articles.data
            .map(article => DirectusArticleToArticlePeek(article))
            .filter((article): article is ArticlePeek => article != null)
    }
    async getPartneredNews(partnerID: string, category?: Category): Promise<ArticlePeek[] | null> {
        const articles = await this.directus.items("articles").readByQuery({
            filter: {
                category: (category != undefined ? { _eq: category } : undefined),
                publish_date: { _lt: "$NOW" },
                approved: { _eq: true },
                status: { _eq: "review" },
                writer: { partnered_fk: { partner_id: { _eq: partnerID } } }
            },
            fields: ["*", "writer.*", "writer.partnered_fk.id", "thumbnail.description", "thumbnail.id"],
            sort: ["-publish_date"]
        })

        if (!articles.data) {
            return null
        }

        return articles.data
            .map(article => DirectusArticleToArticlePeek(article))
            .filter((article): article is ArticlePeek => article != null)
    }

    async getAllCompanies(): Promise<AlumniCompany[] | null> {
        const companies = await this.directus.items("alumni_company").readByQuery({
            fields: [
                "*",
                "logo.id",
                "logo.description"
            ]
        })

        if (!companies.data) {
            return null
        }

        return companies.data
            .map(company => DirectusAlumniCompanyToAlumniCompany(company))
            .filter((company): company is AlumniCompany => company != null)
    }

    async getAlumniPage(): Promise<AlumniPage | null> {
        const alumni_page = await this.directus.singleton("Alumni").read({
            fields: [
                "*",
                "first_alumni_section.*",
                "first_alumni_section.socials",
                "first_alumni_section.person.*",
                "first_alumni_section.company.*",
                "first_alumni_section.company.logo.id",
                "first_alumni_section.company.logo.description",

                "second_alumni_section.*",
                "second_alumni_section.socials",
                "second_alumni_section.person.*",
                "second_alumni_section.company.*",
                "second_alumni_section.company.logo.id",
                "second_alumni_section.company.logo.description",
            ]
        })

        if (!alumni_page) {
            return null
        }

        return DirectusAlumniPageToAlumniPage(alumni_page)
    }

    async getAllAlumni(): Promise<AlumniPerson[] | null> {
        const alumni = await this.directus.items("alumni_entry").readByQuery({
            fields: [
                "*",
                "socials",
                "person.*",
                "company.*",
                "company.logo.id",
                "company.logo.description",
            ]
        })

        if (!alumni.data) {
            return null;
        }
        return alumni.data
            .map(entry => DirectusAlumniPersonToAlumniPerson(entry))
            .filter((entry): entry is AlumniPerson => entry != null)
    }

    async getNumberOfEmploees(): Promise<number | null> {
        const sections = await this.directus.items("about_us_sections").readByQuery()

        if (!sections.data) {
            return null
        }

        return sections.data.reduce<number>(
            (count, section) => count + (section.people?.length ?? 0),
            0
        )
    }

    async getNumberOfEmploeesInSection(section: string): Promise<number | null> {
        const sections = await this.directus.items("about_us_sections").readByQuery({ filter: { title: section }, limit: 1 })

        if (!sections.data || sections.data.length == 0) {
            return null
        }

        return sections.data[0].people?.length ?? 0
    }
}
