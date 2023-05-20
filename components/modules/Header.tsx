import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logos/logo.png"

import { TickerTape } from "react-ts-tradingview-widgets";

/**
 * Creates a new header which will be shown on the top of every page
 * @returns new Header component
 */
export const Header = (props: {
    onSidebarOpenClick?: () => void,
    onSearchButtonClick?: () => void
}) => {

    // holds data required to display a link
    interface HpNavLinkSpec {
        name: string
        href: string
        subLink: HpNavLinkSpec[] | null
    }

    // list of all links on the header
    const links: HpNavLinkSpec[] = [
        // {
        //     name: "Home",
        //     href: "/",
        //     subLink: null
        // },
        // {
        //     name: "ESG",
        //     href: "/esg",
        //     subLink: null
        // },
        // {
        //     name: "Fintech",
        //     href: "/fintech",
        //     subLink: null
        // },
        // {
        //     name: "Capital Markets",
        //     href: "/capital-markets",
        //     subLink: null
        // },
        // {
        //     name: "Reports",
        //     href: "/reports",
        //     subLink: null
        // },
        // {
        //     name: "Alumni",
        //     href: "/alumni",
        //     subLink: null
        // },
        // {
        //     name: "Books",
        //     href: "/books",
        //     subLink: null
        // },
        // {
        //     name: "About",
        //     href: "/about-us",
        //     subLink: null
        // },
        // // {
        // //     name: "Partnerships",
        // //     href: "/partnerships"
        // // },
        // {
        //     name: "Partnerships",
        //     href: "/partnerships/nottingham-fintech-society",
        //     subLink: null
        // },

        {
            name: "Home",
            href: "/",
            subLink: null
        },
        {
            name: "Insights",
            href: "/",
            subLink: [
                {
                    name: "Partnerships",
                    href: "/partnerships/nottingham-fintech-society",
                    subLink: null
                },
                {
                    name: "Fintech",
                    href: "/fintech",
                    subLink: null
                },
                {
                    name: "ESG",
                    href: "/esg",
                    subLink: null
                },
                {
                    name: "Capital Markets",
                    href: "/capital-markets",
                    subLink: null
                },
                {
                    name: "Reports",
                    href: "/reports",
                    subLink: null
                },
            ]
        },
        {
            name: "Blogs",
            href: "/",
            subLink: [
                {
                    name: "Personal Finance",
                    href: "/personal-finance",
                    subLink: null
                },
                {
                    name: "Book Reviews",
                    href: "/books",
                    subLink: null
                }
            ]
        },
        {
            name: "Career Support",
            href: "/career-support",
            subLink: null
        },
        {
            name: "Application Processes",
            href: "/application-processes",
            subLink: null
        },
        {
            name: "Graduate Schemes",
            href: "/graduate-schemes",
            subLink: null
        },
        {
            name: "The Team",
            href: "/",
            subLink: [
                {
                    name: "About Us",
                    href: "/about-us",
                    subLink: null
                },
                {
                    name: "Alumni",
                    href: "/alumni",
                    subLink: null
                }
            ]
        }
    ]

    // link element which represents a single link creted from the data above 
    const HpNavLink = (props: { link: HpNavLinkSpec, key: string }) => {
        return (
            <div>
                {
                    props.link.subLink != null ?
                        <div>
                            <div className="group">
                                <a className="hover:underline" > {props.link.name} </a>
                                <div className="hidden group-hover:block">
                                    <div className="absolute scale-[220%] ml-6"><svg xmlns="http://www.w3.org/2000/svg" width="10.033" height="5" fill="#BBD6CE"><path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" /></svg></div>
                                    <div className="absolute right-0 flex flex-row gap-10 lg:gap-24 mt-2 p-3 pl-10 xl:pl-32 bg-efs-new-blue-300 w-full">
                                        {props.link.subLink?.map((sub, index) =>
                                            <div key={index} className="flex flex-wrap whitespace-nowrap">
                                                {sub != null ? <Link href={sub.href} passHref><span>• <span className="hover:underline">{sub.name}</span></span></Link> : null}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <Link key={props.key} href={props.link.href} passHref >
                            <div className="group">
                                <a className="hover:underline" > {props.link.name} </a>
                            </div>
                        </Link >
                }
            </div>
        )
    }

    return (
        <header>
            <div className="flex flex-wrap justify-around gap-4 pl-6 pr-6 mx-auto md:justify-between">

                {/* Left sidebar open icon  */}
                <div className="flex items-center gap-4 lg:gap-6">
                    <svg viewBox="0 0 80 80"
                        className="pt-2 w-8 h-8 transition-colors cursor-pointer active:fill-efs-turq fill-efs-logo"
                        onClick={props.onSidebarOpenClick}>
                        <rect width="80" height="12" rx="4"></rect>
                        <rect y="30" width="80" height="12" rx="4"></rect>
                        <rect y="60" width="80" height="12" rx="4"></rect>
                    </svg>
                </div>

                {/* Center header image */}
                <div className="w-screen md:w-3/5">
                    <Link href="/">
                        <a className="relative">
                            <Image src={Logo} alt="Emerging finsights logo" />
                        </a>
                    </Link>
                </div>

                {/* Right search icon  */}
                <div className="grid place-items-center">
                    <Link passHref href="/search">
                        <a className="inline-block cursor-pointer open-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2.0"
                                stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#63A8A6" }}>
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>

            {/* Display links on seperate line */}
            <div className="hidden p-6 mx-auto md:block">
                <nav className="flex flex-wrap items-center justify-center gap-4 text-xl lg:gap-x-20">
                    {links.map((linkSpec, index) => HpNavLink({ link: linkSpec, key: index.toString() }))}
                </nav>
            </div>

            {/* Display ticker tape */}
            <div className="mx-auto text-center">
                <p className="text-sm font-bold"> Current Trading rates </p>
                <TickerTape symbols={[
                    {
                        proName: "FOREXCOM:SPXUSD",
                        title: "S&P 500"
                    },
                    {
                        proName: "FOREXCOM:NSXUSD",
                        title: "Nasdaq 100"
                    },
                    {
                        proName: "FX_IDC:EURUSD",
                        title: "EUR/USD"
                    },
                    {
                        proName: "BITSTAMP:BTCUSD",
                        title: "BTC/USD"
                    },
                    {
                        proName: "BITSTAMP:ETHUSD",
                        title: "ETH/USD"
                    },
                    {
                        title: "XMR/USD",
                        proName: "KRAKEN:XMRUSD"
                    },
                    {
                        title: "FTSE 100",
                        proName: "CURRENCYCOM:UK100"
                    }
                ]}
                    showSymbolLogo={false}
                    colorTheme="light"
                    isTransparent={true}
                    displayMode="compact"
                    locale="uk"
                />
            </div>
        </header>
    )
}