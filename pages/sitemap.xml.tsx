import { CMS } from "@services/cms"
import { ArticlePeek, BookPeek, Report } from "@services/Schema"
import { GetServerSideProps } from "next"

const ROOT_URL = 'https://www.emergingfinsights.co.uk'

function generateSiteMap(fintechArticles: ArticlePeek[] | null, esgArticles: ArticlePeek[] | null, reports: Report[] | null, books: BookPeek[] | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${ROOT_URL}</loc>
     </url>
     <url>
       <loc>${ROOT_URL}/fintech</loc>
     </url>
     <url>
       <loc>${ROOT_URL}/esg</loc>
     </url>
     <url>
       <loc>${ROOT_URL}/reports</loc>
     </url>
     <url>
       <loc>${ROOT_URL}/books</loc>
     </url>
     <url>
       <loc>${ROOT_URL}/about-us</loc>
     </url>
     <url>
     <loc>${ROOT_URL}/deadlines</loc>
   </url>
     ${fintechArticles
      ?.map(({ title_slug }) => {
        return `
       <url>
           <loc>${`${ROOT_URL}/fintech/${title_slug}`}</loc>
       </url>
     `
      })
      .join('')}
     ${esgArticles
      ?.map(({ title_slug }) => {
        return `
       <url>
           <loc>${`${ROOT_URL}/esg/${title_slug}`}</loc>
       </url>
     `
      })
      .join('')}
     ${reports
      ?.map(({ title_slug }) => {
        return `
       <url>
           <loc>${`${ROOT_URL}/reports/${title_slug}`}</loc>
       </url>
     `
      })
      .join('')}   
     ${books
      ?.map(({ review_slug }) => {
        return `
       <url>
           <loc>${`${ROOT_URL}/books/${review_slug}`}</loc>
       </url>
     `
      })
      .join('')}         
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const provider = CMS.getProvider()
  const fintechArticles = await provider.getArticlePeeks("fintech");
  const esgArticles = await provider.getArticlePeeks("esg");
  const reports = await provider.getReportPeeks();
  const books = await provider.getBookPeeks();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(fintechArticles, esgArticles, reports, books);
  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap