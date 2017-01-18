/**
 * @author rubyisapm
 */
import Vue from 'vue';
import adc from '../../index';
Vue.use(adc);
//import Transfer from '../src/component/transfer';
//Vue.component(Transfer.name,Transfer);

new Vue({
    el: '#transfer',
    data:{
        list:[{Id: 1, Name: 'one'}, {Id: 2, Name: 'two'}, {Id: 3, Name: 'three'}],
        showKey:['Name']
    }
});