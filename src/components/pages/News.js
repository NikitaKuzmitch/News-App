import React from 'react';
import Card from '../moduls/Card';
import Notification from '../moduls/Notification';

class News extends React.Component {

    constructor(){
        super();
        this.state=({
            news: [],
            Notific: false,
            message: ""
        })
    }
    
    componentDidMount = async (e) => {
        //получаем лист новостей и записываем в state
        const newsdb = JSON.parse(localStorage.getItem('News'));
        this.setState({ news:newsdb });
      }

      NotificMeth = async (mess) =>
      {
          this.setState({ Notific: true, message: mess });
      }

    //добавленние в избранные
    AddLikeNews = async (idnews) =>
      {
        // получем список избранных новостей   
        let likelistdb = localStorage.getItem('LikeNews');
        let arrlike = [];
        // если список существует, то добавляем к сущ. новостям
        if(likelistdb)
            {
                // в массив добавляем список избранных новостей
                arrlike = JSON.parse(localStorage.getItem('LikeNews')); 
                // добавляем id избранной новости
                arrlike.push(idnews);
                arrlike = Array.from(new Set(arrlike));
                // обновляем список избранных новостей
                localStorage.setItem('LikeNews', JSON.stringify(arrlike));
            }
            // иначе просто добавляем
        else
            {
                // добавляем id избранной новости
                arrlike.push(idnews);
                // обновляем список избранных новостей
                localStorage.setItem('LikeNews', JSON.stringify(arrlike)); 
            }
            this.NotificMeth("Добавлена в избранное");
            setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);
        this.componentDidMount();
    }

    

    //удаление из избранных
    DelLikeNews = async (idnews) =>
      {
        // создаем массив
        let arrlike = [];

        // получаем список новостей
        var listlike= JSON.parse(localStorage.getItem('LikeNews')); 

        // ищем индекс
        var index = listlike.indexOf(idnews);

        //удаляем
        listlike.splice(index, 1);

        //перезаписываем в массив
        arrlike = listlike; 

        // обновляем в бд
        localStorage.setItem('LikeNews', JSON.stringify(arrlike));

        this.NotificMeth("Удалена из избранных");
            setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);

        this.componentDidMount();
    }

    //Удаление новостей
    DelNews = async (idnews) =>
    {
        //нам нужно 
        // удалить новость из списка всех новостей
        // удалить если она есть в избранных или в архиве

        // массивы новостей
        let arrnews = [];

        let arrarch = [];

        let arrlike = [];

        // создаем лист новостей
        var listnews= JSON.parse(localStorage.getItem('News')); 
        
        //ищем нужную новсть
        var news = listnews.find(news => news.id === idnews);

        // получаем index этой новости
        var index_news = listnews.indexOf(news);

        // удаляем эту новость
        listnews.splice(index_news, 1);

        // заполняем массив 
        arrnews = listnews; 

        //перезаписываем в бд
        localStorage.setItem('News', JSON.stringify(arrnews));

        // удаляем новость если она есть в других таблицах
        // создаем лист избранных новостей
        var listlikenews = JSON.parse(localStorage.getItem('LikeNews')); 

        //получем индекс 
        var index_like = listlikenews.indexOf(idnews);

        // если новость существует, то удаляем
        if(index_like !== -1)
        {
            //удаляем
            listlikenews.splice(index_like, 1);

            //записываем в массив 
            arrlike = listlikenews; 

            //перезаписываем в бд
            localStorage.setItem('LikeNews', JSON.stringify(arrlike));
        }

         // создаем лист архивных новостей
        var listarchnews = JSON.parse(localStorage.getItem('ArchNews')); 

        //получем индекс 
        var index_arch = listarchnews.indexOf(idnews);

        // если новость существует, то удаляем
        if(index_arch !== -1)
        {
            //удаляем
            listarchnews.splice(index_arch, 1);

            //записываем в массив 
            arrarch = listarchnews; 

            //перезаписываем в бд
            localStorage.setItem('ArchNews', JSON.stringify(arrarch));
        }

        this.NotificMeth("Новость удалена");
            setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);

        this.componentDidMount();
}

    //Добавление в архив
    AddArchNews = async (idnews) =>
      {
        //нужно
        // добавить новость в архив
        // удалить из списка

        // Создаем массивы
        let arrarch = [];
        let arrnews = [];

        // получаем список новостей
        var listnews= JSON.parse(localStorage.getItem('News')); 
            
        //ищем нужную новость
        var newslist = listnews.find(news => news.id === idnews);

        //получаем список архивных новостей
        let archlistdb = localStorage.getItem('ArchNews');
     
        //проверяем существуют ли они
        if(archlistdb)
            {
                // записываем список в массив
                arrarch = JSON.parse(localStorage.getItem('ArchNews'));             

                // записываем ее в массив
                arrarch.push(newslist);
                arrarch = Array.from(new Set(arrarch));

                // бновляем в бд
                localStorage.setItem('ArchNews', JSON.stringify(arrarch));
            }
        else
            {
                // записываем ее в массив
                arrarch.push(newslist);

                //обновляем в бд
                localStorage.setItem('ArchNews', JSON.stringify(arrarch)); 
            }

            // получаем индекс
            var index = listnews.indexOf(newslist);

            // удаляем ее
            listnews.splice(index, 1);

            arrnews = listnews;

            console.log(listnews);
            //обновляем в бд
            localStorage.setItem('News', JSON.stringify(arrnews)); 
        
            this.NotificMeth("Добавлено в архив");
            setTimeout(() => {
                this.setState({ Notific: false });
              }, 2000);

        this.componentDidMount();
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
                    <Card        newsArray={this.state.news}
                                LikeNewsMeth={this.AddLikeNews} 
                                DelLikeNewsMeth={this.DelLikeNews}
                                DelNewsMeth={this.DelNews}
                                AddArchNewsMeth={this.AddArchNews}

                                arrlike={JSON.parse(localStorage.getItem('LikeNews'))} />
                </main>
                
                  
            );       
                   
        }  
    }
}


export default News;
