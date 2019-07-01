/**
 * Top level container component.
 */
'use strict'

import React from 'react'
import { connect } from 'react-redux'

function App (props) {
  return <ul>{props.posts.map((post, idx) => <li key={idx}>{post}</li>)}</ul>
}

export default connect(state => ({ posts: state.posts }))(App)
