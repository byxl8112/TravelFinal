//点击删除添加删除线
const buttonText = document.querySelector(`.accordion-button`);
const deleteButton = document.querySelector(`.delete-button`);
// deleteButton.style.top = '15px';
let deleteTop = 15;
// console.log(deleteTop)
/*deleteButton.addEventListener(`click`, function () {
  buttonText.classList.add(`delete-text`);
})*/

//任务添加成功后显示提示框
const alert = document.querySelector(`.alert`)
let timer;
function alertFn(msg, isSuccess){
  //显示显示框，1s后隐藏
  alert.classList.add('show');
  alert.innerHTML = msg;
  //成功和失败颜色框不一样
  const bgStyle = isSuccess ? 'alert-success' : 'alert-danger';
  alert.classList.add(bgStyle);
  //1s后隐藏
  timer = setTimeout(() => {
    alert.classList.remove('show');
    alert.innerHTML = '';
    alert.classList.remove(bgStyle);
  }, 1000);
}

//合计数量默认为1
document.querySelector(`.todo-count`).innerHTML = `
      合 计:<strong> 1 </strong>
    `

function add(){
  //合计数量为total
  let total = document.querySelector(`.todo-count strong`).innerHTML;
  // console.log(total)

  //获取任务框中内容
  const txText = document.querySelector(`.form-control`).value;
  // console.log(txText);
  if (txText.trim() !== ''){
    //添加任务到列表中

    document.querySelector(`.accordion`).insertAdjacentHTML('beforeend', `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ${txText}
                            </button>
                            <button class="delete-button">删除</button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>今天的任务是把前端页面写完</strong>
                                ——— js也太好玩了，改bug改了四五个小时。最后成功运行的成就感满满
                                旅游是人们了解不同文化、传统和历史的途径。通过游览不同地方，
                                游客可以亲身体验并学习其他社会的生活方式，语言，风俗习惯等。
                                旅游有助于个人的成长与启发。面对新的环境和挑战，个体可以培养自信心、
                                独立思考能力，并拓展自己的视野。
                                </div>
                        </div>
                    </div>
<!--                    <button class="delete-button">删除</button>-->
    `)


    // 获取新创建的 button 元素
    const newButton = document.querySelector('.accordion-item:last-child .delete-button');

    /*    //获取一下新的top值
        let deleteTop = newButton.style.top;
        console.log(deleteTop)*/

    //当清除任务后要重新规划
    if(Number(total) === 0){
      newButton.style.top = '15px';
      deleteTop = 15;
    }else{
      // 在前一个按钮的基础上加 52px
      deleteTop += 52;
// 给新 button 设置 top 属性
      newButton.style.top = `${deleteTop}px`;
// 打印新 button 的 top 属性
//       console.log(newButton.style.top);
      console.log(deleteTop)
    }

    //将输入框内容置空
    document.querySelector(`.form-control`).value = '';
    //合计改变
    document.querySelector(`.todo-count`).innerHTML = `
      合 计:<strong> ${Number(total)+1} </strong>
    `


    alertFn("添加成功", true);
  }else{
    alertFn("您输入的内容为空", false);
  }
}

//点击添加任务，先判断
document.querySelector(`.add`).addEventListener(`click`, () => {
  add();
})
//键盘回车添加任务
document.querySelector(`.form-control`).addEventListener(`keyup`, e => {
  if(e.key === 'Enter'){
    add();
  }
})

//清除任务，将所有任务清除
document.querySelector(`.clear-completed`).addEventListener(`click`, () => {
  //将main里面的内容置为空
  document.querySelector(`.accordion`).innerHTML = '';
  //也将合计置为0
  document.querySelector(`.todo-count`).innerHTML = `
      合 计:<strong> 0 </strong>
    `
})

//删除
document.querySelector(`.accordion`).addEventListener(`click`, e => {
  if(e.target.classList.contains('delete-button')){
    // 找到对应的accordion-item，并移除它
    // const accordionItem = e.target.closest('.accordion-item');

    // 找到对应的accordion-item，并移除它
    const accordionItem = e.target.closest('.accordion-item');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const indexToRemove = Array.from(accordionItems).indexOf(accordionItem);

    // 判断是否是最后一个按钮
    const isLastButton = indexToRemove === accordionItems.length - 1;

    // 从indexToRemove开始，调整后续按钮的top值
    for (let i = indexToRemove + 1; i < accordionItems.length; i++) {
      const deleteButton = accordionItems[i].querySelector('.delete-button');
      const currentTop = parseInt(deleteButton.style.top, 10);
      deleteButton.style.top = `${currentTop - 52}px`;

      deleteTop = parseInt(deleteButton.style.top, 10);

      console.log(deleteTop)
    }


    // 如果是最后一个按钮，则更新 deleteTop
    if (isLastButton) {
      deleteTop = deleteTop - 52;
    }

    //移除
    accordionItem.remove();

    //然后将total-1
    let total = document.querySelector(`.todo-count strong`).innerHTML;
    document.querySelector(`.todo-count`).innerHTML = `
      合 计:<strong> ${Number(total)-1} </strong>
    `
  }
})

//点击返回首页跳转到首页index.html
document.querySelector(`.returnS`).addEventListener(`click`, () => {
  location.href = 'index.html';
})

//更换背景，从本地存储中得到，如果没有则添加

//从本地存储中得到图片
const backgroundImage = localStorage.getItem('image');
if (backgroundImage){
  document.body.style.backgroundImage = `url('${backgroundImage}')`;
}

document.querySelector(`.changeB`).addEventListener(`change`, e => {
  console.log(e.target.files[0]);
  const file = e.target.files[0];

  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      console.log(e.target.result);
      const imageUrl = e.target.result;

      //保存到本地
      localStorage.setItem('image', imageUrl);

      //设置body的图片背景
      document.body.style.backgroundImage = `url(${imageUrl})`;
    };

    //读取文件内容
    reader.readAsDataURL(file);
  }

})


