import Link from "next/link"

import { Social } from "@services/Schema"
import { ReactNode } from "react"

interface SocialOptions {
    instagramLink?: string
    twitterLink?: string
    facebookLink?: string
    linkedinLink?: string
}

export const SocialsArrayToOptions = (socials: Social[]) => {
    let s: SocialOptions = {}

    for (const social of socials) {
        if (social.type == "facebook") {
            s.facebookLink = social.link
        } else if (social.type == "instagram") {
            s.instagramLink = social.link
        } else if (social.type == "twitter") {
            s.twitterLink = social.link
        } else if (social.type == "linkedin") {
            s.linkedinLink = social.link
        }
    }

    return s
}

const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="object-cover" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 640 640"><path d="M579.999 0H60C27 0 0 27 0 60v520c0 33 27 60 60 60h519.999c33 0 60-27 60-60V60c0-33-27-60-60-60zm-59.942 195.935a161.34 161.34 0 0 1-47.079 12.85c16.914-10.086 29.894-26.22 36.095-45.413-15.862 9.39-33.473 16.287-52.087 19.96-15.048-15.92-36.343-25.83-59.942-25.83-45.331 0-82.04 36.685-82.04 82.016 0 6.355.685 12.626 2.09 18.674-68.186-3.484-128.647-36.13-169.148-85.785a82.08 82.08 0 0 0-11.126 41.245c0 28.465 14.457 53.623 36.485 68.257-13.465-.39-26.068-4.11-37.206-10.205v1.04c0 39.756 28.3 72.969 65.86 80.48a82.817 82.817 0 0 1-21.627 2.883c-5.291 0-10.405-.52-15.472-1.477 10.453 32.587 40.713 56.351 76.642 57-28.134 22.04-63.473 35.163-101.954 35.163-6.65 0-13.134-.39-19.606-1.146 36.39 23.362 79.524 36.85 125.872 36.85 150.935 0 233.507-125.056 233.507-233.494 0-3.603-.06-7.122-.236-10.654 16.027-11.457 29.965-25.937 40.925-42.378l.048-.036z" /></svg>)
const LinkedInIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="object-cover" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 640 640"><path d="M579.999 0H60C27 0 0 27 0 60v520c0 33 27 60 60 60h519.999c33 0 60-27 60-60V60c0-33-27-60-60-60zM239.991 519.999h-79.985V239.992h79.985v280.007zm-40.004-320.012c-22.11 0-39.993-17.882-39.993-39.993 0-22.122 17.882-40.004 39.993-40.004 22.122 0 40.004 17.882 40.004 40.004 0 22.11-17.882 39.993-40.004 39.993zm320.012 320.012h-79.986V360.005c0-22.122-17.893-40.004-40.004-40.004-22.122 0-40.004 17.882-40.004 40.004v159.994h-80.01V239.992h80.01v49.642c16.476-22.654 41.752-49.642 69.993-49.642 49.76 0 90 44.764 90 100.005v180.002z" /></svg>)
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="object-cover" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 640 640"><path d="M579.999-.012H60C27-.012-.013 27-.013 60.001V580C-.013 613 27 640.012 60 640.012h519.999c33 0 60.013-27.012 60.013-60.012V60c0-33-27.013-60.012-60.013-60.012zM363.819 173.79h73.147V86.068h-73.147c-56.328 0-102.285 45.945-102.285 102.344v43.843h-58.489V320h58.477v233.932h87.734V320h73.075l14.634-87.745h-87.71v-43.843c0-7.938 6.698-14.634 14.564-14.634v.011z" /></svg>)
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="object-cover" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 640 640"><path d="M579.999 0H60C27 0 0 27 0 60v520c0 33 27 60 60 60h519.999c33 0 60-27 60-60V60c0-33-27-60-60-60zM225.05 97.348h189.912c71.316 0 129.628 57.591 129.628 127.95v189.404c0 70.37-58.312 127.95-129.628 127.95H225.05c-71.304 0-129.628-57.58-129.628-127.95V225.298c0-70.36 58.324-127.95 129.628-127.95zm93.745 102.426c69.296 0 125.541 56.233 125.541 125.54 0 69.309-56.245 125.53-125.54 125.53-69.32 0-125.542-56.221-125.542-125.53 0-69.307 56.221-125.54 125.541-125.54zm0 42.402c45.887 0 83.139 37.229 83.139 83.139 0 45.898-37.252 83.138-83.139 83.138-45.91 0-83.15-37.24-83.15-83.138 0-45.91 37.24-83.14 83.15-83.14zm121.454-59.8c11.256 0 20.375 9.118 20.375 20.374 0 11.256-9.119 20.386-20.375 20.386s-20.386-9.13-20.386-20.386c0-11.256 9.13-20.374 20.386-20.374zm-199.69-48.65h158.895c59.658 0 108.45 48.544 108.45 107.87v159.688c0 59.327-48.792 107.87-108.45 107.87H240.558c-59.646 0-108.45-48.543-108.45-107.87V241.597c0-59.328 48.804-107.871 108.45-107.871z" /></svg>)

const SocialIconFrame = (props: { link: string, iconFrameClass?: string, children: ReactNode }) => {
    return (
        <Link href={props.link} passHref>
            <a target="_blank" rel="noreferrer" className={`block relative w-8 h-8 xl:w-12 xl:h-12 shadow xl:hover:shadow-md transition-all xl:hover:scale-105 ${props.iconFrameClass ?? ""}`}>
                {props.children}
            </a>
        </Link>)
}

export const SocialPanel = (props: { options?: SocialOptions, containerClass?: string, iconFrameClass?: string }) => {
    return (
        <div className={`flex gap-3 xl:gap-5 ${props.containerClass ?? ""}`}>
            {props.options?.linkedinLink != undefined ? <SocialIconFrame iconFrameClass={props.iconFrameClass} link={props.options.linkedinLink}> <LinkedInIcon /> </SocialIconFrame> : null}
            {props.options?.facebookLink != undefined ? <SocialIconFrame iconFrameClass={props.iconFrameClass} link={props.options.facebookLink}> <FacebookIcon /> </SocialIconFrame> : null}
            {props.options?.twitterLink != undefined ? <SocialIconFrame iconFrameClass={props.iconFrameClass} link={props.options.twitterLink}> <TwitterIcon /> </SocialIconFrame> : null}
            {props.options?.instagramLink != undefined ? <SocialIconFrame iconFrameClass={props.iconFrameClass} link={props.options.instagramLink}> <InstagramIcon /> </SocialIconFrame> : null}
        </div>)
}
