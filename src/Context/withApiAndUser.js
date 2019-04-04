import { withApi } from '../Context/Api';
import { withUser } from '../Context/User';

export default Component => {
  const UserComponent = withUser(Component);
  return withApi(UserComponent);
};



