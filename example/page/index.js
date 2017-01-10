/**
 * @author rubyisapm
 */
import Vue from 'vue';
import adc from '../../index';
Vue.use(adc);
//import List from '../src/component/list';
//import AutoComplete from '../src/component/autoComplete';
//Vue.component(AutoComplete.name,AutoComplete);

new Vue({
    el: '#page',
    data: {
        currPage:1,
        pageLen:20,
        totalNum:1000,
        form:true
    }
});