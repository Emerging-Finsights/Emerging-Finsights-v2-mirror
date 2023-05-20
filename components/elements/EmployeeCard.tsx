import { Employee } from "@services/Schema";
import Image from "next/image";
import slugify from "slugify";

interface Props {
    analystInfo: Employee,
    className?: string
}

const EmployeeCard = ({ analystInfo, className = "" }: Props) => {
    const openLinkInNewTab = (link: string) => {
        window.open(link, '_blank')
    }

    return (
        <div id={slugify(analystInfo.name, { lower: true })} tabIndex={0} className={"group relative inline-block w-64 h-fit p-2 my-4 transition-all duration-500 ease-out bg-opacity-0 rounded-lg bg-black hover:drop-shadow-md hover:bg-opacity-10 active:bg-opacity-20" + className}>
            <div className="hidden p-4 -m-10 text-cente rounded-xl w-fit h-fit bg-gradient-to-r from-[#c2edf3] to-[#e4f5fa] group-focus:block">
                <div className="p-2 mx-auto mb-2 text-center border-2 border-black border-solid rounded-xl"><p>{analystInfo.name + " - " + analystInfo.position}</p></div>
                <div className="relative w-full h-auto mb-2 rounded-full">
                    <Image src={analystInfo.thumbnail} height="1" width="1" layout="responsive" alt={`${analystInfo.name} Thumnail`} objectFit="cover" className="rounded-full"
                        unoptimized={true} />
                </div>
                <div className="flex flex-col gap-1 p-4 bg-white rounded-xl">
                    <p ><b>Degree:</b> {analystInfo.degree} </p>
                    <p ><b>Interested In:</b> {analystInfo.interests}</p>
                    <p ><b>Interesting Fact:</b> {analystInfo.fact}</p>
                    <div>
                        <div className="mx-auto bg-black bg-opacity-0 rounded cursor-pointer w-fit hover:bg-opacity-10 active:bg-opacity-20 " onClick={() => openLinkInNewTab(analystInfo.linkedin)}>
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
                                className="mx-auto"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <line x1="8" y1="11" x2="8" y2="16" />
                                <line x1="8" y1="8" x2="8" y2="8.01" />
                                <line x1="12" y1="16" x2="12" y2="11" />
                                <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cursor-pointer group-focus:hidden ">
                <div className="relative z-0 w-full h-auto rounded-full">
                    <Image src={analystInfo.thumbnail} height="1" width="1" layout="responsive" alt={`${analystInfo.name} Thumnail`} objectFit="cover" className="z-0 rounded-full"
                        unoptimized={true} />
                </div>
                <h1 className="my-2 text-xl font-semibold text-center">{analystInfo.name}</h1>
                <p className="text-center">{analystInfo.position}</p>
            </div>

        </div>

    );
}

export default EmployeeCard;