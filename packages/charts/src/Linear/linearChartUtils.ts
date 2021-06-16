import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import type { Path } from 'react-native-redash';
import type { Point, Dimensions } from './LinearChart';

/**
 * @worklet
 */
const scale = (value: number, domain: number[], range: number[]) => {
    'worklet';

    return interpolate(value, domain, range, Extrapolate.CLAMP);
};

/**
 * @worklet
 */
export const getScaledData = (
    data: Point[],
    dimensions: Dimensions,
): Point[] => {
    'worklet';

    const domain = {
        x: [
            Math.min(...data.map(({ x }) => x)),
            Math.max(...data.map(({ x }) => x)),
        ],
        y: [
            Math.min(...data.map(({ y }) => y)),
            Math.max(...data.map(({ y }) => y)),
        ],
    };
    const range = {
        x: [0, dimensions.width],
        y: [dimensions.height, 0],
    };

    return data.map(
        (point: Point): Point => {
            return {
                x: scale(point.x, domain.x, range.x),
                y: scale(point.y, domain.y, range.y),
            };
        },
    );
};

export type ControlPoint = {
    value: number;
    x: number;
    y: number;
};
export type ControlPoints = {
    start: ControlPoint;
    end: ControlPoint;
};

export const getControlPoints = (
    data: Point[],
    scaledData: Point[],
): ControlPoints => {
    'worklet';

    return {
        start: {
            value: data[0].y,
            x: scaledData[0].x,
            y: scaledData[0].y,
        },
        end: {
            value: data[data.length - 1].y,
            x: scaledData[scaledData.length - 1].x,
            y: scaledData[scaledData.length - 1].y,
        },
    };
};

/**
 * @worklet
 * Was copied from `react-native-redash/Paths`
 */
const createPath = (move: Point): Path => {
    'worklet';

    return {
        move,
        curves: [],
        close: false,
    };
};

/**
 * @worklet
 * Was copied from `react-native-redash/Paths`
 */
const getCurve = (
    currentPoint: Point,
    p0: Point,
    p1: Point,
    isLastPoint: boolean,
) => {
    'worklet';

    const cp1x = (2 * p0.x + p1.x) / 3;
    const cp1y = (2 * p0.y + p1.y) / 3;
    const cp2x = (p0.x + 2 * p1.x) / 3;
    const cp2y = (p0.y + 2 * p1.y) / 3;
    const cp3x = (p0.x + 4 * p1.x + currentPoint.x) / 6;
    const cp3y = (p0.y + 4 * p1.y + currentPoint.y) / 6;
    return {
        c1: { x: cp1x, y: cp1y },
        c2: { x: cp2x, y: cp2y },
        to: isLastPoint ? currentPoint : { x: cp3x, y: cp3y },
    };
};

/**
 * Functions `createPath`, `getCurve` and `curveLines` were copied from `react-native-redash/Paths` package
 * because the `curveLines` function does not behave as expected and had to be changed
 */

/**
 * @worklet
 * Was copied from `react-native-redash/Paths` and changed
 */
const curveLines = (points: Point[]) => {
    'worklet';

    const path = createPath(points[0]);
    for (let i = 0; i < points.length; i += 1) {
        if (i === 0) {
            continue;
        }
        const currentPoint = points[i];
        const previousPoint = points[i - 1];
        const p0 = points[i - 2] || previousPoint;

        path.curves.push(getCurve(currentPoint, p0, previousPoint, false));

        if (i === points.length - 1) {
            path.curves.push(
                getCurve(currentPoint, previousPoint, currentPoint, true),
            );
        }
    }
    return path;
};

/**
 * @worklet
 * used so that the curve is not clipped
 */
const movePoint = (curveWidth: number) => {
    'worklet';

    return (point: Point): Point => {
        'worklet';

        return {
            ...point,
            x: point.x + curveWidth / 2,
            y: point.y + curveWidth / 2,
        };
    };
};

/**
 * @worklet
 */
export const convertDataToPath = (
    data: Point[],
    dimensions: Dimensions,
    strokeWidth: number,
): Path => {
    'worklet';

    const scaledData: Point[] = getScaledData(data, dimensions);
    const movedScaledData: Point[] = scaledData.map(movePoint(strokeWidth));
    return curveLines(movedScaledData);
};

/**
 * @worklet
 * Was copied from `react-native-redash/Paths` and changed
 * (the function must return Path)
 */
export const interpolatePath = (
    value: number,
    inputRange: number[],
    outputRange: Path[],
    extrapolate = Animated.Extrapolate.CLAMP,
): Path => {
    'worklet';

    const path = {
        move: {
            x: interpolate(
                value,
                inputRange,
                outputRange.map((p) => p.move.x),
                extrapolate,
            ),
            y: interpolate(
                value,
                inputRange,
                outputRange.map((p) => p.move.y),
                extrapolate,
            ),
        },
        curves: outputRange[0].curves.map((_, index) => ({
            c1: {
                x: interpolate(
                    value,
                    inputRange,
                    outputRange.map((p) => p.curves[index].c1.x),
                    extrapolate,
                ),
                y: interpolate(
                    value,
                    inputRange,
                    outputRange.map((p) => p.curves[index].c1.y),
                    extrapolate,
                ),
            },
            c2: {
                x: interpolate(
                    value,
                    inputRange,
                    outputRange.map((p) => p.curves[index].c2.x),
                    extrapolate,
                ),
                y: interpolate(
                    value,
                    inputRange,
                    outputRange.map((p) => p.curves[index].c2.y),
                    extrapolate,
                ),
            },
            to: {
                x: interpolate(
                    value,
                    inputRange,
                    outputRange.map((p) => p.curves[index].to.x),
                    extrapolate,
                ),
                y: interpolate(
                    value,
                    inputRange,
                    outputRange.map((p) => p.curves[index].to.y),
                    extrapolate,
                ),
            },
        })),
        close: outputRange[0].close,
    };
    return path;
};
