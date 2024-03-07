import mongoose from "mongoose";

import { Record } from "../models/record";
import { IRecord } from "../common/interfaces/record";

export async function getRecords(userId: string, page: number, size: number) {
  const data = await Record.find(
    { user: userId },
    { date: 1, ingredients: 1, image: 1 }
  )
    .sort({ date: -1 })
    .skip(page * size)
    .limit(size);

  const count = await Record.countDocuments({ user: userId });

  return { data, count };
}

export async function createOrUpdateRecord(
  userId: string,
  record: IRecord,
  size: number
) {
  const sortedIngredients = record.ingredients.sort();
  const result = await Record.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $addFields: {
        sortedIngredients: {
          $sortArray: {
            input: "$ingredients",
            sortBy: 1,
          },
        },
      },
    },
    {
      $match: {
        sortedIngredients: sortedIngredients,
      },
    },
  ]);

  if (result.length) {
    await Record.updateOne({ _id: result[0]._id }, { date: new Date() });
  } else {
    record.user = userId;
    await Record.create(record);
  }

  return await getRecords(userId, 0, size);
}
