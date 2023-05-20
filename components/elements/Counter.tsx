import { useEffect, useState } from "react";

type Easing = (x: number) => number;

/**
 * Tweening 
 * @param a Start number
 * @param b End number
 * @param f Factor between start and end
 * @returns number between start and end varying on f
 */
function tween(a: number, b: number, f: number): number {
    return a + (b - a) * f;
}

/**
 * Linear easing 
 * @param x the input factor 
 * @returns the input factor
 */
export const linearEase: Easing = (x) => {
    return x;
}

/**
 * Cubic easing
 * @param x input factor
 * @returns cubic output factor
 */
export const easeInCubic: Easing = (x) => {
    return x * x * x;
}

/**
 * Component to count between two numbers with a given strategy
 * 
 * @param props.startNum the starting number
 * @param props.endNum the finishing number
 * @param props.timeToFinish the duration of the counting animation (in milliseconds)
 * @param props.easingFunction the easing strategy applied to the time factor (0-1)
 * @returns Counter component
 */
const Counter = (props: { startNum: number, endNum: number, timeToFinish: number, easingFunction: Easing }): JSX.Element => {
    const [count, setCount] = useState(0)
    const [lastTickTime, setLastTickTime] = useState(Date.now());

    var updateCounter = () => {
        var currentTime = Date.now();
        var factor = (currentTime - lastTickTime) / props.timeToFinish;

        setCount(_prevCount => {
            if (_prevCount < props.endNum) {
                setTimeout(updateCounter, 0)
            }
            else {
                return Math.floor(tween(props.startNum, props.endNum, props.easingFunction(1)))
            }
            return Math.floor(tween(props.startNum, props.endNum, props.easingFunction(factor)));
        })
    }

    useEffect(updateCounter);

    return (<> {count} </>)
}

Counter.defaultProps = {
    startNum: 0,
    timeToFinish: 2500,
    easingFunction: linearEase
}

export default Counter;