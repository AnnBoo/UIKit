/* eslint-disable no-param-reassign */
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import type Animated from 'react-native-reanimated';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved, import/extensions
import onWheelHandler from './useOnWheelHandler';

export const useOnWheelHandler: (
    shift: Animated.SharedValue<number>,
    shiftChangedForcibly: Animated.SharedValue<boolean>,
    yIsNegative: Animated.SharedValue<boolean>,
    yWithoutRubberBand: Animated.SharedValue<number>,
    hasScrollShared: Animated.SharedValue<boolean>,
    onScroll: (event: NativeScrollEvent) => void,
    onEnd: () => void,
) =>
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | null = onWheelHandler;
