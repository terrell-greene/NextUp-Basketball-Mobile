import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useNavigation } from 'react-navigation-hooks'

import { AuthContainer, SwitchViewBtn } from './auth.styles'
import Login from '../../components/login/login.component'
import SignUp from '../../components/signup/signup.component'

const AuthScreen: NavigationStackScreenComponent = () => {
  const { setParams } = useNavigation()
  const [onLoginView, setOnLoginView] = useState(true)

  const title = onLoginView ? 'Sign Up' : 'Login'

  const onButtonPress = () => {
    setOnLoginView(!onLoginView)
    setParams({ view: title })
  }

  return (
    <AuthContainer>
      <ScrollView>
        {onLoginView ? <Login /> : <SignUp />}

        <SwitchViewBtn
          title={`or ${onLoginView ? 'Sign Up' : 'Login'}`}
          onPress={onButtonPress}
        />
      </ScrollView>
    </AuthContainer>
  )
}

AuthScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('view', 'Login')
  }
}

export default AuthScreen
