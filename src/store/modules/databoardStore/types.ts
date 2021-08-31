/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GameInfo {
  gameBaseId: string | number;
  gameBaseName: string;
  icon: string;
  typeId: number;
  typeName: string;
}

export interface DataboardMenu {
  id: number;
  name: string;
  title: string;
  status: string;
  reportUrl: string;
  children?: DataboardMenu[];
}

export default interface DataBoardState {
  gameList: GameInfo[];
  selectedGame: GameInfo;
  reportMenuList: any[];
}
