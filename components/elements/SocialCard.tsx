import Image from "next/image"
export const SocialCard = (props: { text: string, textColor: string, socialLink: string, logoSrc: string, previewImage: StaticImageData }) => {
    return (
        <a href={props.socialLink} target="_blank" rel="noreferrer" className="inline-block group m-2 rounded hover:bg-black hover:bg-opacity-10 active:bg-opacity-30 w-fit">
            <div className="flex flex-col items-center text-center sm:w-64 md:w-80 lg:w-96">
                <div className="flex flex-row items-center flex-grow">
                    <svg viewBox="0 0 80 80" width="80px" className="p-3 rounded-full">
                        <image xlinkHref={props.logoSrc} width="80" height="80" />
                    </svg>
                    <h1 className={"pr-3 text-3xl group-hover:underline " + props.textColor}>{props.text}</h1>
                </div>
                <div className="hidden w-full m-0 p-5 border-0 sm:inline"><Image src={props.previewImage} alt={`${props.text} Preview Image`} /></div>
            </div>
        </a>
    )
}