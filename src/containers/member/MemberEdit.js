import { connect } from 'react-redux';
import MemberEdit from '../../components/member/MemberEdit';
import { updateMember, deleteMember } from '../../modules/member';

const mapStateToProps = (state, props) => {
  const { loading, error } = state.member;
  const { name, email, uid } = props.member;

  return { loading, memberError: error, initialValues: { name, email, uid } };
};

export default connect(mapStateToProps, { updateMember, deleteMember })(MemberEdit);
