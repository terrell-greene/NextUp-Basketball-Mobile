import React from 'react'
import { Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { ScrollView, StyleSheet, View } from 'react-native'
import { defaultViewStyle, colorGrey } from '../constants'
import { useNavigation } from 'react-navigation-hooks'
import { Avatar } from 'react-native-elements'
import { useQuery } from '@apollo/react-hooks'
import { Query } from '../apollo'
import { DrawerContentComponentProps } from 'react-navigation-drawer'
import Logout from '../components/logout/logout.component'

const SideDrawer: React.FC<DrawerContentComponentProps> = ({}) => {
  const { closeDrawer } = useNavigation()
  const {
    data: {
      auth: { user }
    }
  } = useQuery(Query.GetAuth)

  return (
    <SafeAreaView
      style={{ ...defaultViewStyle, paddingHorizontal: 20, paddingTop: 10 }}
      forceInset={{ top: 'always', bottom: 'always' }}
    >
      <View>
        <Avatar
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          size="medium"
          source={{
            uri: user && user.avatarUrl ? user.avatarUrl : undefined
          }}
          onPress={closeDrawer}
          containerStyle={{ marginBottom: 10 }}
        />
        <Text style={{ color: colorGrey, fontSize: 20 }}>
          {user ? user.fullName : null}
        </Text>
        <Text style={{ color: colorGrey, fontSize: 15 }}>
          @{user ? user.username : null}
        </Text>
      </View>
      <View style={{ marginTop: 'auto' }}>
        <Logout />
      </View>
    </SafeAreaView>
  )
}

export default SideDrawer
