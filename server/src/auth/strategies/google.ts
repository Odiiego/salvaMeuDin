import passport, { Profile } from "passport";
import { Strategy } from "passport-google-oauth20";
import { MongoFindOrCreateUserRepository } from "../../repositories/users/find-create-user/mongo-find-create-user";
import { FindOrCreateUserController } from "../../controllers/users/find-or-create/find-create-user";

export const initializeGoogleStrategy = () => {
  const GoogleStrategy = Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:8000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const mongoFindOrCreateUserRepository =
          new MongoFindOrCreateUserRepository();
        const findOrCreateUserController = new FindOrCreateUserController(
          mongoFindOrCreateUserRepository,
        );

        const user = await findOrCreateUserController.handle(profile);

        return cb(null, user);
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: Profile, done) {
    done(null, user);
  });
};
