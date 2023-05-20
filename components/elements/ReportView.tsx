import { Report } from "@services/Schema";
import Link from "next/link";
import { CreateAnalystLink } from "@services/cms";

/**
 * Create a content view of a single report
 * @param props.report The report to be shown
 * @returns A new report content component
 */
export const ReportView = (props: {
    report: Report
}) => {
    return (
        <div>
            {/* The report */}
            <div>
                {/* Content */}
                <div className="px-4 mx-auto my-8 prose lg:prose-lg">
                    <h1 className=""> {props.report.title} </h1>

                    <h4 className="my-4">
                        Authors: |
                        {props.report.authors.map((author, index) =>
                            <span key={index}>
                                <Link href={CreateAnalystLink(author.name, author.efs_status == "active")}>
                                    <a> {author.name} </a>
                                </Link>
                                |
                            </span>)}
                    </h4>

                    <iframe src={props.report.pdf_link} width="auto" height="2100px" className="w-full h-screen"></iframe>
                </div>
            </div >
        </div>
    )
}


