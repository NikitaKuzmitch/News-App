import React from 'react';
import CardArchive from '../moduls/CardArchive';
import Notification from '../moduls/Notification';
class Archive extends React.Component {
    
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
        const newsdb = JSON.parse(localStorage.getItem('ArchNews'));
        this.setState({ news:newsdb });
      }

      NotificMeth = async (mess) =>
      {
          this.setState({ Notific: true, message: mess });
      }

   //удаление из архива
   DelArchNews = async (idnews) =>
   {
         //нужно
        // добавить новость в список всех новостей
        // удалить из архива

        // Создаем массивы
        let arrarch = [];
        let arrnews = [];

        // получаем список архивных новостей
        var archlistdb= JSON.parse(localStorage.getItem('ArchNews')); 
            
        //ищем нужную новость
        var archnewslist = archlistdb.find(news => news.id === idnews);

        //получаем список новостей
        let listnews = localStorage.getItem('News');
     
        //проверяем существуют ли они
        if(listnews)
            {
                // записываем список в массив
                arrnews = JSON.parse(localStorage.getItem('News'));             

                // записываем ее в массив
                arrnews.push(archnewslist);
                arrnews = Array.from(new Set(arrnews));

                // бновляем в бд
                localStorage.setItem('News', JSON.stringify(arrnews));
            }
        else
            {
                // записываем ее в массив
                arrnews.push(archnewslist);

                //обновляем в бд
                localStorage.setItem('News', JSON.stringify(arrnews)); 
            }

            // получаем индекс
            var index = archlistdb.indexOf(archnewslist);

            // удаляем ее
            archlistdb.splice(index, 1);

            arrarch = archlistdb;

            //обновляем в бд
            localStorage.setItem('ArchNews', JSON.stringify(arrarch)); 
        

            this.NotificMeth("Удалена из архива");
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

       // создаем лист архивных новостей
       var listarchnews= JSON.parse(localStorage.getItem('ArchNews')); 
       
       //ищем нужную новсть
       var news = listarchnews.find(news => news.id === idnews);

       // получаем index этой новости
       var index_arch = listarchnews.indexOf(news);

       // удаляем эту новость
       listarchnews.splice(index_arch, 1);

       // заполняем массив 
       arrarch = listarchnews; 

       //перезаписываем в бд
       localStorage.setItem('ArchNews', JSON.stringify(arrarch));

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

        // создаем лист новостей
       var listnews = JSON.parse(localStorage.getItem('News')); 

       //получем индекс 
       var index_news = listnews.indexOf(idnews);

       // если новость существует, то удаляем
       if(index_news !== -1)
       {
           //удаляем
           listnews.splice(index_news, 1);

           //записываем в массив 
           arrnews = listnews; 

           //перезаписываем в бд
           localStorage.setItem('News', JSON.stringify(arrnews));
       }

       this.NotificMeth("Новость удалена");
       setTimeout(() => {
           this.setState({ Notific: false });
         }, 2000);

       this.componentDidMount();
}



    render() {

         if(this.state.news.length === 0)
        {
            return  (
                <main>
                  { this.state.Notific 
                      &&  <Notification mess={this.state.message}/> 
                      
                      }
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
                     DelNewsMeth={this.DelNews}
                     DelArchMeth={this.DelArchNews}
                    newsArray={this.state.news}  />
                </main>
            );              
        }  
    }
}


export default Archive;
