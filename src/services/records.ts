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

export async function createOrUpdateRecord(userId: string, record: IRecord) {
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
}

export async function deleteRecord(recordId: string) {
  await Record.deleteOne({ _id: recordId });
}

export async function deleteRecords(recordsIds: string[]) {
  for (let index = 0; index < recordsIds.length; index++) {
    await deleteRecord(recordsIds[index]);
  }
}

export async function deleteAllUserRecords(userId: string) {
  await Record.deleteMany({ user: userId });
}
