document.getElementById('startGameForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const playerName = document.getElementById('playerName').value;
  const gameLevel = document.getElementById('level').value;
  localStorage.setItem('playerName', playerName);
  localStorage.setItem('gameLevel', gameLevel);
  window.location.href = 'game.html';
});
