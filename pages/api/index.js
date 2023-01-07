import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db('nextfitness')

    if(req.method === "GET") {
        const data = '0001'

        const filteredExercise = await db.collection('exercise').find({id: data})
        res.status(200).json({response: "hello"})
    
    }
}