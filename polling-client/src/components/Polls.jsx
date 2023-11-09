import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getPolls, getUserPolls, getCurrentPoll} from '../store/actions'
import { FaTrash } from "react-icons/fa";

const Polls = ({ auth, polls, props }) => {

    const navigate = useNavigate(); 

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPolls());
      }, [dispatch]);


    const handleSelect = (id) => {
        // dispatch(getCurrentPoll(id))
        navigate(`/poll/${id}`);
    }

    const pollList = polls.map((poll) => (
      auth.user.id === poll.creator ? (
        <li onClick={() => handleSelect(poll._id)} key={poll._id} className='poll_row'>
          {poll.question}
          <button className="button" onClick={() => dispatch()}><FaTrash /></button> 
        </li>
      ) : (
        <li onClick={() => handleSelect(poll._id)} key={poll._id}>
          {poll.question}
        </li>
      )
    ));
    

  return (
    <div>
        {
            auth.isAuthenticated && (
                <div className='button_center'>
                    <button className='button' onClick={() => dispatch(getPolls())}>All polls</button>
                    <button className='button' onClick={() => dispatch(getUserPolls())}>My Polls</button>
                </div>    
            )
        }
        <ul className="polls">
        {pollList}
        </ul>
    </div>
  )
}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls
}), 
{getPolls, getUserPolls, getCurrentPoll})
(Polls)