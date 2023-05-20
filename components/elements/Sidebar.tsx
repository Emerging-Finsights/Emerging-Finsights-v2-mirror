import Link from "next/link";

const SidebarLink = (props: { name: string, link: string }) => {
  return (
    <li>
      <Link href={props.link} passHref>
        <a className="block pl-6 pb-4 transition duration-300 transform hover:text-white">{props.name}</a>
      </Link>
    </li>
  )
}

const MobileOnlySidebarLink = (props: { name: string, link: string }) => {
  return (
    <li>
      <Link href={props.link} passHref>
        {/* <a className="block pb-4 transition duration-300 transform hover:text-white md:hidden">{props.name}</a> */}
        <a className="block pl-6 pb-4 hover:text-white md:hidden">{props.name}</a>
        {/* <a>{props.name}</a> */}
      </Link>
    </li>
  )
}

const CollapseSidebarLink = (props: { name: string, link: string }) => {
  return (
    <li>
      <Link href={props.link} passHref>
        {/* <a className="block pb-4 transition duration-300 transform hover:text-white md:hidden">{props.name}</a> */}
        <a className="block pl-1 pt-2 text-2xl hover:text-white md:hidden">{props.name}</a>
        {/* <a>{props.name}</a> */}
      </Link>
    </li>
  )
}

export const Sidebar = (props: { onSidebarCloseClick: () => void }) => {
  return (
    <div className="h-full pt-12 overflow-x-hidden w-72 bg-efs-logo rounded-tr-xl">
      <button className="absolute w-full text-5xl text-right transition duration-300 transform right-8 top-6 hover:text-white" onClick={props.onSidebarCloseClick}>&times;</button>
      <ul className="mt-6 text-3xl text-black">
        <MobileOnlySidebarLink name="Home" link="/" />

        <div className="md:hidden collapse collapse-arrow align-baseline -mt-3">
          <input type="checkbox" className="peer" /> 
          <div className="collapse-title pl-6 pt-1 mt-2 w-full peer-checked:text-white">
            <span>Insights</span>
            {/* <span className="align-middle">+</span> */}
          </div>
          <div className="collapse-content w-full peer-checked:bg-efs-new-blue-400 peer-checked:mb-4">
            <ul className="h-full w-full">
              <CollapseSidebarLink name="ESG" link="/esg" />
              <CollapseSidebarLink name="Fintech" link="/fintech" />
              <CollapseSidebarLink name="Capital Markets" link="/capital-markets" />
              <CollapseSidebarLink name="Reports" link="/reports" />
            </ul>
          </div>
        </div>
        {/* <MobileOnlySidebarLink name="ESG" link="/esg" />
        <MobileOnlySidebarLink name="Fintech" link="/fintech" />
        <MobileOnlySidebarLink name="Capital Markets" link="/capital-markets" />
        <MobileOnlySidebarLink name="Reports" link="/reports" /> */}
        <div className="md:hidden collapse collapse-arrow align-baseline -mt-3">
          <input type="checkbox" className="peer" /> 
          <div className="collapse-title pl-6 pt-1 mt-2 w-full peer-checked:text-white">
            <span>Blogs</span>
            {/* <span className="align-middle">+</span> */}
          </div>
          <div className="collapse-content w-full peer-checked:bg-efs-new-blue-400 peer-checked:mb-4">
            <ul className="h-full">
              <CollapseSidebarLink name="Books" link="/books" />
              <CollapseSidebarLink name="Personal Finance" link="/personal-finance" />
            </ul>
          </div>
        </div>

        <MobileOnlySidebarLink name="Career Support" link="/career-support" />
        <MobileOnlySidebarLink name="Application Processes" link="/application-processes" />
        <MobileOnlySidebarLink name="Graduate Schemes" link="/graduate-schemes" />

        <div className="md:hidden collapse collapse-arrow align-baseline -mt-3">
          <input type="checkbox" className="peer" /> 
          <div className="collapse-title pl-6 pt-1 mt-2 w-full peer-checked:text-white">
            <span>The Team</span>
            {/* <span className="align-middle">+</span> */}
          </div>
          <div className="collapse-content w-full peer-checked:bg-efs-new-blue-400 peer-checked:mb-4">
            <ul className="h-full">
              <CollapseSidebarLink name="About Us" link="/about-us" />
              <CollapseSidebarLink name="Alumni" link="/alumni" />
            </ul>
          </div>
        </div>
        {/* <MobileOnlySidebarLink name="Alumni" link="/alumni" /> */}
        {/* <MobileOnlySidebarLink name="Books" link="/books" /> */}
        
        <div className="hidden md:block">
          <SidebarLink name="About Us" link="/about-us" />
        </div>
        <SidebarLink name="Partnerships" link="/partnerships/nottingham-fintech-society" />
        <SidebarLink name="Privacy Policy" link="/privacy-policy" />

        {/* Scroll to bottom and hide sidebar */}
        <li>
          <button onClick={() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            props.onSidebarCloseClick()
          }
          } className="block pb-4 pl-6 transition duration-300 transform hover:text-white">
            <p className="cursor-pointer">
              Contact Us
            </p>
          </button>
        </li>
      </ul>
    </div>
  )
}