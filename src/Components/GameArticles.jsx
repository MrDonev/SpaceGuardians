import { useState, useEffect } from 'react';
import { getGames } from '../utils/api';
import ArticleCard from './ArticleCard';
import refresh from './refresh.png'
const Games = () => {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let randomNum = Math.floor(Math.random() * 347 + 5);

  useEffect(() => {
    getGames().then((data) => {
      setReviews(data.slice(randomNum, randomNum + 10));
      setIsLoading(false);
    });
  }, [isLoading]);
  
  return (
    <ul id="articleList">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Other games you may find interesting: <button id='refresh' onClick={()=>setIsLoading(true)}><img src={refresh} alt='refresh'/></button></h1>
          {reviews.map((article) => {
            return (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            );
          })}{' '}
        </>
      )}
    </ul>
  );
};

export default Games;
