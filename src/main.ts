import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faPen, faTrash, faListCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPhone)
library.add(faPen)
library.add(faTrash)
library.add(faListCheck)

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
