// ** Returns initials from string
export const getInitials = string => {
  const words = string?.split(/\s/)
  const initials = words?.slice(0, 2).reduce((response, word) => (response += word.slice(0, 1)), '')

  return initials
}
