/**
 * @author rubyisapm
 */
import Vue from 'vue';
import adc from '../../index';
Vue.use(adc);
//import List from '../src/component/list';
//import AutoComplete from '../src/component/autoComplete';
//Vue.component(AutoComplete.name,AutoComplete);

var list=[
    {
        Id:1,
        Name:'one'
    },
    {
        Id:2,
        Name:'two'
    },
    {
        Id:3,
        Name:'three'
    }
];
var a=new Vue({
    el:'#app',
    data:{
        list:[],
        keys:['Id','Name'],
       matchKeys:['Id','Name'],
        showKeys:['Name'],
        allForEmpty:false,
        value:{Id:1}
    },
    methods:{
        select:function(item){
            console.log('select!',item);
        },
        change:function(item){
            console.log('change!',item);
        }
    }
});

setTimeout(function(){
    a.list=list;
},3000);
