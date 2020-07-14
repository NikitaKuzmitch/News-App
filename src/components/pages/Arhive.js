import React from 'react';
import CardArchive from '../moduls/CardArchive';
import Notification from '../moduls/Notification';
class Archive extends React.Component {
    
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
                error,
                message:"Ошибка при удалении новости"
             });
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         }
         )
     }

     UnArchNews = async (idnews) => {
        await  fetch(`https://coolskill.ru/newsapp/app.php?type=unarchnews&key=${idnews}`)
         .then((response)=>response.json())
         .then((responseJson)=>
         {
             this.setState({
                Notific: true,
                message:"Новость удалена из архива"
             });
             this.NewsList();
             setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
         },
         (error) => {
             this.setState({
                error,
                message:"Ошибка при удалении из архива"
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
                     <h1 className="title">Архив</h1>
                    <h1 className="title_error">
                        Ошибка: {this.state.error}
                    </h1>
                </main>
            );
        }
        else if(this.state.news.length === 0)
        {
            return  (
                <main>
                     <h1 className="title">Архив</h1>
                    <h1 className="title_error">
                        Архив пустой
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
                    <h1 className="title">Архив</h1>
                    <CardArchive 
                    newsArray={this.state.news} 
                    DelNewsMeth={this.DelNews}
                    UnArchNewsMeth={this.UnArchNews}  />
                </main>
            );              
        }  
    }
}


export default Archive;
