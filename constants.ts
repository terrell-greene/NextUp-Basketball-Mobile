import { NavigationStackOptions } from 'react-navigation-stack'

export const colorRed = '#BA3F43'
export const colorGrey = '#B9BABB'
export const colorDarkGrey = '#2C2C2E'
export const colorGreen = '#1BB955'
export const colorBlue = '#007ACC'

export const defaultViewStyle = {
  flex: 1,
  backgroundColor: colorDarkGrey,
  color: colorGrey
}

export const defaultStackNavigationOptions = {
  headerTintColor: colorRed,
  headerStyle: { backgroundColor: colorDarkGrey },
  headerLeftContainerStyle: { marginLeft: 10 },
  headerRightContainerStyle: { marginRight: 10 },
  headerTitleStyle: { color: colorGrey },
  headerBackTitle: null
} as NavigationStackOptions
