React = require 'react'
{ Component } = React

class Button extends Component

  btnReadMoreClick: (e) ->

    if @props.data?.id == 318 # Welkomsblok met link naar Woningzoeker
      e?.preventDefault()
      @props.setView('apartmentBrowser')
      document.title = 'Woningzoeker' + ' - Wonen in Energiekwartier'
      history.pushState({id: 0}, 'Woningzoeker', '/woningzoeker')

    else if @props.url && @props.url != ''
      # Do nothing.

    else
  
      e?.preventDefault()

      if @props.data?.id == 247 # Foto's
        # Do nothing
      else if @props.data?.blockwidth != 'blockwidth3'
        @props.navigate @props.data

  render: ->
    <div style={s.base}>
      <a href={@props.url} onClick={@btnReadMoreClick.bind(this)} className="btn read-more" target="_blank" style={Object.assign({}, s.button, @props.hidden == "1" && {display: 'none'})}>
        {if @props.text then @props.text else 'Lees meer'}
      </a>
    </div>

s = {
  base: {
    position: 'absolute'
    bottom: '15px'
    # backgroundColor: '#fff',
    right: '15px'
    left: '15px'
    paddingTop: '20px'
  }
  button: {
    backgroundColor: '#D62242',
    color: '#fff',
    textDecoration: 'none',
  }
}

module.exports = Button
