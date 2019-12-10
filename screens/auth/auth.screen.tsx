import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

const AuthScreen: NavigationStackScreenComponent = () => {
  //   const [onLoginView, setOnLoginView] = useState(true)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={100}
      style={{
        flexDirection: 'column',
        justifyContent: 'center'
        // ...defaultViewStyle
      }}
    >
      <ScrollView>
        {/* {onLoginView ? <Login /> : <SignUp />} */}

        {/* <Button
          style={styles.switchViewBtn}
          type="clear"
          title={`or ${onLoginView ? 'Sign Up' : 'Login'}`}
          onPress={() => setOnLoginView(!onLoginView)}
        /> */}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = {
  title: 'Login / Sign Up'
}

export default AuthScreen
