export const ArticleHR = (props: { lineClasses?: string }) => {
    return (
        <hr className={`mt-8 w-full border-solid border-y-2  ${props.lineClasses}`} />
    )
}