import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import {Redirect} from 'react-router-dom'

class NewTweet extends Component {
  // Controlled Component when you want
  // to change the UI based on current state of component`
  // use controlled component.
  state = {
    text: '',
    toHome: false,
  }

  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text,

    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } =  this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))
    this.setState(() => ({
      text: '',
      toHome: id ? false : true,
    }))
  }

  render() {
    const { text, toHome } = this.state

    // Redirect to HOme View If submitted.
    if (toHome === true) {
      return <Redirect to='/' />
    }
    const tweetLeft = 280 - text.length
    return (
      <div>
        <h3 className='center'>Compose New Tweet </h3>
        <form className='new-tweet' onSubmit = {this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <=100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
            </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)
