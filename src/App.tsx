/*+++ App.tsx*/

import './App.css'
import { AddPost } from './components/AddPost/AddPost'
import { PostList } from './components/PostList/PostList'



function App() {

  return (
    <div className='main'>
      <PostList />
      <AddPost />
    </div>
  )
}

export default App
