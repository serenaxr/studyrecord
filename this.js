var name = '有鱼';
function eat(){
  this.name='吃鱼';
// 此处this指向window，所以name属性被修改为'吃鱼'
  console.log(this.name);
}
eat();//吃鱼

// var name = '有鱼';
// function eat(){
//   this.name='吃鱼';
// 注意：此处的this并不是指向window，而是指向cat、dog对象。
// 为什么呢？因为在调用eat函数时，传入了对象参数，this就指向了传入的对象。
//   console.log(this.name);
// }
// var cat = {
//   name:'年年',
// }
// var dog = {
//   name:'高飞',
// }

// eat.call(cat);// 吃鱼
// eat.call(dog);// 吃鱼
