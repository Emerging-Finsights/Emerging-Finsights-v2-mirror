import { SectionBackgroundColour } from "@components/modules/ArticleListPage"
import { CreateAnalystLink, CreateArticleLink } from "@services/cms"
import { ArticlePeek } from "@services/Schema"
import Image from "next/image"
import Link from "next/link"

const AnalystPicture = (props: { analystPictureURL: string, analystPictureAlt: string }) => {
    return (
        <div className="relative w-16 h-16 3xl:w-20 3xl:h-20 flex-shrink-0 rounded-full
                        transition-all ring-red-50 ring-0 group-hover:ring-2">
            <Image src={props.analystPictureURL} alt={props.analystPictureAlt}
                objectFit="cover"
                layout="fill"
                className="rounded-full" />
        </div>)
}

const AnalystTitle = (props: { name: string, position: string }) => {
    return (
        <div className="p-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-sm md:text-lg group-hover:underline">
                {props.name}
            </span>
            <br />
            <span className="text-xs md:text-base text-gray-300">
                {props.position}
            </span>
        </div>)
}

const AnalystBar = (props: {
    analystName: string, analystPosition: string,
    analystLink: string,
    analystPictureURL: string, analystPictureAlt: string,
    analystBarColour: string
}) => {
    return (
        <Link href={props.analystLink} passHref>
            <a className={`flex-shrink-0 block group transition-colors left-0 w-full bg-black/40 lg:bg-transparent  
                             hover:${props.analystBarColour} p-2 md:p-4 rounded-3xl rounded-t-none shadow-xl`}>
                <div className="flex items-center px-1 md:px-2">
                    {/* Analyst picture */}
                    <AnalystPicture analystPictureURL={props.analystPictureURL}
                        analystPictureAlt={props.analystPictureAlt} />

                    {/* Analyst name and title */}
                    <AnalystTitle name={props.analystName} position={props.analystPosition} />
                </div>
            </a>
        </Link>)
}

export const ArticleCard = (props: {
    article: ArticlePeek
    enableCategoryLinks: boolean
    overideArticleLink?: string
    analystBarColour: SectionBackgroundColour
}) => {
    const articleLink = props.overideArticleLink ? props.overideArticleLink + props.article.title_slug : CreateArticleLink(props.article.category, props.article.title_slug)
    const analystLink = CreateAnalystLink(props.article.author.name, props.article.author.efs_status == "active")

    /* Preload hover background colour styles */
    const styles = "hover:bg-efs-green hover:bg-efs-brown hover:bg-efs-logo hover:bg-efs-gray hover:bg-efs-orange hover:bg-efs-salmon"

    return (
        <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 3xl:w-96 3xl:h-96 b-m5" >
            {/* Article Thumnail */}
            <div className="relative w-full h-full ">
                <Image src={props.article.thumbnail} alt={props.article.thumbnail_alt} className="rounded-3xl" layout="fill" objectFit="cover" />
            </div>

            <div className="flex flex-col absolute w-full h-full bottom-0 left-0 pt-2 md:pt-4
                            rounded-3xl transition-opacity text-white
                          bg-slate-800  bg-opacity-[0.30] hover:bg-opacity-75  ">

                {/* Article section (takes up most of the card / as much as it can take) */}
                <Link href={articleLink} passHref>
                    <a className="block flex-grow text-lg md:text-xl 3xl:text-3xl font-semibold hover:underline text-ellipsis overflow-hidden px-2 md:px-4 3xl:px-6">
                        {props.article.title}
                    </a>
                </Link>

                {/* Analyst section (takes up as much as it need) */}
                <AnalystBar analystName={props.article.author.name} analystPosition={props.article.author.position}
                    analystLink={analystLink}
                    analystPictureURL={props.article.author.thumbnail} analystPictureAlt={props.article.author.name}
                    analystBarColour={props.analystBarColour} />
            </div>
        </div>
    )
}

ArticleCard.defaultProps = {
    enableCategoryLinks: true,
    analystBarColour: "bg-efs-logo"
}