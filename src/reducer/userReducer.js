export const initialState = {
    student: null,        
    teacher: null,
    admin: null
  };

  export const reducer = (state, action) => {
    switch (action.type) {
      case "STUDENT_LOGIN":
        return { ...state, student: action.payload, teacher: null , admin : null};
      case "STUDENT_LOGOUT":
        return { ...state, student: null ,  teacher: null};  
      case "TEACHER_LOGIN":
        return { ...state, teacher: action.payload, student: null , admin: null};
      case "ADMIN_LOGIN":
        return { ...state, admin: action.payload, student: null , teacher: null};
      default:
        return state;
    }
  };