import bcrypt from 'bcryptjs';

export const hashPin = (pin) => {
  const salt = bcrypt.genSaltSync(10);  // Generate a salt
  return bcrypt.hashSync(pin, salt);   // Return the hashed PIN
};

export const verifyHashedPin = async (enteredPin, storedHashedPin) => {
  return await bcrypt.compare(enteredPin, storedHashedPin); // Compare the entered PIN with the stored hashed PIN
};
