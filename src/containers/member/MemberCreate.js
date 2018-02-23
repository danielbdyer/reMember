import { connect } from 'react-redux';
import MemberCreate from '../../components/member/MemberCreate';
import { createMember } from '../../modules/member';

const mapStateToProps = ({ member }) => {
  const { loading, error } = member;

  return { loading, memberError: error };
};

export default connect(mapStateToProps, { createMember })(MemberCreate);
