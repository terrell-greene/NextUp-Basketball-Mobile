import styled from 'styled-components/native'
import { colorGrey, colorGreen } from '../../constants'

export const ScheduleSessionView = styled.View`
  padding-top: 50px;
`
export const ScheduleSessionText = styled.Text`
  align-self: center;
  color: ${colorGrey};
  font-size: 20px;
  text-align: center;
`
export const ScheduleSessionBtnContainer = styled.View`
  margin-top: 20px;
  align-self: center;
  border-radius: 100px;
  width: 50%;
  background-color: ${colorGreen};
`
