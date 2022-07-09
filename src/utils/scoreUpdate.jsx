
const UpdateScore = (score) => {
localStorage.setItem('score',score)
localStorage.setItem('gameEnded',true)
const btn = document.getElementById('updateScoreBtn');
btn.style.display='block';
};

export default UpdateScore;
