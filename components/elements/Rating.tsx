
export const Star = (props: { clipAmount: number, starForeground: string, starBackground: string, starClasses?: string }) => {

    const classes = `inline-block w-4 h-4 ${props.starClasses ?? ""}`

    // simplest case: no clipping required
    if (props.clipAmount == 1) {
        return (
            <svg className={classes} viewBox="0 0 55.867 55.867" preserveAspectRatio="xMinYMid">
                <path fill={props.starForeground} d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558
	s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024
	l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506
	c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017
	l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"/>
            </svg>
        )
    }
    else if (props.clipAmount == 0) {
        // second simplest case: completely clipped star
        return (
            <svg className={classes} viewBox="0 0 55.867 55.867" preserveAspectRatio="xMinYMid">
                <path fill={props.starBackground} d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558
	s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024
	l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506
	c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017
	l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"/>
            </svg>
        )
    }

    // otherwise new unique clipping path has to be created  
    // this id may cause conflicts but the conflicts will have all the same properties
    const star_id = `star-${props.clipAmount}-${props.starForeground}-${props.starBackground}`;

    return (
        <svg className={classes} viewBox="0 0 55.867 55.867" preserveAspectRatio="xMinYMid">
            <defs>
                <clipPath id={`${star_id}`}>
                    <rect x='0' y='0' width={props.clipAmount * 55.867} height='55.867' />
                </clipPath>
            </defs>

            <path fill={props.starBackground} d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558
	s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024
	l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506
	c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017
	l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"/>

            <path clipPath={`url(#${star_id})`} fill={props.starForeground} d="M55.818,21.578c-0.118-0.362-0.431-0.626-0.808-0.681L36.92,18.268L28.83,1.876c-0.168-0.342-0.516-0.558-0.896-0.558
	s-0.729,0.216-0.896,0.558l-8.091,16.393l-18.09,2.629c-0.377,0.055-0.689,0.318-0.808,0.681c-0.117,0.361-0.02,0.759,0.253,1.024
	l13.091,12.76l-3.091,18.018c-0.064,0.375,0.09,0.754,0.397,0.978c0.309,0.226,0.718,0.255,1.053,0.076l16.182-8.506l16.18,8.506
	c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.224,0.462-0.603,0.397-0.978l-3.09-18.017
	l13.091-12.761C55.838,22.336,55.936,21.939,55.818,21.578z"/>
        </svg>
    )
}

Star.defaultProps = {
    clipAmount: 1,
    starForeground: '#ffbd00',
    starBackground: '#aaaaaa',
    starClasses: null
}

const Rating = (props: { numStars: number, starBackground: string, starForeground: string, maxStars: number, starClasses?: string, containerClass?: string }) => {
    var stars: JSX.Element[] = []

    // render whole stars
    for (let i = 0; i < Math.floor(props.numStars); i++) {
        stars.push(<Star starClasses={props.starClasses} starBackground={props.starBackground} starForeground={props.starForeground} key={i} />);
    }

    // render last fractional star
    if (Math.floor(props.numStars) != props.numStars) {
        const amt = props.numStars - Math.floor(props.numStars)
        stars.push(<Star starClasses={props.starClasses} starBackground={props.starBackground} starForeground={props.starForeground} clipAmount={amt} key={amt} />);
    }

    // render last empty stars 
    if (props.maxStars != null && props.maxStars > props.numStars) {
        const starRemaining = Math.floor(props.maxStars - props.numStars);
        for (let i = 0; i < starRemaining; i++) {
            stars.push(<Star starClasses={props.starClasses} clipAmount={0} starBackground={props.starBackground} starForeground={props.starForeground} key={props.numStars + i} />);
        }
    }

    return (
        <span className={`inline-block align-baseline ${props.containerClass ?? ""}`}>
            {stars}
        </span>)
}

Rating.defaultProps = {
    starForeground: Star.defaultProps.starForeground,
    starBackground: Star.defaultProps.starBackground,
    maxStars: 5,
}

export default Rating;