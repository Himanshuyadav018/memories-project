export const posts = (state={ isLoading: true, posts : []}, action) => {
    switch(action.type){
        case 'START_LOADING': 
            return {
            ...state, isLoading: true
        }
        case 'END_LOADING': 
            return {
                ...state, isLoading: false
            }
        case 'FETCH_ALL':
            return {
                ...state, posts: action.payload.data, currentPage: action.payload.currentPage, 
                noOfPages: action.payload.noOfPages
            }
        case 'FETCH_POST':
            return{
                ...state, post: action.payload
            }
        case 'FETCH_ALL_BY_SEARCH':
            return { ...state, posts: action.payload}
        case 'CREATE_POST':
            return { ...state, posts : [...state, action.payload]}
        case 'COMMENT':
            return { 
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) return action.payload

                    return post
                })
            }
        case 'UPDATE' :
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        case 'LIKE' :
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        case 'DELETE' :
            return { ...state, posts: state.posts.map((post) => post._id !== action.payload)}
        default:
            return state
    }
}