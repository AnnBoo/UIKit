import type { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedReaction } from 'react-native-reanimated';
import type { Dimensions } from '../types';
import { DuplicateContentState } from '../constants';

type Measurements = {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
};

const measure = (originalRef: React.RefObject<View>): Promise<Measurements> => {
    return new Promise((resolve, reject) => {
        if (originalRef && originalRef.current) {
            originalRef.current.measure((x, y, width, height, pageX, pageY) => {
                resolve({ x, y, width, height, pageX, pageY });
            });
        } else {
            reject(new Error('measure: animated ref not ready'));
        }
    });
};

export const useDimensions = (
    originalRef: React.RefObject<View>,
    duplicateContentState: Animated.SharedValue<DuplicateContentState>,
    onMeasureEnd: () => void,
): Dimensions => {
    const width = useSharedValue<number>(0);
    const height = useSharedValue<number>(0);
    const pageX = useSharedValue<number>(0);
    const pageY = useSharedValue<number>(0);

    useAnimatedReaction(
        () => {
            return {
                duplicateContentState: duplicateContentState.value,
            };
        },
        (state, prevState) => {
            if (
                !prevState ||
                (prevState?.duplicateContentState === DuplicateContentState.Closed &&
                    state.duplicateContentState === DuplicateContentState.Measurement)
            ) {
                measure(originalRef)
                    .then(measurements => {
                        width.value = measurements.width;
                        height.value = measurements.height;
                        pageX.value = measurements.pageX;
                        pageY.value = measurements.pageY;

                        onMeasureEnd();
                    })
                    .catch(reason => {
                        console.error(`useDimensions.web.tsx: Measuring is failed - ${reason}`);
                    });
            }
        },
        [],
    );

    return {
        width,
        height,
        pageX,
        pageY,
    };
};
