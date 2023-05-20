import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ArticlePeek } from "@services/Schema"
import { useState } from "react"
import { Carousel } from "react-responsive-carousel"
import { ArticleCard } from "./ArticleCard"
import React from 'react'

export const PartnershipsCarousel = (props: {
    title: string
    articleTriples: ArticlePeek[][]
    partnerSlug: string
}) => {
    const [articlesIndex, setIndex] = useState(0);

    return (
        <div>
            <div className="w-full lg:container mx-auto">
                <div className="py-3 mb-2 ml-20 text-4xl font-bold text-left text-white">{props.title}</div>

                {/* Desktop carousel */}
                <Carousel className="hidden lg:block"
                    selectedItem={articlesIndex} onChange={(index) => setIndex(index)}
                    showThumbs={false} showArrows={false} showIndicators={false} showStatus={false}
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={20}>
                    {props.articleTriples.map((articleTriple, index) =>
                        <div key={index} className="flex text-left">
                            {articleTriple[0] != undefined ? <ArticleCard article={articleTriple[0]} analystBarColour="bg-efs-gray" overideArticleLink={"/partnerships/" + props.partnerSlug + "/"} /> : null}
                            {articleTriple[1] != undefined ? <ArticleCard article={articleTriple[1]} analystBarColour="bg-efs-gray" overideArticleLink={"/partnerships/" + props.partnerSlug + "/"} /> : null}
                            {articleTriple[2] != undefined ? <ArticleCard article={articleTriple[2]} analystBarColour="bg-efs-gray" overideArticleLink={"/partnerships/" + props.partnerSlug + "/"} /> : null}
                        </div>
                    )}
                </Carousel>

                {/* Carousel controls */}
                <div className="hidden lg:flex justify-center mx-auto gap-2  pt-5">
                    {props.articleTriples.map((articleTriple, index) =>
                        <div key={index}>
                            {articlesIndex == index ?
                                <button className="btn btn-circle btn-xs bg-efs-logo" onClick={() => setIndex(index)} /> :
                                <button className="btn btn-circle btn-xs bg-[#AAAAAA]" onClick={() => setIndex(index)} />}
                        </div>
                    )
                    }
                </div>

                {/* Mobile carousel */}
                <div className="carousel lg:hidden carousel-center p-4 space-x-4 ">
                    {props.articleTriples.map((peek, index) =>
                        <React.Fragment key={index}>
                            {peek[0] != undefined ? <div key={peek[0].title_slug} className="carousel-item"> <ArticleCard article={peek[0]} enableCategoryLinks={false} overideArticleLink={"/partnerships/" + props.partnerSlug + "/"} /> </div> : null}
                            {peek[1] != undefined ? <div key={peek[1].title_slug} className="carousel-item"> <ArticleCard article={peek[1]} enableCategoryLinks={false} overideArticleLink={"/partnerships/" + props.partnerSlug + "/"} /> </div> : null}
                            {peek[2] != undefined ? <div key={peek[2].title_slug} className="carousel-item"> <ArticleCard article={peek[2]} enableCategoryLinks={false} overideArticleLink={"/partnerships/" + props.partnerSlug + "/"} /> </div> : null}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}