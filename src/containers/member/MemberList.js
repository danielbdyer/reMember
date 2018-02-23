import _ from 'lodash';
import { connect } from 'react-redux';
import MemberList from '../../components/member/MemberList';
import { getMemberList, createMember } from '../../modules/member';

const mapStateToProps = ({ member }) => {
  const { loading, error } = member;
  const list = _.map(member.list, (val, uid) => ({ ...val, uid }));

  return { loading, memberError: error, list };
};

export default connect(mapStateToProps, { getMemberList, createMember })(MemberList);
