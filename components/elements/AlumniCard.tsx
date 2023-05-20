import { AlumniPerson } from "@services/Schema"
import { santizeContent } from "@utils/sanitize"
import Image from "next/image"

export const AlumniCard = (props: {
    alumni: AlumniPerson
}) => {
    const quote = santizeContent(props.alumni.main_quote)
    const text = santizeContent(props.alumni.main_text)
    return (
        <div className="bg-[#D6E8DE] mx-auto">
            <div className="text-6xl 3xl:text-9xl text-efs-beige text-center pt-2">{props.alumni.name} - {props.alumni.company.name}</div>
            <div className="text-3xl 3xl:text-5xl text-efs-logo mx-auto text-center w-6/12 3xl:w-8/12 py-4 font-bold" dangerouslySetInnerHTML={{ __html: quote }}></div>
            <div className="flex gap-8 py-10 container max-w-6xl 3xl:max-w-7xl mx-auto pr-32">
                <div>
                    <div className="flex-grow text-xl 3xl:text-2xl text-[#9F9F9F] pl-10 pr-24 3xl:pr-8" dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="flex-shrink-0 relative w-52 h-52 xl:w-60 xl:h-60 3xl:w-80 3xl:h-80 mr-10 ring-8 ring-efs-beige rounded-full">
                    <Image src={props.alumni.thumbnail} alt={props.alumni.name} layout="fill" objectFit="cover" className="rounded-full" />
                </div>
                <div className="flex-shrink-0 relative w-52 h-52 xl:w-60 xl:h-60 3xl:w-80 3xl:h-80">
                    <Image src={props.alumni.company.logo_url} alt={props.alumni.company.logo_alt} layout="fill" objectFit="cover" />
                </div>
            </div>
        </div >
    )
}