import { configureStore } from '@reduxjs/toolkit'
import lessonPlanReducer from './Reducers/lessonPlanSlice'
import lessonPlanListReducer from './Reducers/LessonPlanListSlice'
// ...

const store = configureStore({
  reducer: {
    lessonPlanList: lessonPlanListReducer,
    lessonPlan: lessonPlanReducer,
  },
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch