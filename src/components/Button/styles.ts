import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #ccc;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
    color: #222;
    font-size: 18px;
`
