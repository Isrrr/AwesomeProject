import React, { useEffect, useId } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated'
import {
  Canvas,
  Circle,
  DashPathEffect,
  Line,
  LineProps,
  SkiaProps,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia'

const dayNightColors = ['#b3cde0', '#010015', '#b3cde0']

const { width, height } = Dimensions.get('window')

const getRoundAnimation = (duration: number) =>
  withRepeat(
    withTiming(1, {
      duration,
      easing: Easing.linear,
    }),
    -1,
  )

const ClockLine = (props: SkiaProps<LineProps>) => (
  <Line {...props} style="stroke" strokeJoin="round" strokeCap="round" strokeWidth={4} />
)

export const GradientClock = () => {
  const centerX = width / 2
  const centerY = height / 2
  const centerVec = vec(centerX, centerY)
  const pi2 = Math.PI * 2
  const circleRotate = -pi2 - (4 * (Math.PI / 2)) / 360

  const clockLinesCommon = {
    origin: centerVec,
    p1: vec(centerX, -height),
    p2: vec(centerX, centerY),
  }

  const secondRotation = useSharedValue(0)
  const minuteRotation = useSharedValue(0)
  const hourRotation = useSharedValue(0)
  const animatedSecondRotation = useDerivedValue(() => [{ rotate: pi2 * secondRotation.value }])
  const animatedMinuteRotation = useDerivedValue(() => [{ rotate: pi2 * minuteRotation.value }])
  const animatedHourRotation = useDerivedValue(() => [{ rotate: pi2 * hourRotation.value }])

  useEffect(() => {
    secondRotation.value = getRoundAnimation(60_000)
    minuteRotation.value = getRoundAnimation(3_600_000)
    hourRotation.value = getRoundAnimation(43_200_000)
  }, [hourRotation, minuteRotation, secondRotation])

  const animatedSecondColor = useDerivedValue(
    () =>
      interpolateColor(
        secondRotation.value * 2,
        dayNightColors.map((_, index) => index),
        dayNightColors,
      ),
    [],
  )

  const animatedMinuteColor = useDerivedValue(
    () =>
      interpolateColor(
        minuteRotation.value * 2,
        dayNightColors.map((_, index) => index),
        dayNightColors,
      ),
    [],
  )

  const animatedHourColor = useDerivedValue(
    () =>
      interpolateColor(
        hourRotation.value * 2,
        dayNightColors.map((_, index) => index),
        dayNightColors,
      ),
    [],
  )

  const clockLinesData = [
    {
      ...clockLinesCommon,
      id: useId(),
      p1: vec(centerX, 300),
      transform: animatedHourRotation,
      color: animatedHourColor,
    },
    {
      ...clockLinesCommon,
      id: useId(),
      p1: vec(centerX, 252),
      transform: animatedMinuteRotation,
      color: animatedMinuteColor,
    },
    {
      ...clockLinesCommon,
      id: useId(),
      transform: animatedSecondRotation,
      color: animatedSecondColor,
    },
  ]

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {clockLinesData.map(({ id, ...props }) => (
          <ClockLine key={id} {...props} />
        ))}

        <Circle
          origin={centerVec}
          cx={centerX}
          cy={centerY}
          r={centerX - 40}
          style="stroke"
          strokeWidth={40}
          transform={[{ rotate: circleRotate }]}>
          <DashPathEffect intervals={[4, 78]} />
          <SweepGradient
            origin={centerVec}
            c={centerVec}
            start={0}
            end={360}
            colors={dayNightColors}
            transform={[{ rotate: Math.PI / -2 }]}
          />
        </Circle>
      </Canvas>
      <Text style={styles.day}>DAY</Text>
      <Text style={styles.night}>NIGHT</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
  day: {
    top: 70,
    position: 'absolute',
    fontWeight: '200',
    letterSpacing: 8,
    fontSize: 90,
    alignSelf: 'center',
    color: '#b3cde0',
  },
  night: {
    bottom: 70,
    position: 'absolute',
    fontWeight: '200',
    letterSpacing: 8,
    fontSize: 90,
    alignSelf: 'center',
    color: '#010015',
  },
})
