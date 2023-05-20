import Image from "next/image"
import { AnalystSection } from "@components/modules/AnalystSection";
import { useRef } from "react";
import { ArticleFull } from "@services/Schema";
import { santizeContent } from "@utils/sanitize";

/**
 * Create a content view of a single article
 * @param props.article The article to be shown
 * @returns A new article content component
 */
export const ArticleView = (props: {
    article: ArticleFull
}) => {
    const santisedContent = santizeContent(props.article.content)

    var authorSectionRef = useRef<HTMLDivElement>(null);
    const authorOnClick: () => void = () => {
        if (authorSectionRef.current == null) {
            return;
        }
        authorSectionRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    }

    return (
        <article>
            {/* The article */}
            <div>
                {/* Thumbnail image and caption */}
                <div className="py-2 h-96">
                    <div className="relative w-full h-full">
                        <Image src={props.article.thumbnail} alt={props.article.thumbnail_alt} layout="fill" objectFit="contain"></Image>
                    </div>
                    <p className="m-1 text-sm text-center"> {props.article.thumbnail_caption} </p>
                </div>

                {/* Text content */}
                <div className="mx-auto my-8 prose lg:prose-lg px-4 prose-a:break-words">
                    <h1 className=""> {props.article.title} </h1>
                    <h4 className="my-4 flex justify-between">
                        <div>Author: <a className="cursor-pointer" onClick={authorOnClick}>{props.article.author.name}</a></div>
                        <div> {new Date(props.article.date)
                            .toLocaleDateString("en-GB", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })} </div>
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: santisedContent }} />
                </div>
            </div>

            {/* If the analyst exists render an analyst section */}
            < div ref={authorSectionRef} > <AnalystSection analyst={props.article.author} /></div >
        </article >
    )
}


