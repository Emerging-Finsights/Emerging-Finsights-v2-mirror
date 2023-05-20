import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { AlumniPerson } from "@services/Schema"
import { useState } from "react";
import { AlumniCard } from "./AlumniCard"
import { MobileAlumniCard } from "./MobileAlumniCard";
import { Carousel } from 'react-responsive-carousel';

export const AlumniCarousel = (props: {
    alumni: AlumniPerson[]
}) => {
    const [alumniIndex, setIndex] = useState(0);

    return (
        <div>
            <div className="bg-[#D6E8DE] hidden lg:block">
                <Carousel className="mx-auto w-full"
                    selectedItem={alumniIndex} onChange={(index) => setIndex(index)}
                    showThumbs={false} stopOnHover={false} infiniteLoop={true} interval={10000} showArrows={false} showIndicators={false} showStatus={false}
                    autoPlay={true}
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={20}>
                    {props.alumni.map((person, index) =>
                        <div key={index} className="relative w-full">
                            {person != undefined ? <AlumniCard alumni={person} /> : null}
                        </div>
                    )}
                </Carousel>

                <div className="flex justify-center mx-auto md:py-2 gap-2 bg-red mb-2 bg-efs-beige pt-2 md:pt-10 rounded-t-xl md:w-10/12">
                    {props.alumni.map((person, index) =>
                        <div key={index}>
                            {alumniIndex == index ? <button id={"alumni" + index} className="btn btn-circle btn-xs bg-efs-logo" onClick={() => setIndex(index)} /> :
                                <button id={"alumni" + index} className="btn btn-circle btn-xs bg-[#AAAAAA]" onClick={() => setIndex(index)} />}
                        </div>
                    )
                    }
                </div>
            </div>
            <div className="block lg:hidden bg-[#D6E8DE]">
                <Carousel className="mx-auto w-full"
                    showThumbs={false} stopOnHover={false} infiniteLoop={true} interval={10000} autoPlay={true} showArrows={false} showIndicators={false} showStatus={false}
                    selectedItem={alumniIndex} onChange={(index) => setIndex(index)}
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={20}>
                    {props.alumni.map((person, index) =>
                        <div key={index} className="relative w-full">
                            {person != undefined ? <MobileAlumniCard alumni={person} /> : null}
                        </div>
                    )}
                </Carousel>

                <div className="flex justify-center mx-auto md:py-2 gap-2 bg-red mb-2 bg-efs-beige pt-2 md:pt-10 rounded-t-xl md:w-10/12">
                    {props.alumni.map((person, index) =>
                        <div key={index}>
                            {alumniIndex == index ? <button id={"alumni" + index} className="btn btn-circle btn-xs bg-efs-logo" onClick={() => setIndex(index)} /> :
                                <button id={"alumni" + index} className="btn btn-circle btn-xs bg-[#AAAAAA]" onClick={() => setIndex(index)} />}
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}