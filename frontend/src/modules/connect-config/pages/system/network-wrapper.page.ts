// frontend/src/modules/connect-config/pages/system/network-wrapper.page.ts

import { NetworkPage } from './network/network.page';

export class NetworkWrapperPage {
  static getContent(): string {
    const networkPageInstance = new NetworkPage();
    return networkPageInstance.render();
  }

  static getStyles(): string {
    const networkPageInstance = new NetworkPage();
    return networkPageInstance.getStyles();
  }
}
