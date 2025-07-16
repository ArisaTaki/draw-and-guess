// 你画我猜游戏 - JavaScript逻辑控制

// ===== 词库数据 =====
const wordDatabase = {
  成语: [
    // 用户提供的原始词库
    "落井下石",
    "画饼充饥",
    "虎头蛇尾",
    "泪流满面",
    "画蛇添足",
    "一手遮天",
    "羊入虎口",
    "三长两短",
    // 扩展词库
    "守株待兔",
    "亡羊补牢",
    "刻舟求剑",
    "掩耳盗铃",
    "买椟还珠",
    "狐假虎威",
    "井底之蛙",
    "叶公好龙",
    "东施效颦",
    "班门弄斧",
    "对牛弹琴",
    "滥竽充数",
    "邯郸学步",
    "杞人忧天",
    "盲人摸象",
    "坐井观天",
    "鹤立鸡群",
    "凤毛麟角",
    "龙飞凤舞",
    "虎背熊腰",
  ],

  物品: [
    // 用户提供的原始词库
    "空调",
    "口红",
    "自行车",
    "镜子",
    "火锅",
    "茶叶",
    "电脑",
    "日历",
    "象棋",
    "香烟",
    // 扩展词库
    "雨伞",
    "钥匙",
    "手机",
    "眼镜",
    "书包",
    "钢笔",
    "手表",
    "耳机",
    "相机",
    "吉他",
    "足球",
    "篮球",
    "乒乓球",
    "羽毛球",
    "跳绳",
    "风筝",
    "气球",
    "玩具熊",
    "积木",
    "拼图",
    "花瓶",
    "台灯",
    "沙发",
    "窗帘",
    "地毯",
  ],

  动物: [
    // 用户提供的原始词库
    "海豚",
    "老鼠",
    "鸭子",
    "燕子",
    "兔子",
    "孔雀",
    "熊猫",
    "猫头鹰",
    // 扩展词库
    "大象",
    "长颈鹿",
    "狮子",
    "老虎",
    "猴子",
    "袋鼠",
    "斑马",
    "河马",
    "犀牛",
    "企鹅",
    "蝴蝶",
    "蜜蜂",
    "蜻蜓",
    "螃蟹",
    "章鱼",
    "金鱼",
    "鲸鱼",
    "鲨鱼",
    "海星",
    "海马",
    "青蛙",
    "蜗牛",
    "松鼠",
    "刺猬",
    "浣熊",
  ],

  动作: [
    "跳舞",
    "唱歌",
    "跑步",
    "游泳",
    "爬山",
    "骑车",
    "画画",
    "写字",
    "读书",
    "睡觉",
    "吃饭",
    "喝水",
    "刷牙",
    "洗脸",
    "梳头",
    "拍手",
    "挥手",
    "摇头",
    "点头",
    "眨眼",
    "笑",
    "哭",
    "生气",
    "害怕",
    "惊讶",
    "思考",
    "祈祷",
    "拥抱",
    "握手",
    "鞠躬",
    "踢球",
    "打拳",
    "瑜伽",
    "太极",
    "举重",
  ],

  地点: [
    "学校",
    "医院",
    "银行",
    "超市",
    "餐厅",
    "图书馆",
    "博物馆",
    "电影院",
    "公园",
    "动物园",
    "海滩",
    "山顶",
    "森林",
    "沙漠",
    "草原",
    "农场",
    "工厂",
    "办公室",
    "咖啡厅",
    "理发店",
    "游乐场",
    "体育馆",
    "游泳池",
    "火车站",
    "机场",
    "港口",
    "桥梁",
    "隧道",
    "城堡",
    "庙宇",
    "教堂",
    "塔楼",
    "广场",
    "街道",
    "小巷",
  ],

  职业: [
    "医生",
    "老师",
    "警察",
    "消防员",
    "护士",
    "厨师",
    "司机",
    "飞行员",
    "画家",
    "歌手",
    "演员",
    "作家",
    "记者",
    "摄影师",
    "设计师",
    "程序员",
    "工程师",
    "科学家",
    "律师",
    "会计",
    "银行家",
    "商人",
    "农民",
    "渔夫",
    "牧民",
    "建筑师",
    "裁缝",
    "理发师",
    "邮递员",
    "清洁工",
    "保安",
    "导游",
    "翻译",
    "心理医生",
    "兽医",
  ],
};

// ===== 全局变量声明 =====
let gameState = {
  currentScreen: "setup",
  selectedTheme: "",
  playerCount: 4,
  gameTime: 8, // 分钟
  currentWord: "",
  timeRemaining: 0,
  timerId: null,
  isGameActive: false,
  usedWords: new Set(), // 记录已使用的词语，避免重复
};

// ===== DOM元素引用 =====
const screens = {
  setup: document.getElementById("setup-screen"),
  game: document.getElementById("game-screen"),
  end: document.getElementById("end-screen"),
};

const elements = {
  themeSelect: document.getElementById("theme-select"),
  playerInput: document.getElementById("player-count"),
  startButton: document.getElementById("start-game"),
  currentTheme: document.getElementById("current-theme"),
  targetWord: document.getElementById("target-word"),
  wordLength: document.getElementById("word-length"),
  hideWordButton: document.getElementById("hide-word"),
  countdownTimer: document.getElementById("countdown-timer"),
  finalAnswer: document.getElementById("final-answer"),
  finalTheme: document.getElementById("final-theme"),
  restartButton: document.getElementById("restart-game"),
  newGameButton: document.getElementById("new-game"),
};

// ===== 工具函数 =====

// 界面切换函数
function switchScreen(targetScreen) {
  // 移除所有active类
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });

  // 添加active类到目标界面
  screens[targetScreen].classList.add("active");
  gameState.currentScreen = targetScreen;

  console.log(`切换到${targetScreen}界面`);
}

// 格式化时间显示
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// 显示消息提示
function showMessage(message, type = "info") {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // 可以后续扩展为Toast提示
}

// 输入验证函数
function validateGameSettings() {
  const theme = elements.themeSelect.value;
  const playerCount = parseInt(elements.playerInput.value);

  if (!theme) {
    showMessage("请选择游戏主题！", "warning");
    elements.themeSelect.focus();
    return false;
  }

  if (!playerCount || playerCount < 4 || playerCount > 20) {
    showMessage("参与人数必须在4-20人之间！", "warning");
    elements.playerInput.focus();
    return false;
  }

  return true;
}

// ===== 游戏核心函数 =====

// 开始游戏
function startGame() {
  console.log("开始游戏按钮被点击");

  // 验证设置
  if (!validateGameSettings()) {
    return;
  }

  // 保存游戏设置
  gameState.selectedTheme = elements.themeSelect.value;
  gameState.playerCount = parseInt(elements.playerInput.value);
  gameState.gameTime = gameState.playerCount * 2; // 每人2分钟
  gameState.timeRemaining = gameState.gameTime * 60; // 转换为秒

  console.log("游戏设置：", {
    主题: gameState.selectedTheme,
    人数: gameState.playerCount,
    时长: gameState.gameTime + "分钟",
  });

  // 随机选择词语
  selectRandomWord();

  // 更新游戏界面
  updateGameDisplay();

  // 切换到游戏界面
  switchScreen("game");

  // 开始倒计时
  startCountdown();
}

// 随机选择词语
function selectRandomWord() {
  const themeWords = wordDatabase[gameState.selectedTheme];

  if (!themeWords || themeWords.length === 0) {
    console.error(`主题 "${gameState.selectedTheme}" 不存在或词库为空`);
    gameState.currentWord = "词库错误";
    return;
  }

  // 获取当前主题的词库key，用于避免跨主题重复
  const themeKey = `${gameState.selectedTheme}`;

  // 过滤掉已使用的词语
  let availableWords = themeWords.filter(
    (word) => !gameState.usedWords.has(`${themeKey}:${word}`)
  );

  // 如果所有词语都用完了，重置已使用词语记录
  if (availableWords.length === 0) {
    console.log(`主题 "${gameState.selectedTheme}" 的词语已全部使用，重置词库`);
    // 清除当前主题的已使用词语
    const currentThemeUsed = Array.from(gameState.usedWords).filter((word) =>
      word.startsWith(`${themeKey}:`)
    );
    currentThemeUsed.forEach((word) => gameState.usedWords.delete(word));

    // 重新获取可用词语
    availableWords = [...themeWords];
  }

  // 随机选择词语
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const selectedWord = availableWords[randomIndex];

  // 记录已使用的词语
  gameState.usedWords.add(`${themeKey}:${selectedWord}`);
  gameState.currentWord = selectedWord;

  console.log(
    `选中词语：${selectedWord} (主题：${gameState.selectedTheme}，剩余：${
      availableWords.length - 1
    }个)`
  );
}

// 更新游戏界面显示
function updateGameDisplay() {
  elements.currentTheme.textContent = gameState.selectedTheme;
  elements.targetWord.textContent = gameState.currentWord;
  elements.wordLength.textContent = `字数：${gameState.currentWord.length}个字`;
  elements.countdownTimer.textContent = formatTime(gameState.timeRemaining);

  // 显示隐藏词语按钮
  elements.hideWordButton.classList.remove("hidden");
  elements.hideWordButton.style.display = "inline-block";
}

// 隐藏词语，只显示字数
function hideWord() {
  elements.targetWord.textContent = "■".repeat(gameState.currentWord.length);
  elements.hideWordButton.classList.add("hidden");
  elements.hideWordButton.style.display = "none";
  showMessage("词语已隐藏，游戏正式开始！", "success");
}

// 开始倒计时
function startCountdown() {
  gameState.isGameActive = true;

  gameState.timerId = setInterval(() => {
    gameState.timeRemaining--;
    elements.countdownTimer.textContent = formatTime(gameState.timeRemaining);

    // 时间警告效果（最后30秒）
    if (gameState.timeRemaining <= 30) {
      elements.countdownTimer.style.color = "#ff4757";
      elements.countdownTimer.style.animation = "pulse 1s ease-in-out infinite";
    }

    // 时间到
    if (gameState.timeRemaining <= 0) {
      endGame();
    }
  }, 1000);

  console.log("倒计时开始");
}

// 停止倒计时
function stopCountdown() {
  if (gameState.timerId) {
    clearInterval(gameState.timerId);
    gameState.timerId = null;
    gameState.isGameActive = false;
    console.log("倒计时停止");
  }
}

// 更新结束界面答案显示
function updateEndDisplay() {
  elements.finalAnswer.textContent = gameState.currentWord;
  elements.finalTheme.textContent = `主题：${gameState.selectedTheme}`;

  // 更新重新开始按钮的文字，显示当前主题
  elements.restartButton.innerHTML = `🎲 ${gameState.selectedTheme}主题再来一个词语`;

  console.log(
    `公布答案：${gameState.currentWord} (${gameState.selectedTheme})`
  );
}

// 游戏结束
function endGame() {
  console.log("游戏时间到！");
  stopCountdown();

  // 重置计时器样式
  elements.countdownTimer.style.color = "";
  elements.countdownTimer.style.animation = "";

  // 更新结束界面答案显示
  updateEndDisplay();

  // 切换到结束界面
  switchScreen("end");

  showMessage("游戏结束！正确答案已公布", "success");
}

// 重新开始游戏（相同设置）
function restartGame() {
  console.log("重新开始游戏");

  // 重置计时器
  gameState.timeRemaining = gameState.gameTime * 60;

  // 重新选择词语
  selectRandomWord();

  // 更新显示
  updateGameDisplay();

  // 切换到游戏界面
  switchScreen("game");

  // 开始倒计时
  startCountdown();
}

// 新游戏设置
function newGame() {
  console.log("返回设置界面");

  // 停止当前倒计时
  stopCountdown();

  // 重置游戏状态
  gameState.currentWord = "";
  gameState.timeRemaining = 0;

  // 切换到设置界面
  switchScreen("setup");
}

// ===== 事件监听器 =====

// DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  console.log("游戏初始化开始");

  // 设置界面事件
  elements.startButton.addEventListener("click", startGame);

  // 游戏界面事件
  elements.hideWordButton.addEventListener("click", hideWord);

  // 结束界面事件
  elements.restartButton.addEventListener("click", restartGame);
  elements.newGameButton.addEventListener("click", newGame);

  // 人数输入变化时更新时间提示
  elements.playerInput.addEventListener("input", function () {
    const playerCount = parseInt(this.value) || 4;
    const gameTime = playerCount * 2;
    console.log(`人数变更：${playerCount}人，游戏时长：${gameTime}分钟`);
  });

  // 主题选择变化
  elements.themeSelect.addEventListener("change", function () {
    console.log(`主题选择：${this.value}`);
  });

  console.log("游戏初始化完成");
  showMessage("游戏加载完成，请设置游戏参数开始游戏！", "success");
});

// 页面卸载时清理定时器
window.addEventListener("beforeunload", function () {
  stopCountdown();
});

// ===== 调试功能（开发阶段使用） =====
if (typeof window !== "undefined") {
  window.gameDebug = {
    gameState,
    switchScreen,
    startGame,
    endGame,
    stopCountdown,
  };
}
