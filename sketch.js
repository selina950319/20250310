<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <script src="sketch.js" defer></script>
</head>
<body>
</body>
</html>

let radio;
let submitButton;
let resultP;
let correctAnswer;
let currentQuestionIndex = 0;

const questions = [
  { question: '1+1等於多少：', options: ['1', '2', '3', '4'], answer: '2' },
  { question: '2+2等於多少：', options: ['2', '3', '4', '5'], answer: '4' },
  { question: '3+3等於多少：', options: ['5', '6', '7', '8'], answer: '6' },
  // 可以添加更多題目
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#a2d2ff");

  // 顯示題目和選項
  displayQuestion();

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position((windowWidth - submitButton.width) / 2, windowHeight / 2 + 20);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);

  // 顯示結果的段落
  resultP = createP('');
  resultP.position((windowWidth - resultP.width) / 2 + 750, windowHeight / 2 + 70);
  resultP.style('font-size', '30px');
}

function draw() {
  background("#a2d2ff");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("#a2d2ff");
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    resultP.html('測驗完成！');
    resultP.style('color', 'blue');
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  correctAnswer = currentQuestion.answer;

  // 清除之前的題目和選項
  selectAll('p').forEach(p => p.remove());
  selectAll('input').forEach(input => input.remove());
  selectAll('button').forEach(button => button.remove());

  // 顯示題目
  let questionP = createP(currentQuestion.question);
  questionP.position((windowWidth - questionP.width) / 2, windowHeight / 2 - 150);
  questionP.style('font-size', '30px');

  // 建立選擇題
  radio = createRadio();
  shuffle(currentQuestion.options, true); // 隨機排列選項
  currentQuestion.options.forEach(option => radio.option(option));
  radio.position((windowWidth - radio.width) / 2, windowHeight / 2 - 50);
  radio.style('width', '300px');
  radio.style('font-size', '30px');
  radio.style('display', 'flex');
  radio.style('flex-wrap', 'wrap');
  radio.style('justify-content', 'space-between');
  radio.style('background-color', 'pink');

  // 重新建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position((windowWidth - submitButton.width) / 2, windowHeight / 2 + 20);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(checkAnswer);
}

function checkAnswer() {
  const answer = radio.value();
  if (answer === correctAnswer) {
    resultP.html('答對了！');
    resultP.style('color', 'green');
  } else {
    resultP.html('答錯了！');
    resultP.style('color', 'red');
  }

  currentQuestionIndex++;
  setTimeout(() => {
    // 清除之前的結果段落和選項
    resultP.html('');
    selectAll('p').forEach(p => p.remove());
    selectAll('input').forEach(input => input.remove());
    selectAll('button').forEach(button => button.remove());

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      resultP.html('測驗完成！');
      resultP.style('color', 'blue');
    }
  }, 1000); // 延遲1秒顯示下一題
}
