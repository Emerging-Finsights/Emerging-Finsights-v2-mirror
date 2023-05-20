import { CreateBookLink } from "@services/cms"
import Image from "next/image"
import Link from "next/link"
import AmazonLogo from "@public/logos/amazon.jpg"
import { BookPeek } from "@services/Schema"

export const LatestBooksLink = (props: { book: BookPeek }) => {
    return (
        <li>
            <div className="relative mb-10 group">
                <a className="group-hover:underline bg-efs-logo rounded-full pt-3 pb-3 pl-4 pr-10 w-72 md:w-96 block text-white text-center text-lg" href={props.book.affiliate_link} target="_blank" rel="noopener noreferrer">
                    {props.book.book_title}
                </a>
                <Link href={CreateBookLink(props.book.review_slug)} passHref>
                    <a>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2  h-16 w-16 group-hover:scale-110 transition">
                            <Image src={AmazonLogo} alt="Amazon" layout="responsive" width={64} height={64} objectFit="fill" className="rounded-full" />
                        </div>
                    </a>
                </Link>
            </div>
        </li>
    )
}