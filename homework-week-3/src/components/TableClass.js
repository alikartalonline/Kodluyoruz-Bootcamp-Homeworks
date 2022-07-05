import React from 'react';


export default class TableClass extends React.Component {


  state = {
    loading: false,
    todos: [],
    post: [],
    status: "todos",
  }

  // Bir bileşen, DOM ağacına eklendikten hemen sonra componentDidMount() çalıştırılır.
  // Eğer verilerinizi uzak bir API’den yüklemeniz gerekiyorsa, ağ isteğini bu fonksiyonda başlatabilirsiniz.
  componentDidMount() {
    this.fetchTodos();
    this.fetchPost();
  }




  // Fetch Todos Api Call
  fetchTodos = () => {
    this.setState({ loading: true })
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(x => x.json())
      .then(res => {
        this.setState({ todos: res, loading: false })
      }).catch(e => {
        this.setState({ loading: false })
      })
  }

  // Todos ile çekilen Api verileri map edilir.
  renderTodos = () => {
    return (
      <>
        {
          this.state.todos.slice(0, 50).map((item, i) => {
            return (
              <tr key={i} className={this.props.theme === "bg-dark" ? 'text-light': 'text-dark'}>
                <th scope="row" >{item.id}</th>
                <td >{item.title.toUpperCase().slice(0, 1)}{item.title.toLowerCase().slice(1)}</td>
                <td>{item.completed ? "COMPLETED" : "Not Completed"}</td>
                <td>
                  <button type="button" className='btn btn-danger' onClick={() => this.deletePost(item.id)}>Remove</button>
                  <button type='button' className='btn btn-warning' onClick={() => this.editLoading(item)}>Edit</button>
                </td>
              </tr>
            )
          })
        }
      </>
    )
  }

  // Table yapılır ve  Todos ile çekilen Api verileri içerisine render edilir.
  renderTableTodos = () => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Başlık</th>
              <th scope="col">Durum</th>
              <th scope="col">Aksiyonlar</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTodos()}
          </tbody>
        </table>
      </>
    )
  }



  // Fetch Post Api Call
  fetchPost = () => {
    this.setState({ loading: true })
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(x => x.json())
      .then(response => {
        this.setState({ post: response, loading: false })
      }).catch(e => {
        this.setState({ loading: false })
      })
  }

  // Post ile çekilen Api verileri map edilir.
  renderPost = () => {
    return (
      <>
        {
          this.state.post.slice(0, 50).map((item, i) => {
            return (
              <tr key={i} className={this.props.theme === "bg-dark" ? 'text-light': 'text-dark'}>
                <th scope="row" >{item.id}</th>
                <td >{item.title.toUpperCase().slice(0, 1)}{item.title.toLowerCase().slice(1)}</td>
              </tr>
            )
          })
        }
      </>
    )
  }


  // Table yapılır ve  Post ile çekilen Api verileri içerisine render edilir.
  renderTablePost = () => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Başlık</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPost()}
          </tbody>
        </table>
      </>
    )
  }

  // Butonlar ile belirlediğimiz state değerleri ekranda gözükecek şekilde render edilir.
  // burada <return this.renderTableTodos()> demek yerine <return renderTableTodos()> yazdığım için 
  //<'renderTableTodos' is not defined> hatası ile uğraştım maalesef...
  renderStatus = () => {
    if (this.state.status === "todos") {
      return this.renderTableTodos()
    } else return this.renderTablePost()
  }

  clickTodos = () => {
    this.setState({ status: "todos" })
  }

  clickPost = () => {
    this.setState({ status: "post" })
  }

  
  render() {

    // loading aşağıda kullanıldığı içni state olarak belirttik.
    const { loading, } = this.state

    return (
      <div className='container mt-3'>
        <div className='row'>
          
          <div className='mb-4'>
            <button onClick={this.clickTodos} className='col me-1 btn btn-success' >Todos</button>
            <button onClick={this.clickPost} className='col btn btn-primary'>Posts</button>
          </div>

          {loading ? "Loading..." : this.renderStatus()}
        </div>
      </div>
    )
  }
};
