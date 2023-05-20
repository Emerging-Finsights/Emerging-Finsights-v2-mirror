import { Employee } from "@services/Schema";
import Image from "next/image"

export const BannerAnalysts = (props: {
    analysts: Employee[]
}) => {
    return (
        <div className="flex gap-5 sm:gap-24 md:gap-36 justify-center items-center mx-auto py-10 mt-20 lg:mt-10 xl:mt-20">
            {props.analysts.map((analyst, index) =>
                <a key={index} className="relative w-40 h-40 xl:w-52 xl:h-52 3xl:w-72 3xl:h-72">
                    <span key={index} >
                        <div className="text-base xl:text-lg 3xl:text-2xl">{analyst.position}</div>
                        <Image src={analyst.thumbnail} alt={analyst.name} width="300" height="300" className="rounded-full hover:bg-black hover:drop-shadow-md hover:bg-opacity-10 active:bg-opacity-20" objectFit="cover" />
                        <div className="text-base xl:text-lg 3xl:text-2xl">{analyst.name}</div>
                    </span>
                </a>
            )
            }
        </div>
    )
}