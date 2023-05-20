import { AnalystSection } from "@components/modules/AnalystSection";
import { useRef } from "react";
import Image from "next/image"
import Rating from "./Rating";
import { BookFull, Employee } from "@services/Schema";
import { santizeContent } from "@utils/sanitize";

/**
 * Create a content view of a single book
 * @param props.book The book to be shown
 * @returns A new book content component
 */
export const BookView = (props: {
    book: BookFull,
    analyst: Employee | null
}) => {
    const santisedContent = santizeContent(props.book.content)

    var authorSectionRef = useRef<HTMLDivElement>(null);
    const authorOnClick: () => void = () => {
        if (authorSectionRef.current == null) {
            return;
        }
        authorSectionRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    }
    const overallRating = Math.round(((props.book.rating_education + props.book.rating_length + props.book.rating_readability + props.book.rating_relevance + props.book.rating_research_depth) / 5) * 10) / 10;
    return (
        <article>
            {/* The book */}
            <div className="">
                {/* Thumbnail image and caption */}
                <div className="py-2 h-96">
                    <div className="relative w-full h-full">
                        <Image src={props.book.thumbnail} alt={props.book.book_title} layout="fill" objectFit="contain" />
                    </div>
                    {/* <p className="m-1 text-sm text-center"> {props.book.thumbnail_caption} </p> */}
                </div>

                {/* Text content */}
                <div className="mx-auto my-8 prose lg:prose-lg px-4 prose-a:break-words">
                    <h1 className=""> {props.book.book_title} </h1>
                    <h4 className="my-4 flex justify-between">
                        <div className="my-4 text-xl">Author: {props.book.author_name}</div>
                        <div> {new Date(props.book.date)
                            .toLocaleDateString("en-GB", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })} </div>
                    </h4>

                    <h4 className="my-4 text-xl">Reviewer: <a className="cursor-pointer" onClick={authorOnClick}>{props.book.review_author.name}</a></h4>
                    <div className="text-efs-logo pb-4 text-xl">EFS Rating: <Rating numStars={overallRating} maxStars={5} starClasses={"w-6 h-6 inline-block"}></Rating> {overallRating}</div>
                    <div dangerouslySetInnerHTML={{ __html: santisedContent }} />
                </div>
            </div >

            {/* If the analyst exists render an analyst section */}
            <div ref={authorSectionRef}>{props.analyst != null ? <AnalystSection analyst={props.analyst} /> : null}</div>
        </article>
    )
}