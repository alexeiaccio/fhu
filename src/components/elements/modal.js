import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    if (document !== undefined) {
      this.el = document.createElement('div')
    }
  }

  componentDidMount() {
    if (document !== undefined) {
      const modalRoot = document.getElementById('modal-root')
      modalRoot.appendChild(this.el)
    }
  }

  componentWillUnmount() {
    if (document !== undefined) {
      const modalRoot = document.getElementById('modal-root')
      modalRoot.removeChild(this.el)
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default Modal
