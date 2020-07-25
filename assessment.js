"use strict";
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

userNameInput.onkeydown = event =>{
  if(event.key == 'Enter') assessmentButton.onclick();
}

assessmentButton.onclick = function () {
  //ユーザー名取得
  let userName = userNameInput.value;
  console.log(userName);
  if (userName.length === 0) return;

  //診断結果の作成
  removeAllChildren(resultDivided);

  const header = document.createElement("h3");
  header.innerText = "診断結果";
  resultDivided.appendChild(header);
  const paragraph = document.createElement("p");
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //ツイートエリアの作成
  removeAllChildren(tweetDivided);

  const anchor = document.createElement("a");
  const hrefValue =
    "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent("あなたのいいところ診断") + "&ref_src=twsrc%5Etfw";
  anchor.setAttribute("href", hrefValue);
  anchor.className = "twitter-hashtag-button";
  anchor.setAttribute("data-text", result);
  anchor.innerText = "Tweet #あなたのいいところ診断";

  tweetDivided.appendChild(anchor);

  //Twitterボタンの作成
  const script = document.createElement("script");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  tweetDivided.appendChild(script);
};
const answers = [
  "お前のいいところなんて無いぞ",
  "{userName}のいいところは、「無し」です。おめでとうございます。",
  "{userName}のいいところは、「虚無」です。みんなから「　」をされるでしょう。",
];

/**
 * 名前の文字列を渡すと診断結果を返す。
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  const index = sumOfCharCode % answers.length;
  const result = answers[index];

  return result.replace(/\{userName\}/g, userName);
}

/**
 * 指定した要素の子要素を全消し
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(resultDivided.firstChild);
  }
}
