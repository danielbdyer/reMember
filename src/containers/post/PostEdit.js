import { connect } from 'react-redux';
import PostEdit from '../../components/post/PostEdit';
import { updatePost, deletePost } from '../../modules/post';

const mapStateToProps = (state, props) => {
  const { loading, error } = state.post;
  const { name, email, phone, uid } = props.post;

  return { loading, postError: error, initialValues: { name, email, phone, uid } };
};

export default connect(mapStateToProps, { updatePost, deletePost })(PostEdit);
