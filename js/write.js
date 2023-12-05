//点击删除添加删除线
const buttonText = document.querySelector(`.accordion-button`);
document.querySelector(`.delete-button`).addEventListener(`click`, function () {
  buttonText.classList.add(`delete-text`);
})


