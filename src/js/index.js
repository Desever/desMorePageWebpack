//引入样式
require("../style/index.less");
require("../style/public.css");

//让webpack监听html变化
//只有开发模式有用
if (process.env.NODE_ENV !== 'production') {
    require('../index.html')
}

//引入js实例
import test from "./public";
test.init();

