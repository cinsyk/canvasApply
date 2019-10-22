const body = document.getElementsByTagName('body')[0];
starrySky();

// function drawBtn(ctx, x, y, radius, width, height) {
//   ctx.beginPath();
//   ctx.arc(x, y, radius, 1 / 2 * Math.PI, 3 / 2 * Math.PI);
//   ctx.lineTo(x + width, y - radius);
//   ctx.arc(x + width, y, radius, 3 / 2 * Math.PI, 1 / 2 * Math.PI);
//   ctx.lineTo(x, y + height - radius);
//   ctx.stroke();
// }

// function powerpiont() {
//   const cas = document.getElementById('linkScreen');
//   const ctx = cas.getContext('2d');
//   const WIDTH = 300;
//   const HEIGHT = 56;
//   const RADIUS = HEIGHT / 2;
//   const BEGINX = (500 - WIDTH) / 2;
//   var img = new Image();   // 创建一个<img>元素
//   img.src = 'images/title.png'; // 设置图片源地址
//   img.onload = function () {
//     // 执行drawImage语句
//     ctx.drawImage(img, 0, 0);
//   }
//   cas.height = 600;
//   cas.width = 500;
//   ctx.lineCap = 'round';
//   ctx.strokeStyle = '#fff';
//   drawBtn(ctx, BEGINX, 168, RADIUS, WIDTH, HEIGHT);
//   drawBtn(ctx, BEGINX, 254, RADIUS, WIDTH, HEIGHT);
// }