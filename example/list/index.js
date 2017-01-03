/**
 * @author rubyisapm
 */
import Vue from 'vue';
import adc from '../../index';
Vue.use(adc);
//import List from '../src/component/list';
//import AutoComplete from '../src/component/autoComplete';
//Vue.component(AutoComplete.name,AutoComplete);

Vue.filter('dateTimeBToF', function (value) {
    return '时间'+value;
});
new Vue({
    el: '#list',

    data: {
        theads: [
            {
                key: 'BeginTime',
                name: '开始时间',
                filter: 'dateTimeBToF'
            },
            {
                key: 'EndTime',
                name: '结束时间',
                filter: 'dateTimeBToF'
            },
            {
                key: 'H5Url',
                name: '跳转链接'
            },
            {
                key: 'Url',
                name: '文件地址'
            },
            {
                key:'Status',
                name:'状态'
            }
        ],
        loading: false,
        responseStatus: true,
        data: [
            {
                BeginTime: '20160101',
                EndTime: '20160103',
                H5Url: 'http://www.baidu.com',
                Url: 'http://www.baidu.com',
                Status:1
            },
            {
                BeginTime: '20160102',
                EndTime: '20160103',
                H5Url: 'http://www.baidu.com',
                Url: 'http://www.baidu.com',
                Status:2
            }
        ],
        config: {
            Url: function (value) {
                return '<img width="100" height="100" src="' + value + '"/>';
            },
            Status:{
                1:{
                    className:'text-success',
                    text:'正常'
                },
                2:{
                    className:'text-danger',
                    text:'停用'
                }
            }
        },
        operations: [
            {
                icon: 'edit',
                text: '查看',
                className:'btn-success',
                action: function (item) {
                    alert('查看操作，我接到的数据'+JSON.stringify(item));
                }
            },
            {
                icon: 'edit',
                text: '链接',
                className:'btn-info',
                link:'http://www.baidu.com'
            },
            {
                icon: 'edit',
                text: '只有状态为启用时我才显示',
                className:'btn-info',
                link:'http://www.baidu.com',
                displayFilter:function(item){
                    return item.Status===1;
                }
            }
        ]
    }
});