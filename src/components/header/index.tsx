import React, { useEffect, useState } from 'react';
import { reqLocation, reqWeather } from '../../api';
import { menu, IMenu } from '../../config/menuConfig';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import { useHistory } from 'react-router-dom';

const header = require('./header.module.less')

interface IProps {
  userName: string;
  pathName: string;
};

function Header(props: IProps) {
  const { userName, pathName } = props;
  const [weatherInfo, setWeatherInfo] = useState({ weather: '晴', temperature: 24 });
  const [currentTime, setCurrentTime] = useState('');
  const history = useHistory();
  const { confirm } = Modal;
  let title = '';

  const getWeather = async () => {
    const { adcode }: any = await reqLocation();
    const { weather, temperature }: any = await reqWeather(adcode);
    setWeatherInfo({ weather, temperature });
  };

  const findLocationMenu = (menus: Array<IMenu>) => {
    for (const item of menus) {
      if (title !== '') break;
      if (item.key === pathName.split('/')[1]) {
        title = item.title;
        break;
      }
      if (item.children && item.children.length > 0) {
        findLocationMenu(item.children);
      }
    }
  }

  const showDeleteConfirm = () => {
    confirm({
      title: '你确定要退出登录嘛？',
      icon: <ExclamationCircleOutlined />,
      content: '退出后需重新登录。',
      okText: '是的',
      okType: 'danger',
      cancelText: '点错了,不退出',
      onOk() {
        // 删除 localStorage 及内存里的数据
        storageUtils.removeUser();
        memoryUtils.user = {};

        // 跳转到 login 界面
        history.replace('/');
      },
    });
  }

  findLocationMenu(menu);
  useEffect(() => {
    getWeather();
    const getCurrentTime = setInterval(() => {
      const currentTimeDate = new Date();
      setCurrentTime(currentTimeDate.toLocaleString());
    }, 1000);

    return (() => {
      clearInterval(getCurrentTime);
    });
  }, []);

  return (
    <div className={header.header}>
      <div className={header['header-top']}>
        <span>欢迎，{userName}</span>
        <Button
          type='dashed'
          size='small'
          onClick={() => showDeleteConfirm()}
          style={{
            color: '#ff4d4f'
          }}
          danger
        >退出</Button>
      </div>
      <div className={header['header-bottom']}>
        <div className={header['header-bottom-left']}>
          <h1>{title}</h1>
        </div>
        <div className={header['header-bottom-right']}>
          <span>{currentTime}</span>
          <span>{weatherInfo.weather}</span>
          <span>{weatherInfo.temperature}℃</span>
        </div>
      </div>
    </div>
  );
}

export default Header;