import React from 'react';
import Card from '../moduls/Card';
import Notification from '../moduls/Notification';

class News extends React.Component {

    constructor(){
        super();
        this.state=({
            news: [],
            Notific: false,
            error:null,
            message: ""
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

    DelNews = async (idnews) => {
       await  fetch(`https://coolskill.ru/newsapp/app.php?type=delnews&key=${idnews}`)
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                Notific: true,
                message:"Новость удалена"
            });
            this.NewsList(); 
            setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
        },
        (error) => {
            this.setState({
            Notific: false,
            message:"Ошибка при удалении новости"
            });
            setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
        }
        )
    }

    ArchNews = async (idnews) => {
        await  fetch(`https://coolskill.ru/newsapp/app.php?type=archnews&key=${idnews}`)
         .then((response)=>response.json())
         .then((responseJson)=>
         {
             this.setState({
                Notific: true,
                message:"Новость добавлена в ахрив"
             });
             this.NewsList();
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         },
         (error) => {
             this.setState({
                Notific: false,
                message:"Ошибка при добавлении новости в архив"
             });
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         }
         )
     }

     LikeNews = async (idnews) => {
        await  fetch(`https://coolskill.ru/newsapp/app.php?type=likenews&key=${idnews}`)
         .then((response)=>response.json())
         .then((responseJson)=>
         {
             this.setState({
                Notific: true,
                message:"Новость добавлена в избранное"

             });
             this.NewsList();
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         },
         (error) => {
             this.setState({
                Notific: false,
                message:"Ошибка при добавлении новости в избранное"
             });
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         }
         )
 
     }

     UnLikeNews = async (idnews) => {
        await  fetch(`https://coolskill.ru/newsapp/app.php?type=unlikenews&key=${idnews}`)
         .then((response)=>response.json())
         .then((responseJson)=>
         {
             this.setState({
                Notific: true,
                message:"Новость убрана из избранных"
             });
             this.NewsList();
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         },
         (error) => {
             this.setState({
                Notific: false,
                message:"Ошибка при удалении новости из избранных"
             });
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
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
        else if(this.state.news.length === 0)
        {
            return  (
                <main>
                    <h1 className="title">Новостная лента</h1>
                    <h1 className="title_error">
                        Список новостей пуст
                    </h1>
                </main>
            );
        }
        else
        {
          
            return (
                <main>
                     { this.state.Notific 
                      &&  <Notification mess={this.state.message}/> 
                      
                      }
                    <h1 className="title">Новостная лента</h1>
                    <Card 
                    newsArray={this.state.news}
                     DelNewsMeth={this.DelNews}
                     ArchNewsMeth={this.ArchNews}
                     LikeNewsMeth={this.LikeNews} 
                     UnLikeNewsMeth={this.UnLikeNews}  />
                    
                </main>
                
                  
            );       
                   
        }  
    }
}


export default News;
