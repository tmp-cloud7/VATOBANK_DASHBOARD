import bcrypt from 'bcryptjs';

export const hashPin = (pin) => {
  const salt = bcrypt.genSaltSync(10);  // Generate salt
  return bcrypt.hashSync(pin, salt);   // Return the hashed PIN
};

export const verifyHashedPin = async (enteredPin, storedHashedPin) => {
  return await bcrypt.compare(enteredPin, storedHashedPin); // Compare entered PIN stored hashed PIN
};
