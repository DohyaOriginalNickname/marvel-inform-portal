import Spinner from "../components/spinner/Spinner"
import ErrorMessage from "../components/ErrorMessage/ErrorMessage"

const setContentForList = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner />
        case 'error':
            return <ErrorMessage />
        case 'confirmed':
            return <Component/>
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContentForList