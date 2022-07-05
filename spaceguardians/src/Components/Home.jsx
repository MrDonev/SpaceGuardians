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
     console.log(reviews)
     })
    },[isLoading])
    return <>
    {isLoading ? <h1>Home</h1> : 
    <ul id="articleList">
    {reviews.map(article=>{
        return <li><ArticleCard article={article}/></li>
    }) }
</ul>
    
    }
    </>
}

export default Home;