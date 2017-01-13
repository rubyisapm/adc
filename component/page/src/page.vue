<template>
    <div v-if="visible">
        <div class="form-group" style="float: left;" v-if="form">
            共<strong>{{totalNum}}</strong>条记录，
            第<strong>{{currentPage}}</strong>/<strong>{{pageNum}}</strong>页
        </div>
        <div :style="form ? {float:'right'} : {}">
            <ul class="pagination">
                <li class="previous" :class="previousStatus" @click="previous"><a href="javascript:;">&laquo;</a></li>

                <template v-for="i in pageList.firstStep">
                    <li @click="getPage(i)"><a href="javascript:;">{{i}}</a></li>
                </template>

                <li v-if="pageList.firstDot" class="disabled"><a href="javascript:;">...</a></li>

                <template v-for="i in pageList.secondStep">
                    <li v-if="i===currentPage" class="active"><a href="javascript:;">{{i}}</a></li>
                    <li v-else @click="getPage(i)"><a href="javascript:;">{{i}}</a></li>
                </template>

                <li v-if="pageList.secondDot" class="disabled"><a href="javascript:;">...</a></li>

                <template v-for="i in pageList.thirdStep">
                    <li @click="getPage(i)"><a href="javascript:;">{{i}}</a></li>
                </template>
                <li class="next" :class="nextStatus" @click="next"><a href="javascript:;">&raquo;</a></li>
            </ul>

            <div style="display: inline-block;" class="d-pages-form form-inline ml10" v-if="form">
                到第 <input class="d-pages-form-input form-control input-sm" style="width:60px;" type="number" v-model="jumpTo" min="1"> 页
                <a class="d-pages-form-btn btn btn-sm btn-primary" href="javascript:;" @click="jump">确定</a>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    function listArr(page, totle, len) {
        var arr = [], cs, i, flag = true;
        cs = parseInt(len / 2);
        if (flag && totle <= len) {
            for (i = 1; i <= totle; i++) {
                arr.push(i);
            }
            flag = false;
        }
        if (flag && page <= len - cs) {
            for (i = 1; i <= len; i++) {
                arr.push(i);
            }
            flag = false;
        }
        if (flag && page + cs >= totle) {
            for (i = totle - len + 1; i <= totle; i++) {
                arr.push(i);
            }
            flag = false;
        }
        if (flag) {
            for (i = page - cs; i <= page + cs; i++) {
                arr.push(i);
            }
        }
        return arr;
    }

    export default{
        name: 'page',
        props: {
            currPage: {
                //当前页
                type: Number,
                default: 1
            },
            pageLen: {
                //每页数量
                type: Number,
                default: 10
            },
            totalNum: {
                //记录总数
                type: Number,
                default: 10000
            },
            form: {
                //是否显示跳转
                type: Boolean,
                default: false
            },
            spage: {
                //页面几页后省略
                type: Number,
                default: 5
            },
            topPage: {
                //省略号前显示页数
                type: Number,
                default: 1
            },
            afterPage: {
                //省略号后显示页数
                type: Number,
                default: 1
            }
        },
        data(){
            return {
                jumpTo: '',
                currentPage:this.currPage
            }
        },
        computed: {
            pageNum(){
                return parseInt(Math.ceil(this.totalNum / this.pageLen));
            },
            visible(){
                //页面是否可见
                return this.pageNum>0;
            },
            previousStatus(){
                var num = parseInt(this.currentPage);
                return num <= 1 ? 'disabled' : '';
            },
            pageList(){
                var pageNum = this.pageNum,
                        spage = this.spage,
                        num = parseInt(this.currentPage),
                        arr = listArr(num, pageNum, spage),
                        len = arr.length,
                        firstStep = [],
                        firstDot,
                        secondStep,
                        secondDot,
                        thirdStep = [],
                        showPage;
                if (arr[0] > 1) {
                    showPage = arr[0] <= this.topPage ? arr[0] - 1 : this.topPage;
                    for (i = 1; i <= showPage; i++) {
                        firstStep.push(i);
                    }
                }

                firstDot = arr[0] > this.topPage + 1;

                secondStep = arr;

                secondDot = arr[len - 1] < pageNum - this.afterPage;

                if (arr[len - 1] < pageNum) {
                    showPage = arr[len - 1] >= pageNum - this.afterPage ? pageNum - arr[len - 1] : this.afterPage;
                    for (var i = pageNum - showPage + 1; i <= pageNum; i++) {
                        thirdStep.push(i);
                    }
                }

                return {
                    firstStep: firstStep,
                    firstDot: firstDot,
                    secondStep: secondStep,
                    secondDot: secondDot,
                    thirdStep: thirdStep
                }

            },
            nextStatus(){
                var num = parseInt(this.currentPage),
                        pageNum = this.pageNum;
                return num >= pageNum ? 'disabled' : '';
            }
        },
        methods: {
            jump(){
                var inputNum = parseInt(this.jumpTo);
                if (inputNum > this.pageNum) {
                    inputNum = this.pageNum;
                }
                this.currentPage = inputNum;
                this.$emit('change-page', inputNum);
            },
            previous(){
                if (this.currentPage > 1) {
                    this.currentPage = this.currentPage - 1;
                    this.jumpTo=this.currentPage;
                    this.$emit('change-page', this.currentPage);
                }
            },
            next(){
                if (this.currentPage < this.pageNum) {
                    this.currentPage = this.currentPage + 1;
                    this.jumpTo=this.currentPage;
                    this.$emit('change-page', this.currentPage);
                }
            },
            getPage(page){
                this.currentPage = page;
                this.jumpTo=this.currentPage;
                this.$emit('change-page', page);
            }
        },
        watch:{
            jumpTo(newVal){
                this.jumpTo=(newVal+'').replace(/(^0|\D)/g,'');
            }
        }

    }
</script>