import { createApp } from 'vue'

// Your web app's Firebase configuration
import './config/firebase'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import template from './components/template.vue'
import router from './router'

library.add(fas)
library.add(fab)
library.add(far)
dom.watch()

// Initialize Firebase

const app = createApp(template)

app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(VueSidebarMenu)
app.mount('#app')
