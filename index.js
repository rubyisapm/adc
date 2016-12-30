/**
 * @author rubyisapm
 */

import List from 'list';
import AutoComplete from 'autoComplete';
import Vue from 'vue';
const install = function install() {
    Vue.component(List.name, List);
    Vue.component(AutoComplete.name, AutoComplete);
};

// auto install
// 当vuejs是直接引入时，自动安装
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

module.exports={
    install,
    List,
    AutoComplete
};


