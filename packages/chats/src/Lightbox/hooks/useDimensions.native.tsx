import { Platform, View } from 'react-native';
import Animated, {
    useSharedValue,
    useDerivedValue,
    measure,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import type { Dimensions } from '../types';
import { DuplicateContentState } from '../constants';

const runUISetWithDelay = (toValue: number): number => {
    'worklet';

    return withDelay(100, withTiming(toValue, { duration: 0 }));
};

export const useDimensions = (
    originalRef: React.RefObject<View>,
    duplicateContentState: Animated.SharedValue<DuplicateContentState>,
): Dimensions => {
    const width = useSharedValue<number>(0);
    const height = useSharedValue<number>(0);
    const pageX = useSharedValue<number>(0);
    const pageY = useSharedValue<number>(0);

    useDerivedValue(() => {
        try {
            if (duplicateContentState.value === DuplicateContentState.Measurement) {
                const measurements = measure(originalRef);

                /**
                 * There is an unknown problem on Android platform when the `View`
                 * does not change its appearance if the value is assigned immediately.
                 * This problem is not permanent, but it sometimes happens without clear logic.
                 * This hack allows to avoid this problem.
                 * TODO: It is necessary to find a solution to the problem
                 */
                if (Platform.OS === 'android') {
                    width.value = runUISetWithDelay(measurements.width);
                    height.value = runUISetWithDelay(measurements.height);
                    pageY.value = runUISetWithDelay(measurements.pageY);
                    pageX.value = runUISetWithDelay(measurements.pageX);

                    // eslint-disable-next-line no-param-reassign
                    duplicateContentState.value = runUISetWithDelay(DuplicateContentState.Opened);
                } else {
                    width.value = measurements.width;
                    height.value = measurements.height;
                    pageY.value = measurements.pageY;
                    pageX.value = measurements.pageX;

                    // eslint-disable-next-line no-param-reassign
                    duplicateContentState.value = DuplicateContentState.Opened;
                }
            }
        } catch (e) {
            console.error(`useDimensions.native.tsx: Measuring is failed - ${e}`);
        }
    }, []);

    return {
        width,
        height,
        pageX,
        pageY,
    };
};