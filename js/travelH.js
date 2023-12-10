/*页面滚动到一定位置header固定在顶部*/
const header = document.querySelector(`.header`);
const banner = document.querySelector(`.banner`);

window.addEventListener(`scroll`, () => {
  //当页面滚动到banner模块的时候，改变header的top值
  //获取滚动条位置
  let isHeaderFixed = false;
  const n = document.documentElement.scrollTop;

  console.log(n);

  console.log(banner.offsetTop)

  // 当页面滚动到banner模块的时候，改变header的top值，我css加了一个类专门弄
  if (n >= banner.offsetTop) {
    header.classList.add(`fixTop`);
  } else {
    header.classList.remove('fixTop');
  }
})

