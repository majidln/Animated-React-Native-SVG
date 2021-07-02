import React, { ReactElement, useState, useRef } from "react";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";

interface Props {
  d: string;
  progress: Animated.SharedValue<number>;
}

const colors = ["#2ecc71", "#9b59b6", "#e74c3c", "#16a085"];
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function AnimatedStroke({ d, progress }: Props): ReactElement {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState<number>(0);
  const ref = useRef<typeof AnimatedPath>(null);
  const bgStrokeAnimated = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value),
  }));
  const strokeAnimated = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.65, 0, 0.35, 1)(progress.value),
  }));

  return (
    <>
      <AnimatedPath
        animatedProps={bgStrokeAnimated}
        d={d}
        stroke={stroke}
        strokeWidth={10}
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={strokeAnimated}
        onLayout={() => setLength(ref.current?.getTotalLength())}
        ref={ref}
        d={d}
        stroke={"black"}
        strokeWidth={10}
        strokeDasharray={length}
      />
    </>
  );
}
