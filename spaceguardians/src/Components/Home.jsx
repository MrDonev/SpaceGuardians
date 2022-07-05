import { useState,useEffect } from "react";
import { getGames } from "../utils/api";
import ArticleCard from "./ArticleCard";
const Home=()=>{
    const [reviews,setReviews]=useState()
    const [isLoading,setIsLoading]=useState(true)
    let randomNum=Math.floor(Math.random()*347 +5)
    useEffect(()=>{
     getGames().then((data)=>{
     setReviews(data.slice(randomNum,randomNum+10));
     setIsLoading(false)
     })
    },[isLoading])
    return <>
    {isLoading ? <h1>Loading...</h1> : 
    
    <ul id="articleList">
        <h1>Other games you may find interesting:</h1>
    {reviews.map(article=>{
        return <li key={article.id}><ArticleCard article={article}/></li>
    }) }
</ul>
    
    }
    </>
}

export default Home;