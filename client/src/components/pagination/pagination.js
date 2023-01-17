import React, { useEffect} from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import styles from './styles.js'
import {getPosts} from '../../actions/posts'

const Paginate = ({page}) => {
  const classes = styles()
  const dispatch = useDispatch()
  const { noOfPages } = useSelector((state) => state.posts)

  useEffect(() => {
    if(page){
      dispatch(getPosts(page))
    }
  }, [page])

  return (
    <Pagination 
      classes={{ul: classes.ul}}
      count={noOfPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={ (item) => (
        <PaginationItem {...item} component={Link} to={`/post?page=${item.page}`}/>
      )}
    />
        
  )
}

export default Paginate
 