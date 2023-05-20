import Image from "next/image"
import { ReactNode } from "react"

/**
 * Creates a new Image component that is formated as a background image
 * so it can be used within a banner
 * @param props.image The static image
 * @param props.imageAlt The alt-text to be used on the image
 * @returns The new image component
 */
export const BackgroundImage = (props: { image: StaticImageData, imageAlt: string }) => {
    return <Image priority
        placeholder="blur"
        objectFit="cover"
        layout="fill"
        src={props.image}
        alt={props.imageAlt} />
}

/**
 * Creates a new Banner layout that can hold a background and a foreground 
 * @param props.backgroundImage A node that will be placed behind the main content of the banner
 * @param props.children A node that will be showed on top of the background image for the banner
 * @returns The new banner layout
 */
export const Banner = (props: { backgroundImage: ReactNode, children?: ReactNode }) => {
    return (
        <div className='relative w-full h-[80vw] md:h-[37vw]'>
            <div className='relative w-full h-full'>
                {props.backgroundImage}
            </div>

            {/* Put children in absolute area */}
            <div className='absolute left-0 top-0 w-full h-full'>
                {props.children}
            </div>
        </div>)
}
