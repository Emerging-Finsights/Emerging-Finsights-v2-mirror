import { SocialCard } from "@components/elements/SocialCard";
import LinkedInPreview from '@public/partner/fintechSocietyLinkedIn-preview.png'
import InstagramPreview from '@public/partner/fintechSocietyInstagram-preview.png'
import WebsitePreview from '@public/partner/fintechSocietyWebsite-preview.png'

const SocialsSection = () => {
    return (
        <div className="z-10 flex flex-row flex-wrap items-center justify-center pt-2 mx-auto text-center">
            <SocialCard text="LinkedIn" textColor="text-blue-500" socialLink="https://www.linkedin.com/company/nottingham-fintech-society/" logoSrc="/svg/linkedin-logo.svg" previewImage={LinkedInPreview}></SocialCard>
            <SocialCard text="Instagram" textColor="text-pink-500" socialLink="https://instagram.com/uonfintech" logoSrc="/svg/instagram-logo.svg" previewImage={InstagramPreview}></SocialCard>
            <SocialCard text="Official Website" textColor="text-efs-orange" socialLink="https://su.nottingham.ac.uk/activities/view/fintech" logoSrc="/svg/web-logo.svg" previewImage={WebsitePreview}></SocialCard>
        </div>
    );
}

SocialsSection.defaultProps = {
    title: "Check out our social media"
}

export default SocialsSection;