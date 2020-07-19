import React from 'react';
import CardLike from '../moduls/CardLike';

class Like extends React.Component {

    constructor(){
        super();
        this.state=({
            news: []
        })
    }
    
    componentDidMount = async (e) => {
        // получаем список новостей
        const newsdb = JSON.parse(localStorage.getItem('News'));
        //создам архив
        let likenews = [];
        // полуаем список избранных новостей
        var listlike= JSON.parse(localStorage.getItem('LikeNews')); 
        if(listlike !== null)
        {
            // записываем в массив избранные новости
            listlike.map((row)=>{

                var news = newsdb.find(news => news.id === row);
                    likenews.push(news);
            })

        this.setState({ news:likenews });
        }
      }

    render() {
        if(this.state.news.length === 0)
        {
            return  (
                <main>
                     <h1 className="title">Избранные</h1>
                    <h1 className="title_error">
                        Список пуст
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
