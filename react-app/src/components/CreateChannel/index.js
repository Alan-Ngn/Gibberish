import { useState } from "react"
import { useModal } from "../../context/Modal"

const CreateChannelModal = ({adminId}) => {
    const {closeModal} = useModal()
    const [title, setTitle] = useState('')
    const updateTitle =(e) => setTitle(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault()

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle}
                />
                <button type="submit">Create Channel</button>
            </form>
        </div>
    )
}

export default CreateChannelModal
