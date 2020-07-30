import React from 'react'
//import PropTypes from 'prop-types'

const Title = ({ text, value, click }) => {
    return (
        <h1 onClick={click} value={value}>{text}</h1>
    )
}

/* Title.defaultProps = {
    text: 'no hay texto'
} */

/* Title.propTypes = {
    text: PropTypes.string,
    id: PropTypes.number
} */

export default Title