import React from 'react';
import { BsHeartFill, BsHeart, BsInboxes, BsTrash } from "react-icons/bs";



const Card = (props) =>{

    return (
        <div className="cards">       
            {props.newsArray.map((row)=>{
              if(row.archive === "0")
              {
                return (
                    <div className="card" key={row.id}>
                        <h1>{row.title}</h1>
                        <p>{row.text.substring(0,300) + '...'}</p>
                        <div className="btns">
                            {
                                 row.like === "1" 
                                 ?
                                 <button 
                                 onClick={() => props.UnLikeNewsMeth(row.id)}>
                                     <BsHeartFill  />
                                 </button>
                                 :
                                 <button 
                                 onClick={() => props.LikeNewsMeth(row.id)}>
                                     <BsHeart  />
                                 </button>
                            }
                           
                            <button 
                            onClick={() => props.ArchNewsMeth(row.id)}>
                                <BsInboxes />
                            </button>
                            <button 
                            onClick={() => props.DelNewsMeth(row.id)}>
                                <BsTrash />
                            </button>
                        </div>
                    </div>
                );
            }
        }
            )
            }
      
        </div>
    );
}

export default Card;
