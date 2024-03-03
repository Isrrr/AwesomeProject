import { ParamListBase } from '@react-navigation/native'
import { Navigator } from './navigator'
import { AppNavigationRoutes } from './routes'

export const AppNavigation = (): JSX.Element => {
  return Navigator.CreateDrawer<ParamListBase>({
    props: {
      initialRouteName: 'HomeScreen',
    },
    routes: AppNavigationRoutes,
  })
}
