# 自动匹配组件

## 使用

从npm安装`ct-adc`
```
npm install ct-adc
```
在代码中引用
```
import adc from 'ct-adc';
Vue.use(adc)
```
或
```
import adc from 'ct-adc';
import {AutoComplete} from 'ct-adc'
Vue.component(AutoComplete.name,AutoComplete);
```
## 参数说明

参数|描述|类型|默认值 
- | - | - | - | -
allForEmpty | 是否在input没有输入的情况下展示所有数据 | Boolean | true
list | 该组件需要使用的源数据 | Array | []
keys | 需要在每项数据中显示出来的属性，这些属性值以|分隔 | Array | ['Id','Name']
matchKeys | 可以参与匹配的属性 | Array | ['Id','Name']
showKeys | 选择数据后显示在input中的属性 | Array | ['Id','Name']


efji | ejfi
--- | ----
ejfiej | ejfiejf
