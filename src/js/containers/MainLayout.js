import React from 'react';
import axios from 'axios';

import Posts from '../components/Posts';
import PostView from '../components/PostView';
import PostEdit from '../components/PostEdit';

// Route - компонент принимающий два основных свойства:
// 1. path - url
// 2. component - компонент который отобразиться по указаному в path url.
// так-же присуствует возможность делать компонент парным, что дает возможность
// вкладывать в него другие теги и компоненты.

// Switch - вспомогательный компонент который позволяет групировать определенные
// Routes

// Link - необходим для того чтобы переключатся между "страницами", по факту - аналог
// обычного <a>, но работает с помощью BrowserHistory или hashHistory
// вместо привычного нам href нужно писать to={`/some-url`}

import { Route, Switch, Link, IndexRoute, withRouter } from 'react-router-dom';

import AddPost from '../components/AddPost';
import Header from '../components/Header';
import About from '../components/About';

import {connect} from 'react-redux';
import {addAllPost, addLogin} from "../actions";

const mapStateToProps = ({login}) => ({login});

@withRouter
@connect(mapStateToProps, {addAllPost, addLogin})
class MainLayout extends React.Component {
  componentDidMount() {
		if (localStorage.getItem('ssid')) {
			let formData = new FormData();
			formData.append('ssid', localStorage.getItem('ssid'));
			axios({
				method: 'post',
				url: 'http://react25111.ru/login.php',
				data: formData
			})
				.then((res) => {
					console.log(res);
					this.props.addLogin(res.data);
				})
				.catch((res) => {
					console.log(res);
				})
		}
		axios.get('http://react25111.ru/login.php')
			.then((response) => {
				this.props.addLogin(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		axios.get('http://react25111.ru')
			.then((response) => {
				this.props.addAllPost(response.data);
				// handle success
				console.log(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
  }
	handleLogin() {
		let formData = new FormData();
		formData.append('login', this.refs.login.value);
		axios({
			method: 'post',
			url: 'http://react25111.ru/login.php',
			data: formData
		}).then((response) => {
			localStorage.setItem('ssid', response.data)
			this.props.addLogin(response.data);
			console.log(response.data);
		})
			.catch(function (error) {
				console.log(error);
			});
	}
  render() {
    return (
			<div className="wrapper">
				<Header/>

				{this.props.login ? (
					<Switch>
						<Route exact path="/" component={Posts}/>
						<Route exact path="/search/:search" component={Posts}/>
						<Route path="/add-post" component={AddPost}/>
						<Route path="/about" component={About}/>
						<Route path="/post-:postId" component={PostView}/>
						<Route component={() => <div>page not found</div>}/>
					</Switch>
				) : (
					<div>
						<input type="text" ref = "login"/>
						<input type="submit" value = "ok" onClick = {this.handleLogin.bind(this)}/>
					</div>
				)}

			</div>
    )
  }
}

export default MainLayout;