interface GameStats {
  totalGames: number;
  humanWins: number;
  aiWins: number;
  draws: number;
}

const STATS_KEY = 'c4_game_stats';

export function getStats(): GameStats {
  const statsStr = localStorage.getItem(STATS_KEY);
  if (statsStr) {
    return JSON.parse(statsStr);
  }
  return {
    totalGames: 0,
    humanWins: 0,
    aiWins: 0,
    draws: 0
  };
}

export function saveStats(stats: GameStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function updateStats(result: 'human' | 'ai' | 'draw') {
  const stats = getStats();
  stats.totalGames++;
  
  if (result === 'human') {
    stats.humanWins++;
  } else if (result === 'ai') {
    stats.aiWins++;
  } else {
    stats.draws++;
  }
  
  saveStats(stats);
  displayStats();
}

export function displayStats() {
  const stats = getStats();
  
  document.getElementById('total-games')!.textContent = stats.totalGames.toString();
  document.getElementById('human-wins')!.textContent = stats.humanWins.toString();
  document.getElementById('ai-wins')!.textContent = stats.aiWins.toString();
  document.getElementById('draws')!.textContent = stats.draws.toString();
}

// 初始显示统计数据
displayStats(); 