import Image from "next/image"

export const StaticBannerImage = (props: { desktopImage: StaticImageData, mobileImage: StaticImageData, imageAltText: string, imageClasses?: string }) => {
    return (
        <div className='absolute left-0 top-0 w-full h-full'>
            <div className={`relative w-full h-full hidden md:block ${props.imageClasses}`}>
                <Image priority
                    placeholder='blur'
                    objectFit='cover'
                    layout='fill'
                    src={props.desktopImage}
                    alt={props.imageAltText} />
            </div>

            <div className={`relative w-full h-full block md:hidden ${props.imageClasses}`}>
                <Image priority
                    placeholder='blur'
                    objectFit='cover'
                    layout='fill'
                    src={props.mobileImage}
                    alt={props.imageAltText} />
            </div>
        </div >)
}