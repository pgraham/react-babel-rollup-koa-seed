/**
 * Top level container component.
 */
'use strict'

import React from 'react'

export default function App (props) {
  return <ul>{props.posts.map((post, idx) => <li key={idx}>{post}</li>)}</ul>
}
