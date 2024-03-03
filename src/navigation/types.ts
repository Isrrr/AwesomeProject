import type {
  RouteConfig,
  ParamListBase,
  StackNavigationState,
  DefaultNavigatorOptions,
} from '@react-navigation/core'
import { DrawerNavigationOptions, DrawerNavigationEventMap } from '@react-navigation/drawer'

type StackNavigatorOptions<ParamList extends ParamListBase> = DefaultNavigatorOptions<
  ParamList,
  StackNavigationState<ParamList>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap
>

export type StackRoutesType<ParamList extends ParamListBase> = RouteConfig<
  ParamList,
  keyof ParamList,
  StackNavigationState<ParamList>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap
>

export interface CreateDrawerNavigator<T extends ParamListBase = Record<string, object | undefined>> {
  props?: Omit<StackNavigatorOptions<T>, 'children'>
  routes: Array<StackRoutesType<T>>
}
