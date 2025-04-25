export const initialState = {
    student: null,        
    teacher: null
  };

  export const reducer = (state, action) => {
    switch (action.type) {
      case "STUDENT_LOGIN":
        return { ...state, student: action.payload, teacher: null };
      case "STUDENT_LOGOUT":
        return { ...state, student: null ,  teacher: null};  
      case "TEACHER_LOGIN":
        return { ...state, teacher: action.payload, student: null};  
      default:
        return state;
    }
  };