// create a hash to be sent via email,
export const createVerificationLink = async (email: string): Promise<string> => {

  return null;
}

export const sendVerificationLink = async () => {

}

export const resendVerificationLink = async () => {
  // email address as verification requirement
  // do not resend if already verified (redirect to login screen instead)
}

// when visited by the user,
// then will activate their account and discard that hash (link)
export const verifyAccount = async () => {
  // note: input sanitation with encodeuri
}
