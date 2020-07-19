import React from 'react';

const CardLike = (props) =>{
    
    return (
        <div className="cards">       
            {props.newsArray.map((row)=>{
          
                    return (
                        <div className="card" key={row.id}>
                            <h1>{row.title}</h1>
                            <p>{row.text.substring(0,300) + '...'}</p>
                        </div>
                    );
                
            }
            )
            }
      
        </div>
    );
}

export default CardLike;
