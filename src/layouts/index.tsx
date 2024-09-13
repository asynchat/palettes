import { Link, Outlet } from '@umijs/max';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="https://github.com/asynchat/palettes">Github</a>
        </li>
      </ul>
      <Outlet />
      <div className={styles.footer}>@<a href='https://torchdb.com'>torchdb.com</a></div>
    </div>
  );
}
