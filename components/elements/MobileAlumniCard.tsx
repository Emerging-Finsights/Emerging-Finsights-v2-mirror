import { AlumniPerson } from "@services/Schema"
import { santizeContent } from "@utils/sanitize"
import Image from "next/image"
import { SocialPanel, SocialsArrayToOptions } from "./SocialPanel"

export const MobileAlumniCard = (props: {
    alumni: AlumniPerson
}) => {
    const openLinkInNewTab = (link: string) => {
        window.open(link, '_blank')
    }
    const quote = santizeContent(props.alumni.main_quote)
    const text = santizeContent(props.alumni.main_text)
    return (
        <div className="bg-[#D6E8DE] mx-auto w-11/12 pt-4">
            <div className="flex h-min pb-4">
                <div className="flex-shrink-0 mr-2 w-36 h-36">
                    <Image src={props.alumni.company.logo_url} alt={props.alumni.company.logo_alt} className="rounded-lg" width="1" height="1" layout="responsive" objectFit="cover" />
                </div>
                <div>
                    <div className="text-xl text-center font-bold">{props.alumni.name} - {props.alumni.company.name}</div>
                    <div className="text-md text-efs-beige mx-auto text-center w-11/12 " dangerouslySetInnerHTML={{ __html: quote }}></div>
                </div>
            </div>
            <div>
                <div className="text-lg text-[#9F9F9F] px-2 pb-2" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>

            <SocialPanel options={SocialsArrayToOptions(props.alumni.socials)} containerClass="mx-auto w-fit py-4" iconFrameClass="fill-white" />
        </div>
    )
}