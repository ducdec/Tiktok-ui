import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './MyLecture.module.scss';
import TrackItem from '../component/TrackItem';
import { XIcon } from '~/components/Icons';
import config from '~/config';
import Button from '~/components/Button';
import lectureService from '~/services/lectureServices';

const cx = classNames.bind(styles);

function CreateLecture() {
  const [newLecture, setNewLecture] = useState({
    name: '',
    description: '',
    videoID: '',
  });

  const [errorFields, setErrorFields] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xóa trường đó khỏi danh sách lỗi khi người dùng bắt đầu nhập
    const updatedErrorFields = errorFields.filter((field) => field !== name);
    setErrorFields(updatedErrorFields);

    setNewLecture((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleCreateLecture = (e) => {
    e.preventDefault();

    // Kiểm tra xem có trường nào chưa được nhập không
    const requiredFields = ['name', 'description', 'videoID'];
    const missingFields = requiredFields.filter((field) => !newLecture[field]);

    if (missingFields.length > 0) {
      // Nếu có trường chưa được nhập, hiển thị thông báo lỗi và cập nhật danh sách lỗi
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      setErrorFields(missingFields);
      return;
    }

    // Nếu mọi thứ hợp lệ, thực hiện yêu cầu tạo khóa học
    lectureService
      .create(newLecture)
      .then((res) => {
        console.log('Success:', res.data);
        navigate(config.routes.createLec);
      })
      .catch((error) => {
        console.error('Error:', error.res ? error.res.data : error.message);
      });
  };

  return (
    <>
      <div className={cx('tracks_wrapper')}>
        <div className={cx('tracks_container')}>
          <header className={cx('Tracks_header')}>
            <h1 className={cx('Tracks_heading')}>Nội dung khóa học</h1>
            <button className={cx('Tracks_close-btn')}>
              <XIcon />
            </button>
          </header>

          <div className={cx('tracks_body')}>
            <TrackItem />
          </div>
        </div>
      </div>

      <div className={cx('content_wrapper')}>
        <div className={cx('form-container')}>
          <div className={cx('mt-5')}>
            <h3>Thêm Tiết Học</h3>

            <form onSubmit={handleCreateLecture}>
              <div className={cx('form-group')}>
                <div className={cx('mb-3')}>
                  <label htmlFor="name" className="form-label">
                    Tên
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={newLecture.name}
                    type="text"
                    className={cx('form-control', {
                      'is-invalid': errorFields.includes('name'),
                    })}
                    id="name"
                    name="name"
                  />
                  {errorFields.includes('name') && (
                    <div className="invalid-feedback">Vui lòng nhập tên.</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Mô tả
                  </label>
                  <textarea
                    onChange={handleInputChange}
                    value={newLecture.description}
                    rows="3"
                    className={cx('form-control')}
                    id="description"
                    name="description"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="videoID" className="form-label">
                    Video ID
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={newLecture.videoID}
                    type="text"
                    className={cx('form-control', {
                      'is-invalid': errorFields.includes('videoID'),
                    })}
                    id="videoID"
                    name="videoID"
                  />
                  {errorFields.includes('videoID') && (
                    <div className="invalid-feedback">
                      Vui lòng nhập ID Video.
                    </div>
                  )}
                </div>

                <Button blue onClick={handleCreateLecture} type="submit">
                  Thêm
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateLecture;
