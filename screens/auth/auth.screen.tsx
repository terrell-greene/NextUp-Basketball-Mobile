import React, { useState } from 'react'
import { Platform, ScrollView, Button } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useNavigation } from 'react-navigation-hooks'

import { AuthContainer, BtnContainer } from './auth.styles'
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
    <AuthContainer
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        {onLoginView ? <Login /> : <SignUp />}

        <BtnContainer>
          <Button title={`or ${title}`} onPress={onButtonPress} />
        </BtnContainer>
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
