'use strict' 

{
  const question = document.getElementById('question')
  const choices = document.getElementById('choices')
  const btn = document.getElementById('btn')
  const result = document.getElementById('result')
  const scoreLabel = document.querySelector('#result > p')

  // 正解は配列一番目に入力
  const quizSet = [
    {q: 'マグロ同様、泳ぐのをやめると死ぬ魚は？', c: ['カツオ', 'サケ', 'チョウチンアンコウ']},
    {q: '哺乳類だが卵を産む動物は？', c: ['カモノハシ', 'ジュゴン', 'カピバラ']},
    {q: '体を動かさずに首を回して180度後ろを向くことができる昆虫は？', c: ['カマキリ', 'スズメバチ', 'アリ']},
  ];
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  question.textContent = quizSet[currentNum].q;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j =  Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled')
  }

  function setQuize() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild)
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c])
  
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li')
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    })

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score'
    }
  }
  setQuize();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled')
    
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`
      result.classList.remove('hidden')
    } else {
      currentNum++;
      setQuize();
    }
  })
}