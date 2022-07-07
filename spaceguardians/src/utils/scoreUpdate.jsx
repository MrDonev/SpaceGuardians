
const UpdateScore = (score) => {
localStorage.setItem('score',score)
localStorage.setItem('gameEnded',true)
};

export default UpdateScore;
