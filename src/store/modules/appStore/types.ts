/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInfo {
  id: string;
  role: number;
  roleName: string;
  userName: string;
  email: string;
}
export default interface AppState {
  userInfo: UserInfo | null;
  collapsed: boolean;
  showNavSide: boolean | undefined;
  showGameSelect: boolean;
  menuMap: Map<string, []>;
  activedMenu: string;
  activedSubmenu?: string;
  menuList?: string[];
  [key: string]: any
}
