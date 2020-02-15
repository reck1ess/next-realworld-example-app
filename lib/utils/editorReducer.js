const editorReducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.text
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.text
      };
    case "SET_BODY":
      return {
        ...state,
        body: action.text
      };
    case "ADD_TAG":
      return {
        ...state,
        tagList: state.tagList.concat(action.tag)
      };
    case "REMOVE_TAG":
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    default:
      throw new Error("Unhandled action");
  }
};

export default editorReducer;
