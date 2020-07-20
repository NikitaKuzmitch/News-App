import React from 'react';
import { BsHeartFill, BsHeart, BsInboxes, BsTrash } from "react-icons/bs";


        
const Card = (props) =>{

    return (
        <div className="cards">       
            {props.newsArray.map((row)=>{
                return (
                    <div className="card" key={row.id}>
                        <h1>{row.title}</h1>
                        <p>{row.text }</p>
                        <div className="btns">   
                        {
                          
                                props.arrlike.indexOf(row.id) === -1
                                ?
                                <button 
                                onClick={() => props.LikeNewsMeth(row.id)}>
                                      <BsHeart  />
                                  </button>  
                                : 
                                <button 
                                onClick={() => props.DelLikeNewsMeth(row.id)}>
                                      <BsHeartFill  />
                                </button>
                        }   
                                                       
                            <button 
                            onClick={() => props.AddArchNewsMeth(row.id)}>
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
            )
            }
      
        </div>
    );
}

export default Card;
