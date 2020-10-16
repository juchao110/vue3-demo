import Vuex from 'vuex'
import common from './common/index'

export default Vuex.createStore({
  modules: {
    common: common
  }
});