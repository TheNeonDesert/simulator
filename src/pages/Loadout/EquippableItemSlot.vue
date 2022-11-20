<template>
  <div>
    <q-card bordered class="q-my-sm equipped-item cursor-pointer">
      <q-menu>pick your item</q-menu>
      <q-card-section>
        <q-item-label
          v-if="avatarStore.equippedItemIds[equipmentKey] !== null"
          >{{
            getItemById(avatarStore.equippedItemIds[equipmentKey])?.name
          }}</q-item-label
        >
        <q-item-label v-else>None Equipped</q-item-label>
        <div style="height: 10px"></div>
        <q-item-label caption
          >{{ camelCaseToTitleCase(equipmentKey)
          }}<span v-if="avatarStore.equippedItemIds[equipmentKey] !== null">
            -
            {{ getItemDurability(avatarStore.equippedItemIds[equipmentKey]) }}
          </span></q-item-label
        >
        <!-- icon="playlist_remove" -->
        <q-btn
          class="unequip-button"
          label="unequip"
          size="sm"
          @click="unequipItem(equipmentKey)"
          v-if="avatarStore.equippedItemIds[equipmentKey] !== null"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { AvatarStore, useAvatarStore } from 'src/stores/avatar.store';
import { Item } from 'src/models/Item';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'EquippableItemSlot',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
      avatarStore: ref<AvatarStore>(null as unknown as AvatarStore),
    };
  },
  props: {
    equipmentKey: {
      required: true,
      type: String,
    },
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
    this.avatarStore = useAvatarStore();
  },
  methods: {
    unequipItem: function (itemName: string | number) {
      this.avatarStore.equippedItemIds[itemName] = null;
    },
    getItemById: function (itemId: number | null): Item | void {
      if (this.inventoryStore.getItemById && itemId) {
        return this.inventoryStore.getItemById(itemId);
      }
    },
    camelCaseToTitleCase: function (text: string | number): string {
      return Utils.camelCaseToTitleCase(text as string);
    },
    getItemDurability: function (itemId: number | null): string {
      if (!itemId) return '';
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
  margin-top: 29px;
  position: absolute;
  right: 10px;
  top: 8px;
}

.equipped-item {
  background-color: $page-backround;
  box-shadow: 0 1px 5px rgb(255 255 255 / 20%), 0 2px 2px rgb(255 255 255 / 14%),
    0 3px 1px -2px rgb(255 255 255 / 12%);

  .q-item__label--caption {
    color: gray;
  }
}
</style>
