require("../style/public.css");
require("../style/our.less");

//让webpack监听html变化
//只有开发模式有用
if (process.env.NODE_ENV !== 'production') {
    require('../our.html')
}

//引入js实例
import test from "./public";
test.init();