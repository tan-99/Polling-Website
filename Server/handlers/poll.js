const db = require('../models')

exports.showPolls = async(req, res, next) => {
    try{
        const polls = await db.Poll.find().populate('creator', ['username', 'id'])

        res.status(200).json(polls)
    }
    catch(err){
        err.status = 400
        next(err)
    }
}

exports.createPoll = async(req, res, next) => {
    try{
        console.log(req.decoded)
        const { id } = req.decoded
        const creator = await db.User.findById(id)

        const {question, options} = req.body
        const poll = await db.Poll.create({
            creator,
            question,
            options: options.map(option => ({option, votes: 0})) //changing format of options: initially array of strings then to each option with number of votes  
        })
        creator.polls.push(poll._id)
        await creator.save()

        res.status(201).json({...poll._doc, creator: creator._id}) 

    }catch(err){
        err.status = 400
        next(err)
    }
}

exports.usersPolls = async(req, res, next) => {
    try{

        const { id } = req.decoded

            const user = await db.User.findById(id)
            .populate('polls');

        res.status(200).json(user.polls)
    }
    catch(err){
        err.status = 400
        next(err)
    }
}


exports.getPoll = async( req, res, next ) => {
    try{
        const { id } = req.params //params??

        const poll = await db.Poll.findById(id)
        .populate('creator', ['username', 'id'])

        if(!poll) throw  Error('No poll found')

        res.status(200).json(poll)
    }
    catch(err){
        err.status = 400
        next(err)
    }
}


exports.deletePoll = async(req, res, next) => {
    try{
        const { id: pollId } = req.params   //destructuring alias
        const { id: userId } = req.decoded 

        const poll = await db.Poll.findById(pollId)
        if(!poll) throw new Error('No such poll found')
        else{
            if(poll.creator.toString() !== userId)
                throw new Error('Unauthorised access')
        }

        // await db.User.deleteOne(userId) have to use 'pull' or something "to delete object from an array in mongodb"
        await db.Poll.deleteOne({_id: poll._id})
        res.status(200).json(poll)

    }catch(err){
        err.status = 400
        next(err)
    }
}


exports.vote = async(req, res, next) => {
    try{

        const {id: pollId} = req.params
        const {id: userId} = req.decoded

        const { answer } = req.body

        if (answer) {

            const poll = await db.Poll.findById(pollId)
            if(!poll) throw new Error('No such poll found')

            const vote = poll.options.map(
                eachOption => {
                    if (eachOption.option === answer){
                        return {
                            option: eachOption.option,
                            _id: eachOption._id,
                            votes: eachOption.votes + 1
                        };
                    }
                    else{
                        return eachOption
                    }
                }
            )

            if(poll.voted.filter(user => user.toString() === userId).length <= 0) {
                poll.voted.push(userId)
                poll.options = vote
                await poll.save()

                res.status(202).json(poll)
            } else {
                throw new Error('Already voted')
            }

        } else {
            throw new Error('No answer provided')
        }

    }catch(err){
        err.status = 400
        next(err)
    }
}