import { Employee } from "@services/Schema";
import Image from "next/image"

export const PartnershipsAnalysts = (props: {
    analysts: Employee[]
}) => {

    return (
        <div className="flex flex-wrap gap-5 sm:gap-20 md:gap-28 justify-center items-center mx-auto py-10">
            {props.analysts.map((analyst, index) =>
                <a key={index} >
                    <div key={index} className="group relative w-40 h-40 xl:w-52 xl:h-52 3xl:w-72 3xl:h-72 rounded-full">
                        <div className="relative">
                            <Image src={analyst.thumbnail} alt={analyst.name} width="300" height="300" className="rounded-full group-hover:grayscale" objectFit="cover" />
                        </div>
                        <div className="hidden group-hover:block group-hover:backdrop-blur-3xl text-center text-white text-sm 3xl:text-md absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            {analyst.name} <br />{analyst.degree}
                        </div>
                    </div>
                </a>
            )
            }
        </div >
    )
}