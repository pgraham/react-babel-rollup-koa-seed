/**
 * Top level container component.
 */
'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { Post } from './post'

function AppCmp (props) {
  return (
    <ul>
      {props.posts.map((post, idx) => (
        <li key={idx}>
          <Post content={post} />
        </li>
      ))}
    </ul>
  )
}

export const App = connect(state => ({ posts: state.posts }))(AppCmp)
