import { useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/lib/style";
import { partitionArray } from "@/utils/object";

/** Animated progress bar that can display several progresses. */
export function ProgressBar(props: {
  entries: Array<{ color: string; value: number }>;
  total: number;
  className?: string;
}) {
  const [barWidth, setBarWidth] = useState(0);

  const [usedEntries, unUsedEntries] = partitionArray(
    props.entries,
    ({ value }) => (value / props.total) * barWidth >= 1,
  );

  const newTotal =
    props.total - unUsedEntries.reduce((prev, curr) => prev + curr.value, 0);

  const newEntries = usedEntries.map(({ color, value }, idx) => {
    const percent = value / newTotal;
    let width = percent * (barWidth - 2 * (usedEntries.length - 1));
    if (idx !== 0) width += 2;
    return { color, width };
  });

  return (
    <View
      onLayout={({ nativeEvent }) => setBarWidth(nativeEvent.layout.width)}
      className={cn(
        "h-3 flex-row overflow-hidden rounded-full",
        props.className,
      )}
    >
      {newEntries.map((entry, idx) => (
        <ProgressSegment
          key={idx}
          {...entry}
          first={idx === 0}
          last={idx === newEntries.length - 1}
        />
      ))}
    </View>
  );
}

/** Segment of progress bar that gets animated. */
function ProgressSegment(props: {
  color: string;
  width: number;
  first?: boolean;
  last?: boolean;
}) {
  const animatedWidth = useAnimatedStyle(() => ({
    width: withSequence(
      withTiming(props.first ? 0 : 2, { duration: 0 }),
      withTiming(props.width, { duration: 500 }),
    ),
  }));

  return (
    <Animated.View
      style={[{ backgroundColor: props.color }, animatedWidth]}
      className={cn("h-3", {
        "ml-0.5": !props.first,
        "rounded-r-full": props.last,
      })}
    />
  );
}
