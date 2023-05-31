import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageConfiguration } from 'src/app/modules/auth/storage-setting/storage-configuration';
import { GlobalService } from 'src/app/modules/auth/_services/GlobalService';
import { environment } from 'src/environments/environment';
import { LayoutService } from '../../../../_metronic/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  isAdminMenu = false;

  constructor(
    private layout: LayoutService,
    private loc: Location,
    private globalService: GlobalService,
    private router: Router,
    private storageConfiguration: StorageConfiguration
  ) { }

  ngOnInit(): void {
    // load view settings
    // this.isAdminMenu = this.globalService.isAdminLoggedIn;
    let isloggedIn = this.storageConfiguration.sessionGetItem(this.storageConfiguration.menushow);
    if (isloggedIn === 'true') {
      this.isAdminMenu = true;
    } else {
      this.isAdminMenu = false;
    }
    console.log('Is Admin Login', this.isAdminMenu);
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;
    // Routing
    this.location = this.loc;
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/home-logo.png';
    } else {
      return './assets/media/logos/home-logo.png';
    }
  }
  signOutCustomer() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.storageConfiguration.sessionRemoveItem(this.storageConfiguration.menushow);
    this.router.navigate(['/auth/customerlogin'], {
      queryParams: {},
    });
  }



}
