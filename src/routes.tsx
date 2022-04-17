import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./components/Home"
import LoginForm from "./components/Users/login"
import Logout from "./components/Users/logout"
import Article from "./components/Article/index"

//HOC
import Main from "./components/hoc/mainLayout"
import Auth from "./components/hoc/auth"

//Admin
import Admin from "./components/Users/Admin/index"
import AddPost from "./components/Users/Admin/Posts/add"
import EditPost from "./components/Users/Admin/Posts/edit"
import AdminPosts from "./components/Users/Admin/Posts/admPosts"

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    <Route
                        path="/admin/posts/edit/:id"
                        component={Auth(EditPost, true)}
                    />
                    <Route
                        path="/admin/post/create"
                        component={Auth(AddPost, true)}
                    />
                    <Route
                        path="/admin/posts/"
                        component={Auth(AdminPosts, true)}
                    />
                    <Route path="/article/:id" component={Article} />
                    <Route path="/admin" component={Auth(Admin, true)} />
                    <Route path="/logout" component={Auth(Logout, true)} />
                    <Route path="/login" component={Auth(LoginForm, false)} />
                    <Route path="/" component={Auth(Home)} />
                </Switch>
            </Main>
        </BrowserRouter>
    )
}

export default Routes
