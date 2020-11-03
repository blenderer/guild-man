import { withApi } from '../Context/Api';
import { withUser } from '../Context/User';

const withApiAndUser = Component => {
  const UserComponent = withUser(Component);
  return withApi(UserComponent);
};

export default withApiAndUser



