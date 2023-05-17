import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChannelByIdThunk } from "../../store/channel"
import { useParams } from "react-router-dom"

const ChannelById = () => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const getChannel = useSelector(state => state.channels)

    useEffect(() => {
        if(getChannel.id !== Number(channelId)){

            dispatch(loadChannelByIdThunk(channelId))
        }
    },[dispatch, channelId])

    if(getChannel.id !== Number(channelId)) return null
    console.log(getChannel.id, 'MY CHANNEL', Number(channelId))
    return (
        <section className="ChannelById">
            {getChannel.messages.map((message) =>(
                <div>

                    <p>{message.user.first_name} {message.user.last_name}</p>
                    <p>{message.message}</p>
                </div>
            ))}
        </section>
    )
}

export default ChannelById
