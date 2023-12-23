import React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SignIn() {
  return (
    <div className={cx('section')}>
      <div className={cx('form-box')}>
        <div className={cx('form-value')}>
          <form action="">
            <h2>Đăng nhập</h2>
            <div className={cx('input-box')}>
              <FontAwesomeIcon icon={faEnvelope} className={cx('faicon')} />
              <input type="email" required />
              <label className={cx('label')} htmlFor="">
                Email
              </label>
            </div>
            <div className={cx('input-box')}>
              <FontAwesomeIcon className={cx('faicon')} icon={faLock} />
              <input type="password" required />
              <label className={cx('label')} htmlFor="">
                Mật Khẩu
              </label>
            </div>
            <div className={cx('forget')}>
              <label className={cx('label')} htmlFor="">
                <input type="checkbox" />
                Nhớ<a href="/">Lấy lại mật khẩu</a>
              </label>
            </div>
            <button>Đăng nhập</button>
            <div className={cx('register')}>
              <p>
                Bạn chưa có tài khoản? <a href="/login/signup">Đăng ký</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;