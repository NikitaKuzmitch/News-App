import React from 'react';
import Header from './components/moduls/Header';
import News from './components/pages/News';
import Archive from './components/pages/Arhive';
import Like from './components/pages/Like';
import NotFound from './components/pages/NotFound';

import db from './components/db.json';

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";



class App extends React.Component {

  constructor(){
    super();
    this.CreateDB();
  } 

  CreateDB()
  {
    // получаем список архива
    let archlistdb = localStorage.getItem('ArchNews');
    // если архива нет то создаем его пустым
    if(!archlistdb)
    {
      localStorage.setItem('ArchNews', JSON.stringify([]));
    }
    // получаем список избранных новостей
    let likelistdb = localStorage.getItem('LikeNews');
    // если список пусто, то создаем его пустым
    if(!likelistdb)
    {
      localStorage.setItem('LikeNews', JSON.stringify([]));
    }
   
    // получаем список новостей
    let newslistdb = localStorage.getItem('News');
    // если список пуст, то заполняем его данными из этого файла


    // 1 вариант работы программы
    // работает с json файлом, который находится в папке components
    if(!newslistdb)
    {
      let arr = [];
      arr = db;
      arr = Array.from(new Set(arr));
      localStorage.setItem('News', JSON.stringify(arr));
    }
    // иначе, state равен этому листу новостей
    else{
      let newslist = JSON.parse(localStorage.getItem('News'));
      this.setState({news: newslist});
    }



    // 2 вариант работы программы
    // данные берутся при помощи ajax запроса на сайт, который находится на хостинге
    // php возвращает массив данных 
    // if(!newslistdb)
    // {
    //   let arr = [];
    // fetch("https://coolskill.ru/newsapp/app.php?type=newslist")
    //     .then((response)=>response.json())
    //     .then((responseJson)=>
    //     {
    //       arr = responseJson;
    //       arr = Array.from(new Set(arr));
    //       localStorage.setItem('News', JSON.stringify(arr));
    //     },
    //     (error) => {
    //         this.setState({
    //         error
    //         });
    //     }
    //     )
    //   }
    //   else{
    //     let newslist = JSON.parse(localStorage.getItem('News'));
    //     this.setState({news: newslist})
    //   }

    //3 вариант
    // С исользованием API сайта 
    // if(!newslistdb)
    //  {
 
    //     let arr = [];
    //     let massresponse = [];
    //     fetch("http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f9957a34c5304ef9bba13a864a37d2c1")
    //     .then((response)=>response.json())
    //     .then((responseJson)=>
    //     {
          
    //      for(var i = 0; i<10; i++ )
    //      {
    //         arr.push({"id": i+1, "title": responseJson.articles[i].title, "text": responseJson.articles[i].description });
    //      }         
    //           localStorage.setItem('News', JSON.stringify(arr));
    //           },
    //           (error) => {
    //               this.setState({
    //               error
    //               });
    //           }
    //           )
    //       }
        
    //       else{
    //         let newslist = JSON.parse(localStorage.getItem('News'));
    //         this.setState({news: newslist})
    //       }
  }


  render() {
    return (
      <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={News} />
            <Route  path='/archive' component={Archive} />
            <Route  path='/like' component={Like} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    );
  }
}
export default App;
