

export interface IData {
  _id: string
  user_id: string,
  name: string,
  doctor: string,
  date: string,
  complaints: string,
}

export interface IAllChange {
  name: string,
  doctor: string,
  date: string,
  complaints: string
}

export interface IRes {
  data: IData[]
}

export interface IModalChangeProps {
  setActiveChange: (e: boolean) => void,
  activeChange: boolean,
  setAllAppoint: (e: IData[]) => void,
  url: string,
  setIdChange: (e: string) => void,
  idChange: string,
  allChange: IAllChange
  setAllChange: (e: IAllChange) => void
}