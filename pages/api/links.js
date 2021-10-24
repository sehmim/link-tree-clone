// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../lib/dbConnect'
import PageState from '../../models/PageConfig'

export default async function handler(req, res) {
    const { method } = req

    try {
        await dbConnect()

    } catch (err) {
        console.log(err)
    }

    switch (method) {
        case 'GET':
            try {
                const PageStates = await PageState.find({}).limit(100)
                res.status(200).json({ success: true, data: PageStates })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}