import axios from "axios"
import { accessToken } from "./moocfi"

export async function fetchQuizzesProgress() {
  const response = await axios.get(
    "https://quizzes.mooc.fi/api/v2/general/course/833a49b4-1c5e-4c61-b512-8cd64dd8aa7e/progress",
    { headers: { Authorization: `Bearer ${accessToken()}` } },
  )
  return response.data
}

export async function fetchQuizNames() {
  const response = await axios.get(
    "https://quizzes.mooc.fi/api/v1/quizzes/833a49b4-1c5e-4c61-b512-8cd64dd8aa7e/titles/fi_FI",
  )
  return response.data
}
