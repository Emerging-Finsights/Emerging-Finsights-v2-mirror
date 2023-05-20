import { ReactNode } from 'react'

/**
 * Creates a Section element that holds some content and has a title bar 
 * @param props.title The title that will be displayed at the top of the section
 * @param props.barClasses CSS class names that will be appended to the bars class list
 * @param props.children The content displated within the section
 * @returns A new section
 */
export const Section = (props: { title: string, children: ReactNode, barClasses?: string, barContainerClasses?: string }) => {
    return (
        <div className={props.barContainerClasses}>
            <div className='container mx-auto relative'>
                <div className={`p-3 mx-auto w-4/5 transform z-10 -translate-y-1/2
                                 text-center text-white text-3xl rounded-full shadow-md
                                 flex justify-center items-center ${props.barClasses}`} >
                    {props.title}
                </div>
            </div>

            {props.children}
        </div >)
}