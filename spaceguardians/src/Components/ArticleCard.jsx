const ArticleCard=({article})=>{
    const date= new Date(article.release_date)
return <div className="articleCard">
<h3>{article.title}</h3>
<div className="articleImgContainer">
<img src={article.thumbnail} alt='profileImage'/>
</div>
<ul id="articleTxt">
   <li>Developer: {article.developer}</li>
   <li>Released on: {date.toLocaleDateString()}</li>
   <li>Genre: {article.genre}</li>
  <a href={article.game_url} target='_blank' rel='noopener noreferrer'> <button>Check out the game</button></a>
</ul>
</div>
}

export default ArticleCard;