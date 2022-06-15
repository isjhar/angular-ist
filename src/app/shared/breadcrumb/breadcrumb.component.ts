import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, MenuService } from 'src/app/menu.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  menus: Menu[] = [];
  paths: string[] = [];
  constructor(private menuService: MenuService, private router: Router) {
    this.menus = this.menuService.menus;
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.paths = this.router.url.split('/');
      }
    });
  }

  ngOnInit(): void {}

  get fullPath(): string {
    let paths = this.router.url.split('/');
    let result = '';
    for (let index = 0; index < this.menuService.menus.length; index++) {
      const rootMenu = this.menuService.menus[index];
      if (rootMenu.url == paths[1]) {
        result += rootMenu.name;
        if (!rootMenu.childs) break;

        for (let j = 0; j < rootMenu.childs.length; j++) {
          const childMenu = rootMenu.childs[j];
          if (childMenu.url == paths[2]) {
            result += ' / ' + childMenu.name;
          }
        }
        break;
      }
    }
    return result;
  }

  isChildsHasUrl(childs: any[], url: string): boolean {
    return childs.map((x) => x.url).includes(url);
  }
}
