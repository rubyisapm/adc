<template>
    <div class="form-group autoComplete">
        <div class="col-lg-8 col-sm-8">
            <div class="dropdown">
                <input type="text" ref="input" class="form-control" v-model="input" @focus="focus"/>
                <template v-if="listVisible">
                    <ul class="dropdown-menu" v-show="matched.length>0">
                        <li v-for="item in matched"
                            @click="select(item)">
                            <a>
                            <span v-for="(key,index) in keys">
                                {{item[key]}}
                                <span v-if="index!=keys.length-1">|</span>
                            </span>
                            </a>
                        </li>
                    </ul>
                    <ul class="dropdown-menu" v-show="matched.length===0">
                        <li class="noResult">{{info}}</li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        name: 'auto-complete',
        props: {
            allForEmpty: {
                type: Boolean,
                default: true
            },
            list: {
                type: [Array],
                default(){
                    return []
                }
            },
            keys: {
                type: Array,
                default(){
                    return ['Id', 'Name'];
                }
            },
            matchKeys: {
                type: Array,
                default(){
                    return ['Id', 'Name'];
                }
            },
            showKeys: {
                type: Array,
                default(){
                    return ['Id','Name'];
                }
            }
        },
        data(){
            return {
                input: '',
                listVisible: false,
                selected: {}
            }
        },
        mounted(){
            var that = this;
            window.addEventListener('click', function (event) {
                if (event.target != that.$refs.input) {
                    that.listVisible = false;
                }
            })
        },
        computed: {
            matched(){
                var that = this;
                if (that.input != '') {
                    return that.list.filter(function (item) {
                        return that.matchKeys.some(function (key) {
                            return (item[key] + '').indexOf(that.input) > -1;
                        })
                    })
                }else if(that.allForEmpty){
                    return that.list;
                }else{
                    return [];
                }
            },
            info(){
                if (this.matched.length !== 0) return;
                if (this.input === '' && !this.allForEmpty) {
                    return '请输入内容进行匹配！';
                } else {
                    return '没有匹配的内容！';
                }
            }
        },
        methods: {
            focus(){
                this.listVisible = true;
            },
            select(item){
                var input=[];
                this.showKeys.map(function(key){
                    input.push(item[key]);
                })
                this.input=input.join('|');
                this.$emit('select', item);
                if (JSON.stringify(item) !== JSON.stringify(this.selected)) {
                    this.$emit('change', item);
                }
            }
        }
    }
</script>
<link href="http://static.uc108.com/cdn/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<style>
    .autoComplete .dropdown-menu {
        width: 100%;
        max-height: 400px;
        overflow-y: scroll;
        display: block;
    }

    .autoComplete .dropdown-menu li {
        cursor: pointer;
    }

    .autoComplete .noResult {
        padding: 3px 20px;
    }
</style>