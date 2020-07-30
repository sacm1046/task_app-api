import React from 'react'
import PropTypes from 'prop-types'

const TableRow = ({id, user, content, edit, del, mode, modeEdit}) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{user}</td>
            <td>{content}</td>
            <td>
                <i onClick={edit} className={`fas fa-edit ${!mode && modeEdit ? "text-success" : "text-secondary"}`} />
                <i onClick={del} className="fas fa-trash ml-3 mr-3" />
            </td>
        </tr>
    )
}
//Para declarar valores por defecto para props no declarados
TableRow.defaultProps = {
}
//Para declarar el tipo de dato los props, también se puede establecer si el props será obligatorio
TableRow.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    edit: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    mode: PropTypes.bool.isRequired,
    modeEdit: PropTypes.bool.isRequired
}

export default TableRow
