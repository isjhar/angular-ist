import { Menu } from './menu';

export interface Role {
  id: number;
  name: string;
  menus: Menu[];
}
