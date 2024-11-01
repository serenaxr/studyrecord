// this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将API设计得更加简洁并且易于复用。
// 随着使用模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 this 则不会这样  

var name = '有鱼';
function eat(){
  this.name='吃鱼';
// 此处this指向window，所以name属性被修改为'吃鱼'
  console.log(this.name);
}
eat();//吃鱼


var name = '有鱼';

function eat(){
  this.name='吃鱼';
// 注意：这里的this指向window，所以window.name属性被修改为'吃鱼'。
  console.log(this.name);
}
var cat = {
  name:'吃鱼',
}
var dog = {
  name:'高飞',
}

eat.call(cat);// 吃鱼，这里跟call函数有关，call函数可以改变函数执行时的this指向。
// // 注意此时传参时，cat是作为第一个参数传入的，所以this指向cat，所以cat.name属性被修改为'吃鱼'，自然输出就是'吃鱼'。



// // 箭头函数的this指向
let num = 11;
const obj1 = {
    num: 22,
    fn1: function() {
        let num = 33;
        const obj2 = {
            num: 44,
            fn2: () => {
                console.log(this.num);
            }
        }
        obj2.fn2();
    }
}
obj1.fn1(); // 22
//箭头函数没有this，箭头函数的this是继承父执行上下文里面的this 
// 这里箭头函数的执行上下文是函数fn1()，所以它就继承了fn1()的this，obj1调用的fn1，所以fn1的this指向obj1， 所以obj1.num 为 22。

let num1 = 11;
const obje1 = {
    num: 22,
    fn1: () => {
        let num1 = 33;
        const obje2 = {
            num1: 44,
            fn2: () => {
                console.log(this.num);
            }
        }
        obje2.fn2();
    }
}
obje1.fn1();
// 上述结果为undefined，因为fn1也是一个箭头函数，所以它就只能继续向上找也就是window了。
// 那为什么是undefined而不是11呢？
// 这里涉及到var和let声明变量的一个区别：使用 let 在全局作用域中声明的变量不会成为 window 对象的属性，var 声明的变量则会(不过，let 声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续，所以使用window访问会为undefined)：

// 总结：this关键字指向调用函数的对象。
// 1、如果普通函数中使用this，则指向window。
// 2、如果箭头函数中使用this，则继承父执行上下文的this。
// 3、如果在普通函数中使用call、apply、bind方法改变this的指向，则指向改变后的对象。
// 4、如果箭头函数中使用call、apply、bind方法改变this的指向，则不起作用。因为箭头函数不绑定自己的this，而是继承自外围作用域的this。箭头函数本身没有独立的this上下文。
// 5、对象的方法：一层指向对象本身，多层指向离this最近的一层对象。
// 6、匿名函数、定时器调用，指向全局对象。
// 7、构造函数调用，指向实例对象。
// 8、DOM事件处理函数调用，this指向触发事件的元素，也就是始事件处理程序所绑定到的DOM节点。

var person = {
  name: "axuebin",
  age: 25
};
function say(job){
  console.log(this.name+":"+this.age+" "+job);
}
say.call(person,"FE"); //axuebin:25 FE
// FE作为参数传入，this指向person对象，输出person对象的name和age属性
// this的值为传入person的值。

// this优先级：
var name = 'window';
var person = {
    name: 'person',
}
var doSth = function(){
    console.log(this.name);
    return function(){
        console.log('return:', this.name);
    }
}
var Student = {
    name: 'rod',
    doSth: doSth,
}
// 普通函数调用
doSth(); // window
// 对象上的函数调用
Student.doSth(); // 'rod'
// call、apply 调用
Student.doSth.call(person); // 'person'
new Student.doSth.call(person); // Uncaught TypeError: Student.doSth.call is not a constructor

// 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
// var bar = new foo()
// 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话， this 绑定的是指定的对象。
// var bar = foo.call(obj2)
// 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话， this 绑定的是那个上下文对象。
// var bar = obj1.foo()
// 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined ，否则绑定到全局对象。
// var bar = foo()
// 结论：new 调用 > call、apply、bind 调用 > 对象上的函数调用 > 普通函数调用