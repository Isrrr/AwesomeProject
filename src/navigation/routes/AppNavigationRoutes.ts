import { ParamListBase } from '@react-navigation/native'
import { GradientClock } from '../../screens/GradientClock'
import { StackRoutesType } from '../types'

export const AppNavigationRoutes: Array<StackRoutesType<ParamListBase>> = [
  {
    name: 'GradientClock',
    component: GradientClock,
    options: {
      headerShown: false,
    },
  },
]
