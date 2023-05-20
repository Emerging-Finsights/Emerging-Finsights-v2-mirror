import { AlumniCompany, AlumniPage, AlumniPerson, ArticleFull, ArticlePeek, BookFull, BookPeek, Category, EmployeeSection, Partner, Report } from "./Schema";

export interface ContentProvider {
    /* Article access */
    getArticlePeeks(category: Category): Promise<ArticlePeek[] | null>
    getArticleFromSlug(slug: string): Promise<ArticleFull | null>

    /* Book access */
    getBookPeeks(): Promise<BookPeek[] | null>
    getBookFromSlug(slug: string): Promise<BookFull | null>

    /* Reports access */
    getReportPeeks(): Promise<Report[] | null>
    getReportFromSlug(slug: string): Promise<Report | null>

    /* Employee access */
    getEmployeeSections(): Promise<EmployeeSection[] | null>

    /* Partners access */
    getPartners(): Promise<Partner[] | null>
    getPartnerFromSlug(slug: string): Promise<Partner | null>
    getPartneredArticles(partnerID: string, category?: Category): Promise<ArticlePeek[] | null>
    getPartneredNews(partnerID: string, category?: Category): Promise<ArticlePeek[] | null>

    /* Alumni access */
    getAllCompanies(): Promise<AlumniCompany[] | null>
    getAlumniPage(): Promise<AlumniPage | null>
    getAllAlumni(): Promise<AlumniPerson[] | null>

    /* Aggregates */
    getNumberOfEmploeesInSection(section: string): Promise<number | null>;
    getNumberOfEmploees(): Promise<number | null>;
}