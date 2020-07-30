import React from 'react'
import PropTypes from 'prop-types'

const FormGroup = props => {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input value={props.value} onChange={props.change} type="text" className="form-control" id={props.id} aria-describedby="emailHelp" />
        </div>
    )
}
//Para declarar valores por defecto para props no declarados
FormGroup.defaultProps = {
}
//Para declarar el tipo de dato los props, también se puede establecer si el props será obligatorio
FormGroup.propTypes = {
    id : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    change : PropTypes.func.isRequired
}

export default FormGroup



