import { Sidebar } from "@components/elements/Sidebar";
import { TRACKING_DISABLED, G3_TRACKING_ID, HOTJAR_ID, HOTJAR_SV } from "@constants/Analytics";
import Head from "next/head";
import { ReactNode, useEffect, useRef } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import ReactGA from "react-ga4"
import { hotjar } from "react-hotjar"

/**
 * Creates a new page layout containing a header and a footer
 * @param props.children The contents of the page
 * @returns a new page layout with the given content
 */
export const Page = (props: { children?: ReactNode, extraRightColumn?: ReactNode }) => {
    const mySidenav = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!TRACKING_DISABLED) {
            ReactGA.initialize(`${G3_TRACKING_ID}`);
            ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search })

            hotjar.initialize(HOTJAR_ID, HOTJAR_SV);
        }
    }, [])

    return (
        <div className="bg-efs-beige">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/small-logo.png" />
                <link rel='icon' href='/favicon.gif' />
            </Head>
            <Header onSidebarOpenClick={() => {
                mySidenav.current?.classList.replace("-translate-x-full", "translate-x-0")
            }} />

            <div ref={mySidenav} id='sidebar' className='fixed top-0 left-0 z-20 h-screen transition duration-500 origin-left transform -translate-x-full'>
                <Sidebar onSidebarCloseClick={() => {
                    mySidenav.current?.classList.replace("translate-x-0", "-translate-x-full")
                }} />
            </div>
            <main>
                {props.children}
            </main>
            <Footer extraRightColumn={props.extraRightColumn} />
        </div>)
}