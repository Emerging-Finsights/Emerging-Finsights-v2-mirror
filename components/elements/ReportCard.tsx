import { CreateReportLink } from "@services/cms"
import { Report } from "@services/Schema"
import Image from "next/image"
import Link from "next/link"

export const ReportCard = (props: {
    report: Report
}) => {
    const articleLink = CreateReportLink(props.report.title_slug)

    return (
        <div className="relative flex-grow-0 flex-shrink-0 w-64 h-64 mx-auto mb-5 group md:w-72 md:h-72 lg:w-96 lg:h-96">

            {/* Article Thumnail */}
            <Link href={articleLink} passHref>
                <div className="w-full h-full">
                    <div className="object-cover w-full h-full duration-200 filter transistion-blur rounded-xl">
                        <Image src={props.report.thumbnail} alt={props.report.thumbnail_alt} className="rounded-xl" width={100} height={100} layout="responsive" objectFit="cover" />
                    </div>
                </div>
            </Link>

            {/* Full background link */}
            <Link href={articleLink} passHref>
                <a className="absolute bottom-0 left-0 w-full h-full"> </a>
            </Link>

            {/* Covering report information */}
            <Link href={articleLink} passHref>
                <div className="absolute bottom-0 left-0 w-full p-1 overflow-hidden text-white transition-all bg-gray-800 rounded-t-none pointer-events-none md:p-2 rounded-xl bg-opacity-60 h-3/4 md:h-1/3">

                    <div className="pointer-events-auto">
                        <Link href={articleLink} passHref>
                            <div>
                                <div className="font-semibold text-center text-md md:text-lg">
                                    {props.report.title}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}