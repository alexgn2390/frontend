<template>
  <div class="section">
    <Header v-if="!state" :title="$t('app.guide.title')" back_link="/app" />
    <Header v-else-if="state == 1" @bClick="Back" :title="selected.folder.title" :img_icon="selected.folder.icon" back_link="none" />
    <Header v-else @bClick="Back" :title="selected.article.title" :img_icon="selected.article.icon" back_link="none" />

    <div class="AppGuide">
      <div v-if="state == 0" class="Content">
        <template v-for="(r, i) in data" :key="`log_${i}`">
          <div @click="OpenFolder(r)" class="Card">
            <img class="icon" src="/engine/assets/img/app/guide/folder.png" />
            <text>{{ r.name }}</text>
            <img class="next" src="/engine/assets/img/app/guide/next.png" />
          </div>
        </template>
      </div>
      <div v-else-if="state == 1" class="Content">
        <template v-for="(r, i) in selected.folder.articles" :key="`log_${i}`">
          <div @click="Read(r)" class="Card article">
            <img class="icon" src="/engine/assets/img/app/guide/text.png" />
            <text>{{ r.name }}</text>
            <div class="read">{{ $t('app.guide.read') }}</div>
          </div>
        </template>
      </div>
      <div v-else-if="state == 2" class="Content">
        <div class="Article">
          <p v-html="selected.article.desc"></p>
          <text v-html="selected.article.text"></text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/engine/components/app/Header.vue";

export default {
  name: 'AppGuideIndexPage',
  data() {
    return {
      state: 0,
      data: [],
      selected: {
        folder: {
          title: '',
          icon: '/engine/assets/img/app/guide/folder.png',
          articles: []
        },
        article: {
          title: '',
          icon: '/engine/assets/img/app/guide/text.png',
          desc: '',
          text: ''
        }
      }
    }
  },
  created(){
    this.getData();
  },
  methods: {
    Back(){
      if(this.state <= 0) return this.state = 0;
      this.state = this.state - 1;
    },
    async OpenFolder(r){
      this.selected.folder.title = r.name;
      this.selected.folder.articles = [];
      await this.getDetail(r.id);
      this.state = 1;
    },
    Read(r){
      this.selected.article.title = r.name;
      this.selected.article.desc = r.desc;
      this.selected.article.text = r.description;
      this.state = 2;
    },
    async getData(){
      const r = await this.$Api.query('knowledge.getGuideGroup', {}, {});
      if(r.status != 'success') return this.$toast.error('Failed to get knowledge');
      this.data = r.response;
    },
    async getDetail(id){
      const r = await this.$Api.query('knowledge.getGuideDetails', {}, { id });
      if(r.status != 'success') return this.$toast.error('Failed to get knowledge');
      this.selected.folder.articles = r.response;
    }
  },
  components: {
    Header
  }
}
</script>
