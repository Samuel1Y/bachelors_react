import { configureStore } from '@reduxjs/toolkit'
import lessonPlansReducer from './Reducers/lessonPlansSlice'
import lessonPlanListReducer from './Reducers/LessonPlanList'
// ...

const store = configureStore({
  reducer: {
    lessonPlanList: lessonPlanListReducer,
    lessonPlans: lessonPlansReducer,
  },
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch