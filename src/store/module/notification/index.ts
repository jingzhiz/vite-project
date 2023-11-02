import useTodoNoticeStore from "./todoNotify"

export default function useNoticeStore() {
  return {
    todo: useTodoNoticeStore
  }
}
