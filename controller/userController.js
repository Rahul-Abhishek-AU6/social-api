import { User } from "../model/userModel";

import { signUpUser, signInUser, protect } from "../handlers/userHandler";

export const protectRoute = protect(User);

export const signUp = signUpUser(User, {
  message: "Signed Up Successfully",
});

export const signIn = signInUser(User, {
  message: "Signed In Successfully",
});
