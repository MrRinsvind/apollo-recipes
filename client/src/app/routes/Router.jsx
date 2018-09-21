import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import widthSession from 'hoc/withSession'
import MainLayout from 'layouts/MainLayout'
//pages
import Main from 'pages/main/Main';
import SearchContainer from 'pages/search/SearchContainer'
import AddRecipeContainer from 'pages/recipe/AddRecipeContainer'
import RecipePage from 'pages/recipe/RecipePage'
import Profile from 'pages/profile'
import SigninContainer from 'pages/auth/SigninContainer'
import SignupContainer from 'pages/auth/SignupContainer'

const Router = ({ refetch, session }) => (
  <BrowserRouter>
    <MainLayout session={session}>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/search" exact component={SearchContainer} />
        <Route path="/signin" render={()=> <SigninContainer refetch={refetch} />} />
        <Route path="/signup" render={()=> <SignupContainer refetch={refetch} />} />
        <Route path="/recipe/add"  render={() => <AddRecipeContainer session={session}/> } />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile"  render={() => <Profile session={session}/>} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  </BrowserRouter>
)

export default widthSession(Router)