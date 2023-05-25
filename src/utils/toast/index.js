export const displaySuccessToast = (toast, message) => {
    return toast.show(message, { placement: 'top', type: "success" })
}

export const displayDangerToast = (toast, message) => {
    return toast.show(message, { placement: "top", type: "danger" })
}