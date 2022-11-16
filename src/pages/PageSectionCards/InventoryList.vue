<template>
  <div class="q-ma-md">
    <h6>Inventory</h6>

    <div class="row q-my-md">
      <q-btn
        :label="
          simulationStore.autoRepairItems
            ? 'repair all items (auto)'
            : 'repair all items'
        "
        @click="repairAllItems()"
        color="primary"
        :disabled="simulationStore.autoRepairItems"
      />
    </div>

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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Item } from 'src/models/Item';
import simulatorService from '../../services/simulator.service';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'InventoryList',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
    this.simulationStore = useSimulationStore();
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
    tossItem: async function (item: Item) {
      for (let i = 0; i < this.inventoryStore.items.length; i++) {
        if (this.inventoryStore.items[i].id === item.id) {
          this.inventoryStore.items.splice(i, 1);
          return;
        }
      }
    },
    repairAllItems: function () {
      simulatorService.repairAllItems();
    },
  },
});
</script>

<style scoped lang="scss">
.equip-button {
  margin-top: 4px;
  position: absolute;
  right: 10px;

  ::v-deep i {
    left: 50px;
  }
}
</style>
