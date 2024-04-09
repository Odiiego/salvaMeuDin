import { Profile } from "passport-google-oauth20";
import { IUser } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpResponse } from "../../protocols";
import { IFindCreateUserRepository, IGoogleOauthUser } from "./protocols";

declare module "express-serve-static-core" {
  interface Request {
    user: IGoogleOauthUser;
  }
}

export class FindOrCreateUserController {
  constructor(
    private readonly findOrCreateUserRepository: IFindCreateUserRepository,
  ) {}

  async handle(data: Profile): Promise<HttpResponse<unknown>> {
    try {
      const { id, displayName, emails } = data;

      if (!data) return badRequest("Invalid user data");
      if (!emails) return badRequest("Invalid user data");

      const newUser = {
        googleId: id,
        name: displayName,
        email: emails[0].value,
        lists: [],
      };

      const user =
        await this.findOrCreateUserRepository.findOrCreateUser(newUser);

      return ok<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
