<template>
  <div>
    <h6>Equipped Items</h6>

    <div class="row">
      <div
        class="col-6"
        v-for="(itemId, itemName, idx) in inventoryStore.equippedItemIds"
        v-bind:key="idx"
      >
        <q-card bordered class="q-my-sm">
          <q-card-section>
            <q-item-label v-if="itemId !== null">{{
              getItemById(itemId)?.name
            }}</q-item-label>
            <q-item-label v-else>None Equipped</q-item-label>
            <q-item-label caption
              >{{ camelCaseToTitleCase(itemName)
              }}<span v-if="itemId !== null">
                -

                {{ getItemDurability(itemId) }}

                <!-- {{
                  (getItemById(itemId)?.durability /
                    getItemById(itemId)?.startingDurability) *
                  100
                }} -->
              </span></q-item-label
            >
            <q-btn
              class="unequip-button"
              icon="playlist_remove"
              @click="unequipItem(itemName)"
              v-if="itemId !== null"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Item } from 'src/models/Item';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'EquippedItems',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
    };
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
  },
  methods: {
    unequipItem: function (itemName: string | number) {
      this.inventoryStore.equippedItemIds[itemName] = null;
    },
    getItemById: function (itemId: number): Item | void {
      if (this.inventoryStore.getItemById) {
        return this.inventoryStore.getItemById(itemId);
      }
    },
    camelCaseToTitleCase: function (text: string | number): string {
      return Utils.camelCaseToTitleCase(text as string);
    },
    getItemDurability: function (itemId: number): string {
      const item = this.getItemById(itemId);
      if (item) {
        return (item.durability / item.startingDurability) * 100 + '%';
      } else {
        return '';
      }
    },
  },
});
</script>

<style scoped lang="scss">
.q-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.unequip-button {
  margin-top: 8px;
  position: absolute;
  right: 10px;
  top: 8px;
}
</style>
