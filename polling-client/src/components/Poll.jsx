import React from 'react'
import { connect } from 'react-redux'

import { vote } from '../store/actions'

import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
)

const Poll = ({ poll, vote }) => {

    const answers = poll.options && poll.options.map(option => (
        <button className="button" onClick={() => vote(poll._id, {answer: option.option})} key={option._id}>{option.option}</button>
    ))

    const color = () => {
        return('#' + Math.random().toString(16).slice(2,8))
    }

    const data = poll.options && {
        labels: poll.options.map(option => option.option),
        datasets: [
            {
                label: poll.question,
                backgroundColor: poll.options.map(option => color()),
                data: poll.options.map(option => option.votes)
            }
        ]
    }

    const chartOptions = {
        responsive: true, // Ensure the chart is responsive
        maintainAspectRatio: false, // Disable maintaining aspect ratio
        width: 1500, // Set your desired width
        height: 1500, // Set your desired height
    };
    

  return (
    <div>
        <h3 className='poll-title'>{poll.question}</h3>
        <div className='button_center'>
            {answers}
        </div>
        <div className="poll-chart">
            {poll.options && <Doughnut data={data} options={chartOptions} />}
        </div>
    </div>
  )
}

export default connect(
    store => ({
        poll: store.currentPoll
    }),
    { vote }
)(Poll)