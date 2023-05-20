import { CreateAnalystLink } from "@services/cms"
import { Employee } from "@services/Schema"
import Image from "next/image"
import Link from "next/link"
import { Section } from "./Section"

/**
 * Creates a new analyst section from given analyst info 
 * @param props.analyst The analyst to be displayed
 * @returns new analyst section
 */
export const AnalystSection = (props: { analyst: Employee }) => {
    return (
        <Section title="Article Analyst" barContainerClasses="bg-efs-gray mt-28 mb-8" barClasses="bg-efs-logo">
            <div className="mx-auto py-4 text-white">

                {/* Horizontal layout with image and text */}
                <div className="flex flex-wrap justify-center gap-8 ">
                    {/* Display thumbnail */}
                    <div className="flex items-center justify-center"> {/* Center image vertically */}
                        <div className="relative h-48">
                            <div className="w-48 h-48 rounded-full shadow-lg"> {/* Create a rounded shadow outside the thumbnail */}
                                <Image src={props.analyst.thumbnail} alt={props.analyst.name} layout="responsive"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className="rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Display analyst info */}
                    <div className="px-2">
                        <p className="text-2xl font-bold">
                            About the author...
                        </p>

                        <p className="text-xl font-semibold pt-2">
                            <Link href={CreateAnalystLink(props.analyst.name, props.analyst.efs_status == "active")} passHref>
                                <a> {props.analyst.name} </a>
                            </Link>
                        </p>

                        <p className="text-lg">
                            {props.analyst.position}
                        </p>

                        <p className="text-lg pt-4">
                            Degree: {props.analyst.degree}
                        </p>

                        <p className="text-lg">
                            Interested in: {props.analyst.interests}
                        </p>

                        <p className="text-lg">
                            Interesting Fact: {props.analyst.fact}
                        </p>

                        <Link href={props.analyst.linkedin} passHref>
                            <a target="_blank" className="block p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="hover:animate-bounce">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <rect x="4" y="4" width="16" height="16" rx="2" />
                                    <line x1="8" y1="11" x2="8" y2="16" />
                                    <line x1="8" y1="8" x2="8" y2="8.01" />
                                    <line x1="12" y1="16" x2="12" y2="11" />
                                    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>
                <Link href="/about-us" passHref>
                    <a className="block text-2xl text-center hover:underline">
                        Show all members
                    </a>
                </Link>
            </div>
        </Section >
    )
}