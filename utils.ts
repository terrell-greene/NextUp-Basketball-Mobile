import { ActionSheetIOS } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export const keyExtractor = item => item.id.toString()

export const authKey = 'auth'

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0)

export const getPhoto = async (update: (uri: string) => void) => {
  const options = ['Open Camera Roll', 'Take Photo', 'Cancel']
  const cancelButtonIndex = 2
  ActionSheetIOS.showActionSheetWithOptions(
    { options, cancelButtonIndex },
    buttonIndex => {
      switch (buttonIndex) {
        case 0:
          openCameraRoll(update)
          break
        case 1:
          openCamera(update)
          break
      }
    }
  )
}

const openCameraRoll = async (update: (uri: string) => void) => {
  let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  if (status === 'granted') {
    const { cancelled, uri } = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })) as { cancelled: boolean; uri?: string }

    if (!cancelled) {
      update(uri)
    }
  }
}

const openCamera = async (update: (uri: string) => void) => {
  let { status } = await Permissions.askAsync(Permissions.CAMERA)

  if (status === 'granted') {
    const { cancelled, uri } = (await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })) as { cancelled: boolean; uri?: string }

    if (!cancelled) {
      update(uri)
    }
  }
}
