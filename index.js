/**
 * @author rubyisapm
 */

import List from './component/list/index.js';
import AutoComplete from './component/auto-complete/index.js';
import Page from './component/page/index.js';
import LLTransfer from './component/transfer/index.js';
import Vue from 'vue';
const install = function install() {
    Vue.component(List.name, List);
    Vue.component(AutoComplete.name, AutoComplete);
    Vue.component(Page.name, Page);
    Vue.component(LLTransfer.name, LLTransfer);
};

// auto install
// 当vuejs是直接引入时，自动安装
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports={
    install,
    List,
    AutoComplete,
    Page,
    LLTransfer
};


