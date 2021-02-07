interface Response {
  token: string
  user: {
    name: string
    username: string
    email: string
  }
}

export const signIn = (): Promise<Response> => {
  return new Promise(resolve => setTimeout(() => {
    resolve({
      token: '!@$G23Y%YH%$QH$H#@!@34TGhgh',
      user: {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@gmail.com'
      }
    })
  }, 2000))
}
