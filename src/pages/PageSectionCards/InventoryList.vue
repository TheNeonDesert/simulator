<template>
  <div class="q-ma-md">
    <h6>Inventory</h6>

    <q-list
      class="bordered"
      v-if="inventoryStore.items && inventoryStore.items.length > 0"
    >
      <q-item v-for="item in inventoryStore.items" v-bind:key="item.name">
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption
            >{{
              (item.durability / item.startingDurability) * 100
            }}%</q-item-label
          >
        </q-item-section>
        <!-- icon="playlist_add_checkmark" -->
        <q-btn
          class="equip-button"
          @click="equipItem(item)"
          label="equip"
          size="sm"
          v-if="!isItemEquipped(item.id)"
        />
        <i class="equip-button q-mt-xs" style="color: gray" v-else>equipped</i>
      </q-item>
    </q-list>
    <q-list class="bordered" v-else>
      <q-item
        ><q-item-section
          ><q-item-label
            >Inventory empty, trying crafting...</q-item-label
          ></q-item-section
        ></q-item
      >
    </q-list>

    <!-- TODO group by type -->
    <!-- <ul v-if="inventoryStore.items && inventoryStore.items.length > 0">
      <li v-for="(item, idx) in inventoryStore.items" v-bind:key="item.name">
        <i v-if="item.durability - item.startingDurability"
          >[{{ (item.durability / item.startingDurability) * 100 }}%]</i
        > -->

    <!-- TODO maybe get rid of this weird thing and instead allow for "slots" -->
    <!-- so a melee weapon slot, axe slot, etc.. just check it as the active item for that slot -->

    <!-- TODO move the repair durability function here, and add a toggle to auto-repair after excursions -->

    <!-- <q-icon
          v-if="idx < inventoryStore.items.length - 1"
          class="cursor-pointer"
          name="keyboard_double_arrow_down"
          @click="moveItemDown(item)"
        ></q-icon>
        <q-icon
          v-if="idx > 0"
          class="cursor-pointer"
          name="keyboard_double_arrow_up"
          @click="moveItemUp(item)"
        ></q-icon>
        <q-icon
          class="cursor-pointer"
          name="delete"
          @click="tossItem(item)"
        ></q-icon>
      </li>
    </ul>
    <ul v-else>
      none yet... try crafting
    </ul> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Item } from 'src/models/Item';

export default defineComponent({
  name: 'InventoryList',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
    };
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
  },
  methods: {
    equipItem: function (item: Item) {
      const validItemTypes = ['axe', 'pickaxe', 'meleeWeapon', 'rangedWeapon'];
      if (item && item.type[0] && validItemTypes.includes(item.type[0])) {
        this.inventoryStore.equippedItemIds[item.type[0]] = item.id;
      }
    },
    isItemEquipped: function (itemIdToCheck: number): boolean {
      if (this.inventoryStore.isItemEquipped) {
        return this.inventoryStore.isItemEquipped(itemIdToCheck);
      } else {
        return false;
      }
    },
    // moveItemUp: async function (item: Item) {
    //   for (let i = 0; i < this.inventoryStore.items.length; i++) {
    //     if (this.inventoryStore.items[i].id === item.id) {
    //       if (i > 0) {
    //         const itemToMove = this.inventoryStore.items[i];
    //         const itemBeingReplaced = this.inventoryStore.items[i - 1];
    //         this.inventoryStore.items[i - 1] = itemToMove;
    //         this.inventoryStore.items[i] = itemBeingReplaced;
    //       }
    //       return;
    //     }
    //   }
    // },
    // moveItemDown: async function (item: Item) {
    //   for (let i = 0; i < this.inventoryStore.items.length; i++) {
    //     if (this.inventoryStore.items[i].id === item.id) {
    //       if (i < this.inventoryStore.items.length - 1) {
    //         const itemToMove = this.inventoryStore.items[i];
    //         const itemBeingReplaced = this.inventoryStore.items[i + 1];
    //         this.inventoryStore.items[i + 1] = itemToMove;
    //         this.inventoryStore.items[i] = itemBeingReplaced;
    //       }
    //       return;
    //     }
    //   }
    // },
    tossItem: async function (item: Item) {
      for (let i = 0; i < this.inventoryStore.items.length; i++) {
        if (this.inventoryStore.items[i].id === item.id) {
          this.inventoryStore.items.splice(i, 1);
          return;
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
// .q-icon {
//   position: absolute;
//   right: 10px;
//   cursor: pointer;
// }

.equip-button {
  margin-top: 4px;
  position: absolute;
  right: 10px;
  // top: 8px;

  ::v-deep i {
    left: 50px;
  }
}
</style>
