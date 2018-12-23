require("../style/our.less");
require("../style/public.css");

//让webpack监听html变化
//只有开发模式有用
if (process.env.NODE_ENV !== 'production') {
    require('../our.html')
}