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
    this.state=({
        news: [],
        error:null
    });
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
    if(!archlistdb)
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
    // if(!archlistdb)
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
