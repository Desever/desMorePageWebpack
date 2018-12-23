
//引入样式
require("../style/public.css");
require("../style/index.less");
//让webpack监听html变化
//只有开发模式有用
if (process.env.NODE_ENV !== 'production') {
    require('../index.html')
}
//引入js实例
import test from "./public";
test.init();

