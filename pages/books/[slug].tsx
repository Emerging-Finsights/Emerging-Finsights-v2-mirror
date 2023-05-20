import { BookView } from "@components/elements/BookView";
import { Page } from "@components/modules/Page";
import { CMS } from "@services/cms";
import { BookFull } from "@services/Schema";
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";

interface BookPageProps {
    book: BookFull
}

const BookPage: NextPage<BookPageProps> = props => {
    return (
        <Page>
            <Head>
                <title>{props.book.book_title} Review | Emerging Finsights</title>
                <meta name="description" key="desc" content={`A review by ${props.book.review_author.name}, of the book "${props.book.book_title}" written by ${props.book.author_name}.`} />
                <meta property="og:title" content={`${props.book.book_title} Review | Emerging Finsights`} />
                <meta property="og:description" content={`A review by ${props.book.review_author.name}, of the book "${props.book.book_title}" written by ${props.book.author_name}.`} />
            </Head>
            <BookView book={props.book} analyst={props.book.review_author}></BookView>
        </Page>)
}

export const getServerSideProps: GetServerSideProps<BookPageProps> = async ({ params }) => {
    if (!params) return { notFound: true }

    /* Read slug from url */
    const { slug } = params

    if (!slug) return { notFound: true }

    /* Get Article content */
    const provider = CMS.getProvider()
    const book = await provider.getBookFromSlug(slug as string)

    if (!book) return { notFound: true }

    /* pass props to article page */
    return { props: { book: book } }
}

export default BookPage;