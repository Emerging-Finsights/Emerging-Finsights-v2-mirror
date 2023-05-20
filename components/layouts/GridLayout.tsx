import { ReactNode } from "react";

/**
 * Creates a grid layout for displaying lists of content
 * @param props.children The children to be placed in the grid
 * @returns a new grid layout
 */
export const GridLayout = (props: { children?: ReactNode }) => {
    return (
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-2 lg:gap-8 
                    space-around justify-center place-items-center items-center">
            {props.children}
        </div>)
}