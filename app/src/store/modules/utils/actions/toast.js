/* Import modules. */
import Swal from 'sweetalert2'

/**
 * Toast
 */
const toast = ({}, _params) => { // eslint-disable-line no-empty-pattern
    /* Set title. */
    const title = _params[0]

    /* Set message. */
    const message = _params[1]

    /* Set icon. */
    const icon = _params[2]

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
    })

    /* Fire toast. */
    Toast.fire(title, message, icon)
}

/* Export module. */
export default toast
