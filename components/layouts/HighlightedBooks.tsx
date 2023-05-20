import { LatestBooksLink } from "@components/elements/LatestBooksLink";
import Rating from "@components/elements/Rating";
import { CreateBookLink } from "@services/cms";
import { BookPeek } from "@services/Schema";
import Link from "next/link";

const RatingStyled = (props: { rating: number }) => {
    return <Rating numStars={props.rating} maxStars={5} containerClass="flex flex-row items-center justify-center px-1" starClasses="block" ></Rating>
}

export const HighlightedBooks = (props: {
    botm: BookPeek, latest: BookPeek[]
}) => {
    const overallRating = Math.round(((props.botm.rating_education + props.botm.rating_length + props.botm.rating_readability + props.botm.rating_relevance + props.botm.rating_research_depth) / 5) * 10) / 10;
    return (
        <div className="">
            <div className="p-3 flex flex-wrap justify-center gap-16 lg:gap-20">
                <div className="relative grid justify-items-center w-96">
                    <div className="text-2xl text-white self-start">Rated Based On</div>

                    <div>
                        <div className="w-96 h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-x-28 text-2xl text-white -mt-8">
                            <div className="grid grid-rows-5 gap-y-8 w-max">
                                <div>Readability: </div>
                                <div>Depth of Research: </div>
                                <div>Length: </div>
                                <div>Relevance: </div>
                                <div>Educational: </div>
                            </div>
                            <div className="w-max grid grid-rows-5 gap-y-8">
                                <div className="pl-2 flex flex-row items-center">
                                    <RatingStyled rating={props.botm.rating_readability} />{props.botm.rating_readability}
                                </div>

                                <div className="pl-2 flex flex-row items-center">
                                    <RatingStyled rating={props.botm.rating_research_depth} />{props.botm.rating_research_depth}
                                </div>
                                <div className="pl-2 flex flex-row items-center">
                                    <RatingStyled rating={props.botm.rating_length} />{props.botm.rating_length}
                                </div>
                                <div className="pl-2 flex flex-row items-center">
                                    <RatingStyled rating={props.botm.rating_relevance} />{props.botm.rating_relevance}
                                </div>
                                <div className="pl-2 flex flex-row items-center">
                                    <RatingStyled rating={props.botm.rating_education} />{props.botm.rating_education}
                                </div>
                            </div>
                        </div>
                        <div className="pt-96 text-center justify-self-center">
                            <div className="text-4xl text-white">Overall:</div>
                            <div className="scale-150 text-center text-white pl-2 flex flex-row items-center">
                                <RatingStyled rating={overallRating} />{overallRating}
                            </div>
                        </div>
                    </div>

                </div>
                <Link href={CreateBookLink(props.botm.review_slug)} passHref>
                    <a>
                        <div className="grid justify-items-center w-96 ">
                            <div className="text-2xl text-white">Book of the Month</div>
                            <img className="w-60 lg:w-60 h-96 lg:h-96 xl:w-72 xl:h-100" src={props.botm.thumbnail} alt={props.botm.book_title} />
                        </div>
                    </a>
                </Link>

                <div className="grid justify-items-center w-96">
                    <div className="text-2xl text-white pb-4">Amazon Book List</div>
                    <ul>
                        {props.latest.slice(0, 4).map((peek, index) =>
                            (<LatestBooksLink key={index} book={peek} />)
                        )}
                    </ul>
                </div>
            </div>
        </div>

    )
}