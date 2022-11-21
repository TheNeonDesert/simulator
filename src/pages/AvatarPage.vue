<template>
  <div class="row">
    <index-page-card><avatar-stats /></index-page-card>
    <index-page-card><avatar-skills /></index-page-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AvatarStats from './PageSectionCards/AvatarStats.vue';
import IndexPageCard from './PageSectionCards/IndexPageCard.vue';
import AvatarSkills from './PageSectionCards/AvatarSkills.vue';

export default defineComponent({
  name: 'AvatarPage',
  components: {
    AvatarStats,
    IndexPageCard,
    AvatarSkills,
  },
});
</script>

<style scoped lang="scss"></style>
