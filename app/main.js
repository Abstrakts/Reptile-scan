import en from '../src/locales/en.json'
import fr from '../src/locales/fr.json'
import de from '../src/locales/de.json'
import es from '../src/locales/es.json'
import Vue from 'nativescript-vue'
import store from './store/index'
import VueI18n from 'vue-i18n'
import { getString } from '@nativescript/core/application-settings'
import router from './router'
import NSVueShadow from 'nativescript-vue-shadow'
import RadSideDrawerPlugin from 'nativescript-ui-sidedrawer/vue'
import RadListView from 'nativescript-ui-listview/vue'
import CanvasPlugin from 'nativescript-canvas/vue'
import { configureOAuthProviders } from '../authServices'
import axios from 'axios/dist/axios'

configureOAuthProviders()

Vue.use(axios)
axios.defaults.baseURL = 'https://sylviefeedessoins.fr'
Vue.use(RadListView)
Vue.use(NSVueShadow)
Vue.use(VueI18n)
Vue.use(RadSideDrawerPlugin)
Vue.use(CanvasPlugin)

Vue.config.silent = TNS_ENV === 'production'

Vue.registerElement(
  'DropDown',
  () => require('nativescript-drop-down/drop-down').DropDown,
)

Vue.registerElement(
  'SVGImage',
  () => require('@teammaestro/nativescript-svg').SVGImage,
)

Vue.registerElement('PDFView', () => require('nativescript-pdf-view').PDFView)

Vue.registerElement(
  'MaskedTextField',
  () => require('nativescript-masked-text-field').MaskedTextField,
)

const messages = {
  en,
  fr,
  de,
  es,
}

Vue.registerElement(
  'BarcodeScanner',
  () => require('nativescript-barcodescanner').BarcodeScannerView,
)

Vue.registerElement(
  'PullToRefresh',
  () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh,
)

const i18n = new VueI18n({
  locale: getString('language'),
  messages,
})

Vue.prototype.$lang = getString('language')
Vue.prototype.$router = router
Vue.prototype.$axios = axios

Vue.prototype.$goto = function (to, options = { frame: 'content' }) {
  this.$navigateTo(this.$router[to], options)
}

new Vue({
  store,
  i18n,
  render: (h) => h('frame', [h(router['login'])]),
}).$start()
