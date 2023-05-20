import { CreateBookLink } from "@services/cms";
import { BookPeek } from "@services/Schema";
import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";

export const BookCard = (props: {
    book: BookPeek
}) => {
    const overallRating = Math.round(((props.book.rating_education + props.book.rating_length + props.book.rating_readability + props.book.rating_relevance + props.book.rating_research_depth) / 5) * 10) / 10;
    return (
        <Link href={CreateBookLink(props.book.review_slug)} passHref>
            <a>
                <div className="w-64 lg:w-72 xl:w-80 2xl:w-96 text-center mx-auto relative" id="/" data-type="bookmark" data-id="/">
                    <div className="text-2xl">EFS rating:</div>
                    <div className="mb-2 mx-auto w-fit flex flex-row">
                        <Rating numStars={overallRating} maxStars={5} containerClass="flex flex-row items-center justify-center px-1" starClasses="block" ></Rating> {overallRating}
                    </div>


                    <div className="w-60 h-96 mx-auto relative">
                        <Image src={props.book.thumbnail} alt={props.book.book_title} layout="fill" objectFit="contain" />
                    </div>

                    <div className="pb-5">
                        {new Date(props.book.date)
                            .toLocaleDateString("en-GB", {
                                month: "short",
                                day: "numeric",
                                year: "2-digit"
                            })}
                    </div>
                    <hr className="w-full border-solid border-black bg-black border-2" />
                </div>
            </a>
        </Link >
    )
}