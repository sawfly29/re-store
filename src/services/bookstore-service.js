export default class BookstoreService {
  //теперь у нас асинхронный сервис
  data= [
      { author: "Author 1", title: "Title !1", id: 1, price: 11, coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3anxHNcpS4-UDAPgX5uuXCnDOALAcLngj9p_NtnsWsNsOr9h05DHqMLFloYzGWzmCC-UbA06l&usqp=CAc' },
      { author: "Author 2", title: "Title 2", id: 2, price: 22, coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXfEltdVZR4twzQ545enk8mFhZA5uuhpADGDHoeTWCdKa-i7aJR3YMBJ3hYiUwUS0CweeqcE&usqp=CAc' }
    ]

  getBooks() {
    return new Promise ((resolve, reject)=> {
      setTimeout(() => {
        let rnd = Math.random();
        if (rnd > 0.95){return reject(new Error ('error!'))}
        else {return resolve(this.data)}
      }, 700);
    })
  }
}
