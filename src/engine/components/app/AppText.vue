<script>
import { h } from 'vue'

export default {
  name: 'AppAppText',
  props: {
    tag: {
      type: String,
      default: 'h1'
    },
    classes: {
      type: [String, Array],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
  },
  render(){
    return h(this.tag, { class: ["text", this.classes] }, this.text);
  }
}
</script>