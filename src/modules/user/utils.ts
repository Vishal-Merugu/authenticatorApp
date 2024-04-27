import UserModel, { User } from "../../models/userdetails";

export async function getUserByUsername(
  username: string,
  projection?: Record<string, 1>
): Promise<User | null> {
  return Promise.resolve(
    await UserModel.findOne<User>(
      { username: username },
      {
        ...projection,
      }
    ).exec()
  );
}
