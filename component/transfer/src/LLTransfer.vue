<template>
    <div class="row">
        <div class="col-sm-3">
            <div class="panel panel-default transfer-container">
                <div class="panel-heading">
                    <input type="checkbox" v-model="leftAllChecked"/>
                    <template v-if="leftAllChecked">
                        {{leftList.length}}/{{leftList.length}}items
                    </template>
                    <template v-else-if="leftCheckedIndexes.length>0">
                        {{leftCheckedIndexes.length}}/{{leftList.length}}items
                    </template>
                    <template v-else>
                        {{leftList.length}}items
                    </template>
                </div>
                <!--<div class="transfer-container-autoC">-->
                    <!--<input type="text" class="form-control"/>-->
                <!--</div>-->
                <div class="panel-body">
                    <ul class="transfer-list">
                        <template v-for="(item,index) in leftList">
                            <li class="transfer-list-item">
                                <input type="checkbox" @change="toggleLeft($event,index)" :key="index"/>
                                {{item[showKey]}}
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-sm-1">
            <div>
                <button type="button"
                        class="btn btn-default"
                        :class="{disabled:!toRightBtnStatus}"
                        :disabled="!toRightBtnStatus"
                        @click="toRight">向右</button>
            </div>
            <div>
                <button type="button"
                        class="btn btn-default"
                        :class="{disabled:!toLeftBtnStatus}"
                        :disabled="!toLeftBtnStatus"
                        @click="toLeft">向左</button>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default transfer-container">
                <div class="panel-body">
                    <ul class="transfer-list">
                        <template v-for="(item,index) in rightList">
                            <li class="transfer-list-item">
                                <input type="checkbox" @change="toggleRight($event,index)"/>
                                {{item[showKey]}}
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="es6">
    function objEqual(obj1, obj2) {
        for (i in obj1) {
            if (obj1.hasOwnProperty(i) && JSON.stringify(obj2[i]) !== JSON.stringify(obj1[i])) {
                return false;
            }
        }
        return true;
    }

    export default{
        name: 'transfer-ll',
        props: {
            dataSource: {
                //原始数据源
                type: Array,
                default(){
                    return [];
                }
            },
            checkdItems: {
                //右侧的数据列表
                type: Array,
                default(){
                    return [];
                }
            },
            matchKey: {
                //匹配的key，可以单个或多个key
                type: Array,
                default(){
                    return ['Id']
                }
            },
            showKey: {
                //显示的key，可以单个或多个key
                type: Array,
                default: ['Name']
            }
        },
        data(){
            return {
                leftMasterCheck: false,
                rightMasterCheck: false,
                leftList: [],
                rightList: [],
                leftAllChecked:false,
                rightAllChecked:false,
                leftCheckedIndexes: [],
                rightCheckedIndexes: []
            };
        },
        created(){
            //处理leftList和rightList
            var that = this;
            var dataSource = this.dataSource;
            this.leftList = dataSource.filter(function (item1) {
                var result;
                that.checkdItems.map(function (item2) {
                    result = objEqual(item1, item2);
                })
                return !result;
            })
            this.rightList = this.checkdItems;
        },
        computed: {
            toRightBtnStatus(){
                return this.leftCheckedIndexes.length > 0;
            },
            toLeftBtnStatus(){
                return this.rightCheckedIndexes.length > 0;
            }
        },
        methods: {
            toRight(){
                var that=this;
                that.leftCheckedIndexes.map(function(index){
                    that.rightList.push(that.leftList[index]);
                    that.leftList.splice(index,1);
                })
                that.leftCheckedIndexes=[];
            },
            toLeft(){
                var that=this;
                that.rightCheckedIndexes.map(function(index){
                    that.leftList.push(that.leftList[index]);
                    that.rightList.splice(index,1);
                })
                that.rightCheckedIndexes=[];
            },
            toggleLeft(event, index){
                var checked = event.target.checked;
                if (checked) {
                    this.leftCheckedIndexes.push(index);
                }else{
                    this.leftCheckedIndexes.filter(function(item,i){
                        return i!==index;
                    })
                }
            },
            toggleRight(event, index){
                var checked = event.target.checked;
                if (checked) {
                    this.rightCheckedIndexes.push(index);
                }else{
                    this.rightCheckedIndexes.filter(function(item,i){
                        return i!==index;
                    })
                }
            },
            listContent(item){
                var showItems = [];
                this.showKey.map(function (key) {
                    showItems.pushs(item[key]);
                })
                return showItems.join('|');
            }
        }
    }
</script>

<style scoped>
    .transfer-container{
        height:500px;
        position:relative;
    }
    .transfer-container-autoC{
        position:absolute;
        top:0;
        left:0;
    }

</style>

