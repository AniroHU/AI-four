interface PlayerRecord {
  name: string;
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
}

const LEADERBOARD_KEY = 'c4_leaderboard';

export function getLeaderboard(): PlayerRecord[] {
  const leaderboardStr = localStorage.getItem(LEADERBOARD_KEY);
  if (leaderboardStr) {
    return JSON.parse(leaderboardStr);
  }
  return [];
}

export function saveLeaderboard(leaderboard: PlayerRecord[]) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
}

export function updatePlayerRecord(playerName: string, result: 'win' | 'loss' | 'draw') {
  if (!playerName) return;
  
  const leaderboard = getLeaderboard();
  let playerRecord = leaderboard.find(record => record.name === playerName);
  
  if (!playerRecord) {
    playerRecord = {
      name: playerName,
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0
    };
    leaderboard.push(playerRecord);
  }
  
  playerRecord.totalGames++;
  if (result === 'win') {
    playerRecord.wins++;
  } else if (result === 'loss') {
    playerRecord.losses++;
  } else {
    playerRecord.draws++;
  }
  
  // 按胜率排序
  leaderboard.sort((a, b) => {
    const winRateA = a.wins / a.totalGames || 0;
    const winRateB = b.wins / b.totalGames || 0;
    return winRateB - winRateA;
  });
  
  saveLeaderboard(leaderboard);
  displayLeaderboard();
}

export function displayLeaderboard() {
  const leaderboard = getLeaderboard();
  const tbody = document.getElementById('leaderboard-body');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  leaderboard.forEach((record, index) => {
    const row = document.createElement('tr');
    const winRate = ((record.wins / record.totalGames) * 100 || 0).toFixed(1);
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${record.name}</td>
      <td>${record.totalGames}</td>
      <td>${record.wins}</td>
      <td>${record.losses}</td>
      <td>${record.draws}</td>
      <td>${winRate}%</td>
    `;
    
    tbody.appendChild(row);
  });
}

// 初始显示排行榜
displayLeaderboard(); 