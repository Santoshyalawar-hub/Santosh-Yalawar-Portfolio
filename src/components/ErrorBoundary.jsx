import { Component } from 'react'
export default class ErrorBoundary extends Component {
  state = { e: null }
  static getDerivedStateFromError(e) { return { e } }
  render() { return this.state.e ? <div className="wrap page"><div className="glass"><h2>Something went wrong</h2><p>Please refresh the page.</p></div></div> : this.props.children }
}
