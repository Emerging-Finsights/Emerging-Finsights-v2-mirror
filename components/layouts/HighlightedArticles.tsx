import { ArticleCard } from "@components/elements/ArticleCard";
import { SectionBackgroundColour } from "@components/modules/ArticleListPage";
import { ArticlePeek } from "@services/Schema";
import { useState } from "react";

export const TriLayout = (props: {
    aotm: ArticlePeek, latestArticle: ArticlePeek, prevAotm: ArticlePeek[]
    cardBackgroundColour: SectionBackgroundColour
}) => {
    const [index, setIndex] = useState(0);

    return (
        <div className="pt-10 pb-20">
            <div className="p-3 flex flex-wrap justify-center gap-16 lg:gap-20">
                {props.latestArticle != null ? <div className="relative grid justify-items-center w-96">
                    <div className="text-2xl text-white">Latest Article</div>
                    <div>
                        <ArticleCard analystBarColour={props.cardBackgroundColour} article={props.latestArticle} ></ArticleCard>
                    </div>
                </div> : null}

                {props.aotm != null ? <div className="relative grid justify-items-center w-96">
                    <div className="text-2xl text-white font-bold">Article of the Month</div>
                    <div>
                        <ArticleCard analystBarColour={props.cardBackgroundColour} article={props.aotm} ></ArticleCard>
                    </div>
                </div> : null}



                {props.prevAotm.length > 0 ?
                    (<><div className="relative grid justify-items-center w-96">
                        <div className="text-xl text-white">Previous Article of the Month</div>
                        <div className="relative">
                            <ArticleCard analystBarColour={props.cardBackgroundColour} article={props.prevAotm[index]} ></ArticleCard>

                            <svg viewBox="0 0 80 80" width="80px" className="absolute 
                                                                             right-0 top-1/2 -rotate-90 
                                                                             translate-x-1/2 -translate-y-2/3
                                                                             hover:scale-110"
                                onClick={() => { if (index != props.prevAotm.length - 1) { setIndex(index + 1) } }}>
                                <image xlinkHref="/svg/down-arrow-svgrepo-com.svg" width="80" height="80" />
                            </svg>

                            <svg viewBox="0 0 80 80" width="80px" className="absolute 
                                                                             left-0 top-1/2 rotate-90 
                                                                             -translate-x-1/2 -translate-y-2/3
                                                                             hover:scale-110"
                                onClick={() => { if (index != 0) { setIndex(index - 1) } }}>
                                <image xlinkHref="/svg/down-arrow-svgrepo-com.svg" width="80" height="80" />
                            </svg>
                        </div>
                    </div>
                    </>)
                    : null}
            </div>
        </div >
    )
}