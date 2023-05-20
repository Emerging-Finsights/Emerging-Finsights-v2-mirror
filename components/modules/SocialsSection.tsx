import { Section } from "./Section";
import { SocialCard } from "@components/elements/SocialCard";
import LinkedInPreview from '@public/socials/linkedin-preview.png'
import InstagramPreview from '@public/socials/instagram-preview.png'
const SocialsSection = (props: { title: string }) => {

    return (
        <Section title={props.title} barClasses='bg-efs-logo'>
            <div className="z-10 flex flex-row flex-wrap items-center justify-center pt-2 mx-auto text-center">
                <SocialCard text="LinkedIn" textColor="text-blue-500" socialLink="https://www.linkedin.com/company/emergingfinsights/" logoSrc="/svg/linkedin-logo.svg" previewImage={LinkedInPreview}></SocialCard>
                <SocialCard text="Instagram" textColor="text-pink-500" socialLink="https://www.instagram.com/emergingfinsights/" logoSrc="/svg/instagram-logo.svg" previewImage={InstagramPreview}></SocialCard>
            </div>
        </Section>
    );
}

SocialsSection.defaultProps = {
    title: "Check out our social media"
}

export default SocialsSection;