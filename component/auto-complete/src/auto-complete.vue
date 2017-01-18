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
                    return ['Id', 'Name'];
                }
            },
            value:{
                type:Object,
                default(){
                    return {};
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
        created(){
            this.selected=this.value;
        },
        mounted(){
            this.input=this.selectedContent;
            window.addEventListener('click', this.clickHandler);
        },
        beforeDestroy(){
            window.removeEventListener('click',this.clickHandler);
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
                } else if (that.allForEmpty) {
                    return that.list;
                } else {
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
            },
            selectedContent(){
                var content = [];
                var that=this;
                that.showKeys.map(function (key) {
                    content.push(that.selected[key]);
                })
                return content.join('|');
            }
        },
        methods: {
            clickHandler(event){
                var that=this;
                if (event.target != that.$refs.input) {
                    that.listVisible = false;
                }
                if (that.input === '') {
                    that.selected = {};
                } else {
                    that.input = that.selectedContent;
                }
            },
            focus(){
                this.listVisible = true;
            },
            select(item){
                this.selected = item;
                this.input = this.selectedContent;
                this.$emit('select',JSON.parse(JSON.stringify(this.selected)));
            },
            completeBrokenValue(){
                var that=this;
                var selected=that.selected;
                var listIsNotEmpty=that.list.length>0;
                var selectedIsBroken=listIsNotEmpty && Object.keys(that.list[0]).length>Object.keys(selected).length;

                if(selectedIsBroken){
                    //当value相比list是不完整对象时，根据list修正这个对象
                    var targetItems=that.list.filter(function(item){
                        var keysInSelected=Object.keys(selected);
                        var matchItems=keysInSelected.filter(function(i){
                            return selected[i]===item[i];
                        })
                        return matchItems.length>0;
                    });
                    that.selected=targetItems[0];
                    that.input=that.selectedContent;
                }
            }
        },
        watch:{
            selected(newVal,oldVal){
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$emit('change', JSON.parse(JSON.stringify(newVal)));
                }

                this.completeBrokenValue();
            },
            list(){
                this.completeBrokenValue();
            }
        }
    };
</script>
<link href="http://static.uc108.com/cdn/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<style scoped>
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