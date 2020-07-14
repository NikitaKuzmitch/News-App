import React from 'react';
import CardLike from '../moduls/CardLike';

class Like extends React.Component {

    constructor(){
        super();
        this.state=({
            news: [],
            error:null,
        });
        this.NewsList();
    }
    
    NewsList = async (e) => {
        await fetch("https://coolskill.ru/newsapp/app.php?type=newslist")
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                news: responseJson
            });
        },
        (error) => {
            this.setState({
            error
            });
        }
        )
    }

    render() {
        if(this.state.error)
        {
            return  (
                <main>
                    <h1>
                        Ошибка: {this.state.error}
                    </h1>
                </main>
            );
        }
        else
        {
            return (
                <main>
                    <h1 className="title">Избранные</h1>
                    <CardLike 
                    newsArray={this.state.news} />
                </main>
            );              
        }  
    }
}

export default Like;
