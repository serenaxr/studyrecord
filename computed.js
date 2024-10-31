// 想操作哪些DOM，就要先获取这些元素
let computedBox = document.querySelector('#computedBox'),
// 获取整个计算器元素，document.querySelector可以获取文档中的第一个匹配的元素。
    topBox = computedBox.querySelectorAll('.top'),
    // 获取顶部元素，querySelectorAll可以获取文档中所有top元素的集合。
    [totolCountBox,totolPriceBox] = Array.from(computedBox.querySelectorAll('.bottom span')),
    // 获取底部盒子元素并用array.from将其转换为商品合计和总计元素的数组。
    // Array.from() 是 ES6 中新增方法，它可以从类数组对象或可迭代对象（如字符串、Set、Map、NodeList 等）创建一个新的数组实例。
    countsBox=[],
    subtotalBox=[];
    // 定义数组，用于存储各项商品的数量和小计。

    // ‌具名函数表达式binding()
    // 在JavaScript中，具名函数表达式允许在函数表达式中给函数本身命名，而不是仅仅将函数赋值给一个变量。
    const binding = function binding() {
        let str='';
        // 定义一个字符串变量，用于存储商品信息。
        data.forEach(item,index => {
            // forEach 用于遍历data数组，获取每一项商品的数量和价格。
            let {count,price} = item;
            // 解构赋值，获取每一项商品的数量和价格。
             str += `<div class="hang">
            <i class="minus"></i>
            <span class="pronum">${count}</span>
            <i class="add"></i>
          <span class="info">
            单价：${price}元&nbsp;&nbsp;
            小计：<em>${count*price}</em>元
            </span>
        </div> `;
        // 新增每一项商品的HTML代码。
        });
        topBox.innerHTML = str;
        // 将当前商品信息填充到顶部元素中。
        countsBox = Array.from(topBox.querySelectorAll('span.pronum'));
        // 把底部数据元素转换为数组，用于计算商品个数和总费用。
        subtotalBox = Array.from(topBox.querySelectorAll('em'));
        // 得到每项商品的小计元素的集合，用于计算总费用。
        computed();
        // 计算一下总费用。
    };
    binding();
    // 调用binding()函数，初始化计算器。

    const computed = function computed() {
        let counts = 0;
            prices = 0;
        // 定义两个变量，用于存储商品的数量和价格。
        countsBox.forEach(_,index => {
            // forEach 遍历商品数量元素，获取每一项商品的数量。
            // +bindBox[index].innerHTML 将字符串转换为数字。或者用Number()函数也行。
            counts += +countsBox[index].innerHTML;
            // 累加商品数量得到总数量。
            prices += +subtotalBox[index].innerHTML;
            // 累加商品小计得到总费用。
        });
        totolCountBox.innerHTML = counts;
        // 更新商品总数。
        totolPriceBox.innerHTML = prices;
        // 更新商品总费用。
    };
    // 定义计算器函数。

    topBox.addEventListener ('click',function(ev) {
        // addEventListener() 方法用于向指定元素添加一个或多个事件监听器。
        // 监听顶部元素的点击事件。
        let target = ev.target;
            targetTag= target.tagName;
        // 获取点击的元素的标签名。
            targetSty = target.className;
        // 获取点击的元素的类名。

        if(targetTag !== 'I' )return;
        // 如果点击的不是i标签，即不是加号或减号，则直接返回。
        let parent = target.parentNode;
            index = +parent.getAttribute('index');
        // 获取点击的元素的索引值。
            price = data[index].price,
            itemCountBox = countsBox[index],
            itemSubtotalBox = subtotalBox[index];
        // 获取当前点击的商品的价格和数量元素。
        if(targetSty ==='minus'){
            // 如果点击的是减号，则减少商品数量。
            itemCountBox.innerHTML--;
            if(+itemCountBox.innerHTML < 0){
                itemCountBox.innerHTML = 0;
            }
        }else{
            itemCountBox.innerHTML++;
        }
        itemSubtotalBox.innerHTML = itemCountBox.innerHTML;
        // 更新商品数量。
        computed();
        // 计算总费用。
    });
    // 监听顶部元素的点击事件，并执行相应的操作。