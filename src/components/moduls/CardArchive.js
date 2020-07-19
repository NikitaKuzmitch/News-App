import React from 'react';
import { BsFillEyeFill, BsTrash } from "react-icons/bs";

const CardArchive = (props) =>{
    
    return (
        <div className="cards">       
            {
                props.newsArray.map((row) => {
                            return (
                                <div className="card" key={row.id}>
                                    <h1>{row.title}</h1>
                                    <p>{row.text.substring(0,300) + '...'}</p>
                                    <div className="btns">        
                                        <button onClick={() => props.DelArchMeth(row.id)}
                                    >
                                            <BsFillEyeFill />
                                        </button>
                                        <button onClick={() => props.DelNewsMeth(row.id)}
                                    >
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

export default CardArchive;
