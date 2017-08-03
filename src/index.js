import StyleLess from './assets/css/main.less';
import './assets/css/test.css';
import Style from './assets/css/test.css';



import Img from '../static/img/pic_load@2x.png';

function component() {

  var element = document.createElement('div');

  element.innerHTML = 'hello webpack';

  // const css = require('./assets/css/test.css').toString();

  // console.log(css); // {String} 

  // element.classList.add('box'); 不使用 CSS Modules

  element.classList.add(Style.box); // 使用 CSS Modules

  console.log(StyleLess);  // undefined 这里是无法获取到 css 对象

  element.classList.add(StyleLess.border);

  var myImg = new Image();

  myImg.src = Img;

  document.body.appendChild(myImg);

  return element;


}

document.body.appendChild(component());