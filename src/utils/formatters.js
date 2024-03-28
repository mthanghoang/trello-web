export const capitalizeFirstLetter = (str) => {
  // Check if the input string is empty or null
  if (!str || str.length === 0) {
    return str
  }

  // Capitalize the first letter and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1)
}
