import React from 'react'
import { type ParamListBase } from '@react-navigation/core'
import { createDrawerNavigator } from '@react-navigation/drawer'

import type { CreateDrawerNavigator as CreateDrawerNavigatorType } from './types'

const CreateDrawerNavigator = <T extends ParamListBase>({
  props,
  routes,
}: CreateDrawerNavigatorType<T>): JSX.Element => {
  const Drawer = createDrawerNavigator<T>()

  return (
    <Drawer.Navigator {...props}>
      {routes.map(route => (
        <Drawer.Screen key={route?.name?.toString()} {...route} />
      ))}
    </Drawer.Navigator>
  )
}

export const Navigator = {
  CreateDrawer: CreateDrawerNavigator,
}
