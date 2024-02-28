import mongoose from 'mongoose'

import { Record } from '../models/record'
import { IRecord } from '../common/interfaces/record'

export async function getRecords(userId: string) {
    return await Record.find({ user: userId }, { date: 1, ingredients: 1, image: 1 }).sort({ date: -1 }).limit(10)
}

export async function createOrUpdateRecord(userId: string, record: IRecord) {
    const sortedIngredients = record.ingredients.sort()
    const result = await Record.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $addFields: {
                sortedIngredients: {
                    $sortArray: {
                        input: "$ingredients",
                        sortBy: 1
                    }
                }
            }
        },
        {
            $match: {
                sortedIngredients: sortedIngredients
            }
        }
    ])

    if (result.length) {
        await Record.updateOne({ _id: result[0]._id }, { date: new Date() })
    } else {
        record.user = userId
        await Record.create(record)
    }

    return await Record.find({ user: userId }, { date: 1, ingredients: 1, image: 1 }).sort({ date: -1 }).limit(10)
}