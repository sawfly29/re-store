
import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

 //функция возвращает функцию которая принимает компонент для обертки
const withBookstoreService = () => (Wrapped) => {
//console.log('wrapped', Wrapped)//здесь Арр
  return (props) => {
      //console.log('pp', props)
    return (
      <BookstoreServiceConsumer>
        {
          (bookStoreService) => {
              //console.log('props', props)//объект пропсов
              //console.log('bookStoreService', bookStoreService)//сервис букстора
              console.log(Wrapped)
            return (<Wrapped {...props}
                bookStoreService={bookStoreService}/>);
          }
        }
      </BookstoreServiceConsumer>
    );
  }
};

export default withBookstoreService;
