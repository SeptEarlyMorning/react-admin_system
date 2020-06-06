import React, { useEffect, useState } from 'react';
import { reqLocation, reqWeather } from '../../api';

const header = require('./header.module.less')

interface IProps {

};

function Header(props: IProps) {
  const [weatherInfo, setWeatherInfo] = useState({ weather: '晴', temperature: 24 });

  const getWeather = async () => {
    const { adcode }: any = await reqLocation();
    const { weather, temperature }: any = await reqWeather(adcode);
    setWeatherInfo({ weather, temperature });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className={header.header}>
      <div className={header['header-top']}>
        <span>欢迎，{'admin'}</span>
        <a href="javascript(0):;">退出</a>
      </div>
      <div className={header['header-bottom']}>
        {weatherInfo.temperature}
        {weatherInfo.weather}
      </div>
    </div>
  );
}

export default Header;