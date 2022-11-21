<template>
  <div>
    <h6>Skills</h6>
    <div class="q-pa-xs bg-white">
      <q-img src="images/neon-avatar-boulder.jpg" />
    </div>
    <q-list class="q-mt-md bordered">
      <q-item v-for="skill in skillKeys" :key="skill">
        <q-item-section>
          <q-item-label class="text-capitalize">{{ skill }}</q-item-label>
          <div>{{ avatarStore.skills[skill] }} / 100</div>
        </q-item-section></q-item
      >
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AvatarStore, useAvatarStore } from 'src/stores/avatar.store';

export default defineComponent({
  name: 'AvatarSkills',
  setup() {
    return {
      avatarStore: ref<AvatarStore>(null as unknown as AvatarStore),
      skillKeys: ref<string[]>([
        'woodcutting',
        'mining',
        'swordsmanship',
        // 'exploration',
      ]),
    };
  },
  created: async function () {
    this.avatarStore = useAvatarStore();
  },
});
</script>

<style scoped lang="scss"></style>
