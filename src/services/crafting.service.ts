import craftableItems from 'src/gamedata/craftable-items';
import craftableItemCosts from 'src/gamedata/craftable-item-costs';

import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import _ from 'underscore';

class CraftingService {
  private settingsStore: SettingsStore;
  private walletStore: WalletStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.walletStore = useWalletStore();
    this.inventoryStore = useInventoryStore();
  }

  craft(itemKey: string) {
    // check requirements
    _.each(craftableItemCosts[itemKey], (requiredResource) => {
      if (
        this.walletStore[requiredResource.resourceKey] <
        this.settingsStore[requiredResource.settingQuantityKey]
      ) {
        throw `Insufficient ${
          requiredResource.resourceKey
        } to craft ${itemKey}, need ${
          this.settingsStore[requiredResource.settingQuantityKey]
        }`;
      }
    });
    // subtract requirements
    _.each(craftableItemCosts[itemKey], (requiredResource) => {
      (this.walletStore[requiredResource.resourceKey] as number) -=
        this.settingsStore[requiredResource.settingQuantityKey];
    });
    // craft
    let attributes = {};
    // TODO pull this out to gamedata too
    switch (itemKey) {
      case 'leatherSack':
        attributes = {
          additionalCarryingCapacity:
            this.settingsStore.additionalCapacityFromLeatherSack,
        };
        break;
    }
    this.inventoryStore.items.push(craftableItems[itemKey].create(attributes));
  }
}

export default new CraftingService();
