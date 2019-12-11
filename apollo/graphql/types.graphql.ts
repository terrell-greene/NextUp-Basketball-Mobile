export type User = {
  id: string
  username: string
  fullName: string
  avatarUrl: string
}

export type Court = {
  id: string
  name: string
  phone: string
  coords: {
    latitude: number
    longitude: number
  }
}

export type Session = {
  id: string
  court: Court
  createdBy: User
  attending: User[]
  date: string
  times: string
  start: Date
  end: Date
  numberAttending: number
}
