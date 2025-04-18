interface GameStats {
  totalGames: number;
  humanWins: number;
  aiWins: number;
  draws: number;
}

// 使用内存变量存储统计数据
const stats: GameStats = {
  totalGames: 0,
  humanWins: 0,
  aiWins: 0,
  draws: 0
};

export function getStats(): GameStats {
  return stats;
}

export function updateStats(result: 'human' | 'ai' | 'draw') {
  stats.totalGames++;
  
  if (result === 'human') {
    stats.humanWins++;
  } else if (result === 'ai') {
    stats.aiWins++;
  } else {
    stats.draws++;
  }
  
  displayStats();
}

export function displayStats() {
  document.getElementById('total-games')!.textContent = stats.totalGames.toString();
  document.getElementById('human-wins')!.textContent = stats.humanWins.toString();
  document.getElementById('ai-wins')!.textContent = stats.aiWins.toString();
  document.getElementById('draws')!.textContent = stats.draws.toString();
}

// 初始显示统计数据
displayStats(); 